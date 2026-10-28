
import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Media
 *     description: Upload media files to Cloudinary
 */

/**
 * @swagger
 * /api/v1/media/upload-video:
 *   post:
 *     summary: Upload an image or video to Cloudinary
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image or video file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: File is missing or invalid
 *       500:
 *         description: Error uploading file
 */
router.route("/upload-video").post(upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const result = await uploadMedia(req.file.path);

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "Error uploading file",
      });
    }

    res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error uploading file",
    });
  }
});

export default router;
