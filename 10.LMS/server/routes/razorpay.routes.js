import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/razorpay.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Razorpay course payment APIs
 */

/**
 * @swagger
 * /api/v1/razorpay/create-order:
 *   post:
 *     summary: Create a Razorpay payment order for a course
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: 671a2b3c4d5e6f7890123456
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Course not found
 *       500:
 *         description: Payment order creation failed
 */
router.post("/create-order", isAuthenticated, createRazorpayOrder);

/**
 * @swagger
 * /api/v1/razorpay/verify-payment:
 *   post:
 *     summary: Verify a Razorpay payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 example: order_abc123
 *               razorpay_payment_id:
 *                 type: string
 *                 example: pay_abc123
 *               razorpay_signature:
 *                 type: string
 *                 example: signature_from_razorpay
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Payment verification failed
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Purchase record not found
 *       500:
 *         description: Payment verification error
 */
router.post("/verify-payment", isAuthenticated, verifyPayment);

export default router;
