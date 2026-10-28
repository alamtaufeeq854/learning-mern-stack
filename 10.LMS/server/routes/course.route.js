import express from "express";
import { isAuthenticated, restrictTo } from "../middleware/auth.middleware.js";
import {
  createNewCourse,
  searchCourses,
  getPublishedCourses,
  getMyCreatedCourses,
  updateCourseDetails,
  getCourseDetails,
  addLectureToCourse,
  getCourseLectures,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Courses
 *     description: Course management APIs
 *   - name: Lectures
 *     description: Course lecture management APIs
 */

/**
 * @swagger
 * /api/v1/course/published:
 *   get:
 *     summary: Get all published courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Published courses fetched successfully
 */
router.get("/published", getPublishedCourses);

/**
 * @swagger
 * /api/v1/course/search:
 *   get:
 *     summary: Search published courses
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search by course title or description
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *     responses:
 *       200:
 *         description: Search results fetched successfully
 *       400:
 *         description: Invalid maximum price
 */
router.get("/search", searchCourses);

// All routes below require authentication
router.use(isAuthenticated);

/**
 * @swagger
 * /api/v1/course:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - price
 *               - thumbnail
 *             properties:
 *               title:
 *                 type: string
 *                 example: Complete MERN Stack
 *               category:
 *                 type: string
 *                 example: Web Development
 *               price:
 *                 type: number
 *                 example: 499
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               subTitle:
 *                 type: string
 *                 example: Learn full-stack development
 *               description:
 *                 type: string
 *                 example: Learn MERN stack with practical projects
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *               isPublished:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Required fields missing or invalid input
 *       401:
 *         description: Authentication required
 *       409:
 *         description: Course title already exists
 *
 *   get:
 *     summary: Get courses created by the logged-in instructor
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Instructor courses fetched successfully
 *       401:
 *         description: Authentication required
 */
router
  .route("/")
  .post(restrictTo("instructor"), upload.single("thumbnail"), createNewCourse)
  .get(restrictTo("instructor"), getMyCreatedCourses);

/**
 * @swagger
 * /api/v1/course/c/{courseId}:
 *   get:
 *     summary: Get course details by ID
 *     tags: [Courses]
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
 *         description: Course details fetched successfully
 *       400:
 *         description: Course ID is required
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Course not found
 *
 *   patch:
 *     summary: Update course details
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *               subTitle:
 *                 type: string
 *               description:
 *                 type: string
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Course updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Course not found or not owned by instructor
 */
router
  .route("/c/:courseId")
  .get(getCourseDetails)
  .patch(
    restrictTo("instructor"),
    upload.single("thumbnail"),
    updateCourseDetails,
  );

/**
 * @swagger
 * /api/v1/course/c/{courseId}/lectures:
 *   get:
 *     summary: Get all lectures of a course
 *     tags: [Lectures]
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
 *         description: Course lectures fetched successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Course not found
 *
 *   post:
 *     summary: Add a lecture to a course
 *     tags: [Lectures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - order
 *               - video
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introduction to React
 *               description:
 *                 type: string
 *                 example: React fundamentals
 *               duration:
 *                 type: number
 *                 example: 600
 *               isPreview:
 *                 type: boolean
 *                 example: false
 *               order:
 *                 type: integer
 *                 example: 1
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Lecture added successfully
 *       400:
 *         description: Invalid input, missing video, or course not found
 *       401:
 *         description: Authentication required
 */
router
  .route("/c/:courseId/lectures")
  .get(getCourseLectures)
  .post(restrictTo("instructor"), upload.single("video"), addLectureToCourse);

export default router;
