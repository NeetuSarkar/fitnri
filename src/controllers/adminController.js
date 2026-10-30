import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const COOKIE_NAME = "fitnri_admin_token";
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: SESSION_DURATION,
});

export const loginAdmin = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email ||
      !password ||
      email.length > 254 ||
      password.length > 128
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email and password.",
      });
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured.");
    }

    const token = jwt.sign(
      {
        adminId: admin._id.toString(),
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.cookie(COOKIE_NAME, token, cookieOptions());

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to log in right now.",
    });
  }
};

export const getAdminSession = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select("email");

    if (!admin) {
      res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin session error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify the session.",
    });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};
