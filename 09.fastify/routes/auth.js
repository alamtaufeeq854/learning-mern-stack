const authController = require("../controllers/authControllers.js");

const errorResponse = {
  type: "object",
  properties: {
    statusCode: { type: "integer", examples: [400] },
    error: { type: "string", examples: ["Bad Request"] },
    message: {
      type: "string",
      examples: ["Invalid or missing input"],
    },
  },
  additionalProperties: true,
};

module.exports = async function (fastify, opts) {
  // REGISTER
  fastify.post(
    "/register",
    {
      schema: {
        tags: ["Authentication"],
        summary: "Register a new user",
        description:
          "Creates a user account. The password is hashed before storage.",
        body: {
          type: "object",
          required: ["name", "email", "password", "country"],
          properties: {
            name: {
              type: "string",
              examples: ["Taufeeq Alam"],
            },
            email: {
              type: "string",
              format: "email",
              examples: ["taufeeq@example.com"],
            },
            password: {
              type: "string",
              minLength: 8,
              examples: ["StrongPass123!"],
            },
            country: {
              type: "string",
              examples: ["India"],
            },
          },
        },
        response: {
          201: {
            description: "User registered successfully",
            type: "object",
            properties: {
              msg: {
                type: "string",
                examples: ["User registered successfully !"],
              },
              success: { type: "boolean", examples: [true] },
            },
          },
          400: {
            description: "Required fields are missing",
            type: "object",
            properties: {
              msg: {
                type: "string",
                examples: ["All fields are required !"],
              },
              success: { type: "boolean", examples: [false] },
            },
          },
          500: {
            description: "Unexpected server error",
            ...errorResponse,
          },
        },
      },
    },
    authController.register,
  );

  // LOGIN
  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Authentication"],
        summary: "Login user",
        description: "Validates credentials and returns a JWT token.",
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              examples: ["taufeeq@example.com"],
            },
            password: {
              type: "string",
              examples: ["StrongPass123!"],
            },
          },
        },
        response: {
          200: {
            description: "Login successful",
            type: "object",
            required: ["token"],
            properties: {
              token: {
                type: "string",
                examples: ["eyJhbGciOiJIUzI1NiJ9.example.signature"],
              },
            },
          },
          400: {
            description: "Missing fields or invalid credentials",
            type: "object",
            properties: {
              msg: {
                type: "string",
                examples: ["Invalid email or password !"],
              },
              success: { type: "boolean", examples: [false] },
            },
          },
          500: {
            description: "Unexpected server error",
            ...errorResponse,
          },
        },
      },
    },
    authController.login,
  );

  // FORGOT PASSWORD
  fastify.post(
    "/forgot-password",
    {
      schema: {
        tags: ["Authentication"],
        summary: "Request password reset",
        description:
          "Generates a password reset token valid for 10 minutes and returns a reset URL.",
        body: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              type: "string",
              format: "email",
              examples: ["taufeeq@example.com"],
            },
          },
        },
        response: {
          200: {
            description: "Reset URL generated",
            type: "object",
            properties: {
              resetUrl: {
                type: "string",
                format: "uri",
                examples: [
                  "http://localhost:3000/api/auth/reset-password/example-token",
                ],
              },
            },
          },
          404: {
            description: "User not found",
            ...errorResponse,
          },
          500: {
            description: "Unexpected server error",
            ...errorResponse,
          },
        },
      },
    },
    authController.forgotPassword,
  );

  // RESET PASSWORD
  fastify.post(
    "/reset-password/:token",
    {
      schema: {
        tags: ["Authentication"],
        summary: "Reset password",
        description:
          "Resets the password using a valid, unexpired reset token.",
        params: {
          type: "object",
          required: ["token"],
          properties: {
            token: {
              type: "string",
              examples: ["example-reset-token"],
            },
          },
        },
        body: {
          type: "object",
          required: ["newPassword"],
          properties: {
            newPassword: {
              type: "string",
              minLength: 8,
              examples: ["NewStrongPass123!"],
            },
          },
        },
        response: {
          200: {
            description: "Password reset successfully",
            type: "object",
            properties: {
              message: {
                type: "string",
                examples: ["Password reset successfully"],
              },
              success: { type: "boolean", examples: [true] },
            },
          },
          400: {
            description: "Invalid or expired reset token",
            ...errorResponse,
          },
          500: {
            description: "Unexpected server error",
            ...errorResponse,
          },
        },
      },
    },
    authController.resetPassword,
  );

  // LOGOUT
  fastify.post(
    "/logout",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ["Authentication"],
        summary: "Logout user",
        description:
          "Returns a logout confirmation. This endpoint does not revoke the JWT.",
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "Logout confirmation",
            type: "object",
            properties: {
              message: {
                type: "string",
                examples: ["Logout successful"],
              },
              success: { type: "boolean", examples: [true] },
            },
          },
          401: {
            description: "Missing or invalid JWT",
            ...errorResponse,
          },
        },
      },
    },
    authController.logout,
  );
};
