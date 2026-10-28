import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getUserCourseProgress,
  updateLectureProgress,
  markCourseAsCompleted,
  resetCourseProgress,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Course Progress
 *     description: Manage user course and lecture progress
 */

/**
 * @swagger
 * /api/v1/progress/{courseId}:
 *   get:
 *     summary: Get or initialize progress for a course
 *     tags: [Course Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB course ID
 *     responses:
 *       200:
 *         description: Course progress fetched or initialized successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Course not found
 */
router.get("/:courseId", isAuthenticated, getUserCourseProgress);

/**
 * @swagger
 * /api/v1/progress/{courseId}/lectures/{lectureId}:
 *   patch:
 *     summary: Update progress for a specific lecture
 *     tags: [Course Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB course ID
 *       - in: path
 *         name: lectureId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB lecture ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *               watchTime:
 *                 type: number
 *                 minimum: 0
 *                 example: 120
 *     responses:
 *       200:
 *         description: Lecture progress updated successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Course progress or lecture progress not found
 */
router.patch(
  "/:courseId/lectures/:lectureId",
  isAuthenticated,
  updateLectureProgress,
);

/**
 * @swagger
 * /api/v1/progress/{courseId}/complete:
 *   patch:
 *     summary: Mark an entire course as completed
 *     tags: [Course Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course marked as completed successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Course progress not found
 */
router.patch("/:courseId/complete", isAuthenticated, markCourseAsCompleted);

/**
 * @swagger
 * /api/v1/progress/{courseId}/reset:
 *   patch:
 *     summary: Reset progress for a course
 *     tags: [Course Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course progress reset successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Course progress not found
 */
router.patch("/:courseId/reset", isAuthenticated, resetCourseProgress);

export default router;
