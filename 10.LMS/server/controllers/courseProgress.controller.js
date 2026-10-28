import { Course } from "../models/course.model.js";
import { catchAsync } from "../middleware/error.middleware.js";
import { ApiError } from "../middleware/error.middleware.js";
import { courseProgress } from "../models/courseProgress.model.js";

/**
 * Get user's progress for a specific course
 * @route GET /api/v1/progress/:courseId
 */

export const getUserCourseProgress = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  let progress = await courseProgress.findOne({
    course: courseId,
    user: req.id,
  });

  if (!progress) {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new ApiError("Course not found", 404);
    }

    progress = await courseProgress.create({
      course: courseId,
      user: req.id,
      lectureProgress: course.lectures.map((lectureId) => ({
        lecture: lectureId,
        isCompleted: false,
        watchTime: 0,
      })),
    });
  }

  res.status(200).json({
    success: true,
    message: `You have completed ${progress.completionPercentage}% of your course`,
    progress,
  });
});

/**
 * Update progress for a specific lecture
 * @route PATCH /api/v1/progress/:courseId/lectures/:lectureId
 */
export const updateLectureProgress = catchAsync(async (req, res) => {
  const { courseId, lectureId } = req.params;

  const { isCompleted, watchTime } = req.body;

  const progress = await courseProgress.findOne({
    course: courseId,
    user: req.id,
  });

  if (!progress) {
    throw new ApiError("Course Progress not found", 404);
  }

  const lecture = progress.lectureProgress.find(
    (lp) => lp.lecture.toString() === lectureId,
  );

  if (!lecture) {
    throw new ApiError("Course Lecture Progress not found", 404);
  }

  if (isCompleted !== undefined) {
    lecture.isCompleted = isCompleted;
  }

  if (watchTime !== undefined) {
    lecture.watchTime = watchTime;
    lecture.lastWatched = new Date();
  }

  progress.lastAccessed = new Date();

  await progress.save();

  res.status(200).json({
    success: true,
    message: `Course Progress Updated Successfully`,
  });
});

/**
 * Mark entire course as completed
 * @route PATCH /api/v1/progress/:courseId/complete
 */
export const markCourseAsCompleted = catchAsync(async (req, res) => {
  // TODO: Implement mark course as completed functionality

  const { courseId } = req.params;

  const progress = await courseProgress.findOne({
    course: courseId,
    user: req.id,
  });

  if (!progress) {
    throw new ApiError("Course Progress not found", 404);
  }

  const lectures = progress.lectureProgress;

  lectures.forEach((lp) => (lp.isCompleted = true));

  progress.isCompleted = true;
  progress.completionPercentage = 100;

  progress.lastAccessed = new Date();

  await progress.save();

  res.status(200).json({
    success: true,
    message: `Course Progress Marked as Completed Successfully`,
  });
});

/**
 * Reset course progress
 * @route PATCH /api/v1/progress/:courseId/reset
 */
export const resetCourseProgress = catchAsync(async (req, res) => {
  // TODO: Implement reset course progress functionality

  const { courseId } = req.params;

  const progress = await courseProgress.findOne({
    course: courseId,
    user: req.id,
  });

  if (!progress) {
    throw new ApiError("Course Progress not found", 404);
  }

  const lectures = progress.lectureProgress;

  lectures.forEach((lp) => {
    lp.isCompleted = false;
    lp.watchTime = 0;
    lp.lastWatched = new Date();
  });

  progress.isCompleted = false;
  progress.completionPercentage = 0;

  progress.lastAccessed = new Date();

  await progress.save();

  res.status(200).json({
    success: true,
    message: `Course Progress Reset Successfully`,
  });
});
