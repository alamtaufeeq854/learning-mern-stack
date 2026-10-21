import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongooseSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import cors from "cors";

import healthRoute from "./routes/health.routes.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

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
app.use(mongooseSanitize());
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
    origin: process.env.CLIENT_URL || "http://localhost:5173",
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

// It Should be always at bottom
// 404 handler

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not Found !!",
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is running at PORT ${PORT} in ${process.env.NODE_ENV} mode`,
  );
});
