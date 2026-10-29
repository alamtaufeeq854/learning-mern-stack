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

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Signup, login and password management
 *   - name: Profile
 *     description: User profile and account management
 */

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
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Taufeeq Alam
 *               email:
 *                 type: string
 *                 format: email
 *                 example: taufeeq@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *               role:
 *                 type: string
 *                 enum: [student, instructor]
 *                 default: student
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Required fields missing or user already exists
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
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: taufeeq@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", authenticateUser);

/**
 * @swagger
 * /api/v1/user/signout:
 *   get:
 *     summary: Sign out the current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Signed out successfully
 */
router.get("/signout", signOutUser);

/**
 * @swagger
 * /api/v1/user/change-password:
 *   patch:
 *     summary: Change the current user's password
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, newPassword]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: taufeeq@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: OldPass123!
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewPass123!
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Required fields missing
 *       401:
 *         description: Authentication or password verification failed
 *       404:
 *         description: User not found
 */
router.patch("/change-password", isAuthenticated, changeUserPassword);

/**
 * @swagger
 * /api/v1/user/forgot-password:
 *   post:
 *     summary: Generate a password reset link
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: taufeeq@example.com
 *     responses:
 *       201:
 *         description: Password reset link generated
 *       400:
 *         description: Email is required
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", isAuthenticated, forgotPassword);

/**
 * @swagger
 * /api/v1/user/reset-password/{token}:
 *   patch:
 *     summary: Reset password using a valid reset token
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, newPassword]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: taufeeq@example.com
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewPass123!
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Required fields missing
 *       401:
 *         description: Invalid or expired token
 */
router.patch("/reset-password/:token", isAuthenticated, resetPassword);

/**
 * @swagger
 * /api/v1/user/account:
 *   delete:
 *     summary: Delete the current user's account
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: taufeeq@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       400:
 *         description: Required fields missing
 *       401:
 *         description: Authentication or password verification failed
 *       404:
 *         description: User not found
 */
router.delete("/account", isAuthenticated, deleteUserAccount);

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
 *
 *   patch:
 *     summary: Update the current user's profile
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.get("/profile", isAuthenticated, getCurrentUserProfile);

router.patch(
  "/profile",
  isAuthenticated,
  upload.single("avatar"),
  updateUserProfile,
);

export default router;
