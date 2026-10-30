import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "../src/config/db.js";
import Admin from "../src/models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env first.",
      );
    }

    if (password.length < 12 || password.length > 128) {
      throw new Error("ADMIN_PASSWORD must be between 12 and 128 characters.");
    }

    await connectDB();

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("An admin account with this email already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Admin account created successfully for ${email}.`);
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
