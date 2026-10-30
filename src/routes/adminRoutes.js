import express from "express";
import rateLimit from "express-rate-limit";

import {
  loginAdmin,
  getAdminSession,
  logoutAdmin,
} from "../controllers/adminController.js";

import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

router.post("/login", loginLimiter, loginAdmin);
router.get("/me", requireAdmin, getAdminSession);
router.post("/logout", requireAdmin, logoutAdmin);

export default router;
