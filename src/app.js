import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import consultationRoutes from "./routes/consultationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Trust the hosting proxy for production HTTPS requests.
app.set("trust proxy", 1);

// Security headers.
app.use(helmet());

// Frontend URLs allowed to access the backend.
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// API health check.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FitNRI API is running",
  });
});

// Public consultation booking and protected admin operations.
app.use("/api/consultations", consultationRoutes);

// Admin authentication.
app.use("/api/admin", adminRoutes);

// Unknown routes.
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

export default app;
