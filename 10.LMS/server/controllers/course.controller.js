import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { ApiError, catchAsync } from "../middleware/error.middleware.js";
import { courseProgress } from "../models/courseProgress.model.js";

export const createNewCourse = catchAsync(async (req, res) => {
  const { title, category, price, subTitle, description, level, isPublished } =
    req.body;

  const instructor = req.id;

  const priceInt = parseInt(price);

  if (!instructor) {
    throw new ApiError("Not Logged in", 401);
  }
  if (
    priceInt === undefined ||
    priceInt === null ||
    priceInt === "" ||
    !Number.isFinite(priceInt) ||
    priceInt < 0
  ) {
    throw new ApiError("Price must be a valid non-negative number", 400);
  }

  if (!title || !category) {
    throw new ApiError("Necessary fields are required", 400);
  }

  const isCourseExist = await Course.findOne({
    title: title.trim().toLowerCase(),
  });

  if (isCourseExist) {
    throw new ApiError("Course of this title is already registred", 409);
  }

  if (!req.file) {
    throw new ApiError("Course thumbnail is required", 400);
  }

  const thumbnailResult = await uploadMedia(req.file.path);

  if (!thumbnailResult?.secure_url || !thumbnailResult?.public_id) {
    throw new ApiError("Thumbnail upload failed", 500);
  }

  await Course.create({
    title,
    category,
    price: priceInt,
    thumbnail: thumbnailResult?.secure_url,
    subTitle,
    description,
    level,
    instructor: instructor,
    isPublished,
  });

  res.status(201).json({
    success: true,
    message: "Course Created Suceesfully !",
    course: {
      title,
      category,
      price: priceInt,
    },
  });
});

export const searchCourses = catchAsync(async (req, res) => {
  const { keyword, category, level, maxPrice } = req.query;

  const filter = {
    isPublished: true,
  };

  if (keyword) {
    filter.$or = [
      {
        title: { $regex: keyword, $options: "i" },
      },

      {
        description: { $regex: keyword, $options: "i" },
      },
    ];
  }

  if (category) {
    filter.category = { $regex: category, $options: "i" };
  }

  if (level) {
    filter.level = level;
  }

  if (maxPrice !== undefined) {
    const price = Number(maxPrice);

    if (!Number.isFinite(price) || price < 0) {
      throw new ApiError("Invalid maximum price", 400);
    }

    filter.price = { $lte: price };
  }

  const courses = await Course.find(filter);

  res.status(200).json({
    success: true,
    message: courses.length
      ? "Courses fetched successfully"
      : "No courses found",
    courses,
  });
});

export const getPublishedCourses = catchAsync(async (req, res) => {
  const publishedCourses = await Course.find({
    isPublished: true,
  }).select(
    "title subTitle description category level price totalDuration totalLecture createdAt updatedAt",
  );

  res.status(200).json({
    success: true,
    message:
      publishedCourses.length > 0
        ? `${publishedCourses.length} Published Courses`
        : "Haven't any Published Courses",
    publishedCourses: publishedCourses.length > 0 ? publishedCourses : null,
  });
});

export const getMyCreatedCourses = catchAsync(async (req, res) => {
  const instructor = req.id;

  const publishedCourses = await Course.find({
    instructor: instructor,
  });

  res.status(200).json({
    success: true,
    message:
      publishedCourses.length > 0
        ? `You have ${publishedCourses.length} Published Courses`
        : "You haven't any Published Courses",
    publishedCourses: publishedCourses.length > 0 ? publishedCourses : null,
  });
});

export const updateCourseDetails = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    throw new ApiError("Course Id is required", 400);
  }

  const instructor = req.id;

  if (!instructor) {
    throw new ApiError("Not Logged in", 401);
  }

  const course = await Course.findOne({
    _id: courseId,
    instructor: instructor,
  });

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  const { title, category, price, subTitle, description, level, isPublished } =
    req.body;

  let thumbnailResult = null;

  if (title !== undefined) course.title = title;
  if (category !== undefined) course.category = category;
  if (isPublished !== undefined) course.isPublished = isPublished;
  if (subTitle !== undefined) course.subTitle = subTitle;
  if (description !== undefined) course.description = description;
  if (level !== undefined) course.level = level;
  if (price !== undefined) {
    const coursePrice = Number(price);

    if (price === "" || !Number.isFinite(coursePrice) || coursePrice < 0) {
      throw new ApiError("Price must be a valid non-negative number", 400);
    }

    course.price = coursePrice;
  }

  if (req.file) {
    thumbnailResult = await uploadMedia(req.file.path);

    if (!thumbnailResult?.secure_url || !thumbnailResult?.public_id) {
      throw new ApiError("Thumbnail upload failed", 500);
    }

    course.publicId = thumbnailResult?.public_id;
    course.thumbnail = thumbnailResult?.secure_url;
  }

  await course.save();

  res.status(201).json({
    success: true,
    message: "Course Updated Suceesfully !",
    course: {
      title,
      category,
      price,
    },
  });
});

export const getCourseDetails = catchAsync(async (req, res) => {
  const courseId = req.params?.courseId;

  if (!courseId) {
    throw new ApiError("Course ID is required", 400);
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Course details successfully fetched",
    Course: course,
  });
});

export const addLectureToCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { title, description, duration, isPreview, order } = req.body;

  const instructorId = req.id;

  const progress = await courseProgress.find({
    courseId: courseId,
  });

  if (!title || !order) {
    throw new ApiError("Title and order are required", 400);
  }

  if (!req.file) {
    throw new ApiError("Video file is required", 400);
  }

  const course = await Course.findOne({
    _id: courseId,
    instructor: instructorId,
  });

  if (!course) {
    throw new ApiError("course not found", 400);
  }

  const uploadedLecture = await uploadMedia(req.file.path);

  if (!uploadedLecture?.secure_url || !uploadedLecture?.public_id) {
    throw new ApiError("Video upload Failed", 400);
  }

  const lecture = await Lecture.create({
    title,
    description,
    videoUrl: uploadedLecture.secure_url,
    publicId: uploadedLecture.public_id,
    duration: Number(duration) || 0,
    isPreview: isPreview === "true",
    order: Number(order),
  });

  course.lectures.push(lecture._id);
  await course.save();

  if (progress) {
    await Promise.all(
      progress.map(async (item) => {
        item.lectureProgress.push({
          lecture: lecture._id,
          isCompleted: false,
          watchTime: 0,
          lastWatched: new Date(),
        });

        await item.save();
      }),
    );
  }

  res.status(201).json({
    success: true,
    message: "Lecture added successfully",
    lecture,
  });
});

export const getCourseLectures = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    throw new ApiError("Course Id is required", 400);
  }

  const course = await Course.findById(courseId).populate("lectures");

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  res.status(200).json({
    success: true,
    message:
      course.lectures.length > 0
        ? "Course lectures fetched successfully"
        : "No lectures available for this course",
    lectures: course.lectures,
  });
});
