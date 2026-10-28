import { ApiError, catchAsync } from "../middleware/error.middleware.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import crypto from "crypto";

export const createUserAccount = catchAsync(async (req, res) => {
  const { name, email, password, role = "student" } = req.body;

  if (!email || !name || !password) {
    throw new ApiError("All fields are required", 400);
  }

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

  const isValid = await existingUser.comparePassword(password);

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
  const { name, email, bio, role = "student" } = req.body;

  const updateData = {
    name,
    email: email?.toLowerCase(),
    bio,
    role,
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

export const changeUserPassword = catchAsync(async (req, res) => {
  const { email, password, newPassword } = req.body;

  if (!email || !password || !newPassword) {
    throw new ApiError("All fields are required", 400);
  }

  const userExist = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!userExist) {
    throw new ApiError("user not found !", 404);
  }

  const isValid = await userExist.comparePassword(password);

  if (!isValid) {
    throw new ApiError("Invalid Credentials", 401);
  }

  userExist.password = newPassword;
  await userExist.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Suceesfully !",
  });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError("Email is required", 400);
  }

  const existedUser = await User.findOne({ email: email.toLowerCase() });

  if (!existedUser) {
    throw new ApiError("user not found !", 404);
  }

  const token = await crypto.randomBytes(32).toString("hex");

  existedUser.resetPasswordToken = token;
  existedUser.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await existedUser.save({ validateBeforeSave: false });

  const resetUrl = `http://localhost:8000/api/v1/user/reset-password/${token}`;

  res.status(201).json({
    success: true,
    url: resetUrl,
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { email, newPassword } = req.body;

  if (!token) {
    throw new ApiError("Invalid Url", 401);
  }

  if (!email || !newPassword) {
    throw new ApiError("All fields are required", 400);
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError("Invalid credentials or token is expired", 401);
  }

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Reset Suceesfully !",
  });
});

export const deleteUserAccount = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("All fields are required", 400);
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new ApiError("user not found", 404);
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    throw new ApiError("Invalid Crdentials", 401);
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Suceesfully !",
  });
});
