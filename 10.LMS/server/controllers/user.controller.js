import { ApiError, catchAsync } from "../middleware/error.middleware.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createUserAccount = catchAsync(async (req, res) => {
  const { name, email, password, role = "student" } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    throw new ApiError("User already exist", 400);
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role,
  });

  await user.updateLastActive();

  generateToken(res, user, "Account Created Successfully !");
});

export const authenticateUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!existingUser) {
    throw new ApiError("Invalid Credentials", 401);
  }

  const isValid = existingUser.comparePassword(password);

  if (!isValid) {
    throw new ApiError("Invalid Credentials", 401);
  }

  await existingUser.updateLastActive();

  generateToken(res, existingUser, ` Welcome Back ${existingUser.name}`);
});

export const signOutUser = catchAsync(async (_, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({
    success: true,
    message: "Signed Out Successfully",
  });
});

export const getCurrentUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.id).populate({
    path: "enrolledCourses.course",
    select: "title thumbnail description",
  });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    data: {
      ...user.toJSON(),
      totalEnrolledCourses: user.totalEnrolledCourses,
    },
  });
});

export const updateUserProfile = catchAsync(async (req, res) => {
  const { name, email, bio } = req.body;

  const updateData = {
    name,
    email: email?.toLowerCase(),
    bio,
  };

  if (req.file) {
    const avatarResult = await uploadMedia(req.file.path);
    updateData.avatar = avatarResult.secure_url;

    const user = await User.findById(req.id);

    // delete old avatar
    if (user.avatar && user.avatar !== "default-avatar.png") {
      await deleteMediaFromCloudinary(user.avatar);
    }
  }

  // update user
  const updatedUser = await User.findByIdAndUpdate(req.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new ApiError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Profile updated Suceesfuuly !",
    data: updatedUser,
  });
});

export const test = catchAsync(async (req, res) => {});
