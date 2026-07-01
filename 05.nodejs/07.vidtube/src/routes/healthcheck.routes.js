import { healthCheck } from "../controllers/healthcheck.controllers.js";
import { Router } from "express";

const router = Router();

router.route("/").get(healthCheck);
router.route("/test").get(healthCheck);

export default router;
