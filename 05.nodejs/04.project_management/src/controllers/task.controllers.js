import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.models.js";
import { subTask } from "../models/subtask.models.js";

import { ApiResponse } from "../utils/api_response.js";
import { ApiError } from "../utils/api_error.js";
import { asyncHandler } from "../utils/async_handler.js";
import mongoose from "mongoose";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";

const getTasks = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { ProjectId } = req.params;
  const project = await Project.findById(ProjectId);

  if (!project) {
    throw new ApiError(404, "Project not found !");
  }

  const tasks = await Task.find({
    project: new mongoose.Types.ObjectId(ProjectId),
  }).populate("assignedTo", "avatar username fullName");

  return res
    .status(201)
    .json(new ApiResponse(201, tasks, "Task fetched Successfully"));
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { ProjectId } = req.params;
  const project = await Project.findById(ProjectId);

  if (!project) {
    throw new ApiError(404, "Project not found !");
  }

  const files = req.files || [];

  const attachments = files.map((file) => {
    return {
      url: `${process.env.SERVER_URL}/images/${file.originalname}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  });

  const task = await Task.create({
    title,
    description,
    project: new mongoose.Types.ObjectId(ProjectId),
    assignedTo: assignedTo
      ? new mongoose.Types.ObjectId(assignedTo)
      : undefined,

    assignedBy: new mongoose.Types.ObjectId(req.user._id),
    attachments,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task Created Successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(taskId),
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedTo",
        pipeline: [{ _id: 1, username: 1, fullName: 1, avatar: 1 }],
      },
    },

    {
      $lookup: {
        from: "subTask",
        localField: "_id",
        foreignField: "Task",
        as: "subTask",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "Task",
              as: "createdBy",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },

          {
            $addFields: {
              createdBy: {
                $arrayElemAt: ["$createdBy", 0],
              },
            },
          },
          {
            $addFields: {
              assignedTo: {
                $arrayElemAt: ["$assignedTo", 0],
              },
            },
          },
        ],
      },
    },
  ]);

  if (!task || task.length === 0) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task[0], "Task fetched successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  //
});

const deleteTasks = asyncHandler(async (req, res) => {
  //
});

const createSubTask = asyncHandler(async (req, res) => {
  //
});

const updateSubTask = asyncHandler(async (req, res) => {
  //
});

const deleteSubTask = asyncHandler(async (req, res) => {
  //
});

export {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTasks,
  createSubTask,
  updateSubTask,
  deleteSubTask,
};
