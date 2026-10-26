import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  authenticateUser,
  changeUserPassword,
  createUserAccount,
  deleteUserAccount,
  forgotPassword,
  getCurrentUserProfile,
  resetPassword,
  signOutUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import upload from "../utils/multer.js";
import { validateSignUp } from "../middleware/validation.middleware.js";

const router = express.Router();

// Auth Routes

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: User already exists or validation failed
 *       500:
 *         description: Server error
 */
router.post("/signup", validateSignUp, createUserAccount);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login to an existing account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", authenticateUser);

/**
 * @swagger
 * /api/v1/user/signout:
 *   post:
 *     summary: Sign out the current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Signed out successfully
 */
router.post("/signout", signOutUser);

router.patch("/change-password", isAuthenticated, changeUserPassword);

router.post("/forgot-password", isAuthenticated, forgotPassword);

router.patch("/reset-password/:token", isAuthenticated, resetPassword);

router.delete("/account", isAuthenticated, deleteUserAccount);

// Profile Routes

/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.get("/profile", isAuthenticated, getCurrentUserProfile);

/**
 * @swagger
 * /api/v1/user/profile:
 *   patch:
 *     summary: Update the current user's profile
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Taufeeq Alam
 *               email:
 *                 type: string
 *                 format: email
 *                 example: taufeeq@example.com
 *               bio:
 *                 type: string
 *                 example: Computer Science student
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.patch(
  "/profile",
  isAuthenticated,
  upload.single("avatar"),
  updateUserProfile,
);

export default router;
