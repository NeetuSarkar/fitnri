
import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
    },

    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
      trim: true,
      maxlength: [30, "WhatsApp number is too long"],
    },

    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },

    goal: {
      type: String,
      required: [true, "Fitness goal is required"],
      trim: true,
      maxlength: [1000, "Fitness goal cannot exceed 1000 characters"],
    },

    plan: {
      type: String,
      required: [true, "Coaching plan is required"],
      enum: {
        values: ["Starter", "Transformation", "Premium", "Not sure"],
        message: "Please select a valid coaching plan",
      },
    },

    preferredDate: {
      type: Date,
      required: [true, "Preferred date is required"],
    },

    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    followUpNotes: {
      type: String,
      trim: true,
      maxlength: [
        3000,
        "Follow-up notes cannot exceed 3000 characters",
      ],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Consultation = mongoose.model(
  "Consultation",
  consultationSchema
);

export default Consultation;
