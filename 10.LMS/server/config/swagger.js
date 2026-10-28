import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "LMS Backend API",
      version: "1.0.0",
      description:
        "API documentation for the Learning Management System backend",
    },

    servers: [
      {
        url: "http://localhost:8000",
        description: "Local development server",
      },
    ],

   tags: [
  { name: "Health", description: "API health and server status" },
  { name: "Authentication", description: "Signup, login and password management" },
  { name: "Profile", description: "User profile and account management" },
  { name: "Courses", description: "Course management APIs" },
  { name: "Lectures", description: "Course lecture management APIs" },
  { name: "Course Progress", description: "Manage course progress" },
  { name: "Payments", description: "Razorpay payment APIs" },
  { name: "Media", description: "Upload media files to Cloudinary" },
],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "Authentication using the token cookie",
        },
      },

      schemas: {
        UserSignup: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Taufeeq Alam",
            },
            email: {
              type: "string",
              format: "email",
              example: "taufeeq@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "StrongPass123",
            },
            role: {
              type: "string",
              enum: ["student", "instructor", "admin"],
              default: "student",
              example: "student",
            },
          },
        },

        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "taufeeq@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "StrongPass123",
            },
          },
        },

        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Something went wrong",
            },
          },
        },
      },
    },
  },

  // Swagger JSDoc comments in route files
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
