import jwt from "jsonwebtoken";
import { ApiError, catchAsync } from "./error.middleware.js";

export const isAuthenticated = catchAsync(async (req, res, next) => {
  const token = req?.cookies.token;

  if (!token) {
    throw new ApiError("You aren't Logged-In", 401);
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    console.log(err.message);
    throw new ApiError("JWT Token Error", 401);
  }
});

// Middleware for role-based access control
export const restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    // roles is an array ['admin', 'instructor']
    if (!roles.includes(req.role)) {
      throw new ApiError(
        "You do not have permission to perform this action",
        403,
      );
    }
    next();
  });
};

// Optional authentication middleware
export const optionalAuth = catchAsync(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.userId;
    }
    next();
  } catch (error) {
    // If token is invalid, just continue without authentication
    next();
  }
});
