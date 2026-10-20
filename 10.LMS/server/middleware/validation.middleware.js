import { body, param, query, validationResult } from "express-validator";
import { ApiError } from "./error.middleware.js";

export const validate = (validations) => {
  return async (req, res, next) => {
    // run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const extractedError = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    throw new ApiError("Validations Error", 400);
  };
};

export const commonValidations = {
  pagination: [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .message("Page must be a natural number"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .message("Limit must be a From 1 to 100"),
  ],
  email: body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  name: body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Please provide a valid name"),
};

export const validateSignUp = validate([
  commonValidations.email,
  commonValidations.name,
]);
