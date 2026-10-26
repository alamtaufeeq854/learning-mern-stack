import express from "express";
import { checkHealth } from "../controllers/health.controller.js";

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check backend and database health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server and database are healthy
 *       503:
 *         description: Database is unhealthy
 *       500:
 *         description: Health check failed
 */
router.get("/", checkHealth);

export default router;
