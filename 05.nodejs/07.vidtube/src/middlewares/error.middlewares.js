import mongoose from "mongoose";
import { ApiError } from "../utils/api_error.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if ((!error) instanceof ApiError) {
    const statuscode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong !";
    error = new ApiError(statuscode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...ApiError(
      process.env.NODE_ENV === "development" ? { stack: error.stack } : {}
    ),
  };

  return res.status(error.statuscode).json(response);
};

export { errorHandler };
