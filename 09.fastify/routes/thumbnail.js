const thumbnailController = require("../controllers/thumbnailController.js");

const errorResponse = {
  type: "object",
  properties: {
    statusCode: { type: "integer", examples: [404] },
    error: { type: "string", examples: ["Not Found"] },
    message: {
      type: "string",
      examples: ["Thumbnail not found"],
    },
  },
  additionalProperties: true,
};

const thumbnailResponse = {
  type: "object",
  description: "Thumbnail document returned by the API",
  properties: {
    _id: {
      type: "string",
      examples: ["66a123456789abcdef123456"],
    },
    user: {
      type: "string",
      examples: ["66a987654321abcdef123456"],
    },
    videoName: {
      type: "string",
      examples: ["Introduction to Node.js"],
    },
    version: {
      type: "string",
      examples: ["1.0"],
    },
    image: {
      type: "string",
      examples: ["/uploads/thumbnails/1720000000-thumbnail.png"],
    },
    paid: {
      type: "boolean",
      examples: [false],
    },
  },
  additionalProperties: true,
};

const thumbnailIdParams = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string",
      pattern: "^[a-fA-F0-9]{24}$",
      examples: ["66a123456789abcdef123456"],
    },
  },
};

module.exports = async function (fastify, opts) {
  fastify.register(async function (fastify) {
    // All thumbnail routes require JWT authentication.
    fastify.addHook("preHandler", fastify.authenticate);

    // CREATE THUMBNAIL
    fastify.post(
      "/",
      {
        schema: {
          tags: ["Thumbnails"],
          summary: "Create a thumbnail",
          description:
            "Uploads a thumbnail image and creates a thumbnail document for the authenticated user.",
          security: [{ bearerAuth: [] }],
          consumes: ["multipart/form-data"],
          response: {
            201: {
              description: "Thumbnail created",
              ...thumbnailResponse,
            },
            400: {
              description: "Invalid multipart request",
              ...errorResponse,
            },
            401: {
              description: "Missing or invalid JWT",
              ...errorResponse,
            },
            500: {
              description: "Upload or database error",
              ...errorResponse,
            },
          },
        },
      },
      thumbnailController.createThumbnail,
    );

    // GET ALL THUMBNAILS
    fastify.get(
      "/",
      {
        schema: {
          tags: ["Thumbnails"],
          summary: "Get all thumbnails",
          description:
            "Returns thumbnails belonging to the authenticated user.",
          security: [{ bearerAuth: [] }],
          response: {
            200: {
              description: "List of thumbnails",
              type: "array",
              items: thumbnailResponse,
            },
            401: {
              description: "Missing or invalid JWT",
              ...errorResponse,
            },
          },
        },
      },
      thumbnailController.getThumbnails,
    );

    // GET SINGLE THUMBNAIL
    fastify.get(
      "/:id",
      {
        schema: {
          tags: ["Thumbnails"],
          summary: "Get a thumbnail by ID",
          security: [{ bearerAuth: [] }],
          params: thumbnailIdParams,
          response: {
            200: {
              description: "Thumbnail found",
              ...thumbnailResponse,
            },
            400: {
              description: "Invalid thumbnail ID",
              ...errorResponse,
            },
            404: {
              description: "Thumbnail not found",
              ...errorResponse,
            },
            401: {
              description: "Missing or invalid JWT",
              ...errorResponse,
            },
          },
        },
      },
      thumbnailController.getThumbnail,
    );

    // UPDATE THUMBNAIL
    fastify.put(
      "/:id",
      {
        schema: {
          tags: ["Thumbnails"],
          summary: "Update a thumbnail",
          description:
            "Updates the supplied thumbnail fields for the authenticated user.",
          security: [{ bearerAuth: [] }],
          params: thumbnailIdParams,
          body: {
            type: "object",
            minProperties: 1,
            properties: {
              videoName: {
                type: "string",
                examples: ["Updated video title"],
              },
              version: {
                type: "string",
                examples: ["2.0"],
              },
              paid: {
                type: "boolean",
                examples: [true],
              },
              image: {
                type: "string",
                examples: ["/uploads/thumbnails/new-image.png"],
              },
            },
            additionalProperties: true,
          },
          response: {
            200: {
              description: "Thumbnail updated",
              ...thumbnailResponse,
            },
            400: {
              description: "Invalid request or ID",
              ...errorResponse,
            },
            404: {
              description: "Thumbnail not found",
              ...errorResponse,
            },
            401: {
              description: "Missing or invalid JWT",
              ...errorResponse,
            },
          },
        },
      },
      thumbnailController.updateThumbnail,
    );

    // DELETE SINGLE THUMBNAIL
    fastify.delete(
      "/:id",
      {
        schema: {
          tags: ["Thumbnails"],
          summary: "Delete a thumbnail",
          security: [{ bearerAuth: [] }],
          params: thumbnailIdParams,
          response: {
            200: {
              description: "Thumbnail deleted",
              type: "object",
              properties: {
                message: {
                  type: "string",
                  examples: ["Thumbnail deleted"],
                },
              },
            },
            404: {
              description: "Thumbnail not found",
              ...errorResponse,
            },
            401: {
              description: "Missing or invalid JWT",
              ...errorResponse,
            },
          },
        },
      },
      thumbnailController.deleteThumbnail,
    );

    // DELETE ALL THUMBNAILS
    fastify.delete(
      "/",
      {
        schema: {
          tags: ["Thumbnails"],
          summary: "Delete all thumbnails",
          description:
            "Deletes all thumbnail documents belonging to the authenticated user.",
          security: [{ bearerAuth: [] }],
          response: {
            200: {
              description: "All thumbnails deleted",
              type: "string",
              examples: ["All Thumbnails deleted"],
            },
            401: {
              description: "Missing or invalid JWT",
              ...errorResponse,
            },
          },
        },
      },
      thumbnailController.deleteThumbnails,
    );
  });
};
