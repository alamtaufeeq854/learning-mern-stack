import dotenv from "dotenv";

dotenv.config();

import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "@exortek/express-mongo-sanitize";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";

import healthRoute from "./routes/health.routes.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import razorpayRoute from "./routes/razorpay.routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

const PORT = process.env.PORT || 8000;

// Global rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  limit: 100, // Limit each IP to 100 request for 15 Mins for each window
  message: "Too many requests from this IP, please try later",
});

//security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use("/api", limiter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body Parser Middleware
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kkb" }));
app.use(cookieParser());

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
    ...(process.env.PORT === "development" && { stack: err.stack }),
  });
});

// CORS configuration

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://lms-backend-8iw8.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remember-token",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
  }),
);

//API Routes

app.use("/health", healthRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/purchase", razorpayRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// It Should be always at bottom
// 404 handler

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not Found !!",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server is running at PORT ${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
});
