import Consultation from "../models/Consultation.js";
import {
  sendNewConsultationNotification,
  sendConsultationConfirmation,
} from "../utils/emailService.js";

// Create a new consultation and notify the admin.
export const createConsultation = async (req, res) => {
  try {
    const {
      fullName,
      email,
      whatsapp,
      country,
      goal,
      plan,
      preferredDate,
      preferredTime,
    } = req.body;

    const consultation = await Consultation.create({
      fullName,
      email,
      whatsapp,
      country,
      goal,
      plan,
      preferredDate,
      preferredTime,
    });

    // Send the admin notification without blocking the booking response.
    void sendNewConsultationNotification(consultation).catch((error) => {
      console.error("Admin notification email error:", error);
    });

    return res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully",
      data: consultation,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid consultation details",
        errors: error.message,
      });
    }

    console.error("Create consultation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit consultation request",
    });
  }
};

// Get all consultation enquiries (admin only).
export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: consultations.length,
      consultations,
    });
  } catch (error) {
    console.error("Get consultations error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve consultations.",
    });
  }
};

// Update consultation status and email the client when confirmed.
export const updateConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid consultation ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid consultation status.",
      });
    }

    // Check the previous status to avoid resending confirmation
    // every time the admin selects "confirmed".
    const existingConsultation = await Consultation.findById(id);

    if (!existingConsultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found.",
      });
    }

    const wasAlreadyConfirmed = existingConsultation.status === "confirmed";

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { $set: { status } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found.",
      });
    }

    // Send a confirmation only when transitioning into confirmed.
    if (status === "confirmed" && !wasAlreadyConfirmed) {
      void sendConsultationConfirmation(consultation).catch((error) => {
        console.error("Client confirmation email error:", error);
      });
    }

    return res.status(200).json({
      success: true,
      message: "Consultation status updated.",
      consultation,
    });
  } catch (error) {
    console.error("Update consultation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update consultation status.",
    });
  }
};

// Update follow-up notes (admin only).
export const updateFollowUpNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { followUpNotes } = req.body;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid consultation ID.",
      });
    }

    if (typeof followUpNotes !== "string") {
      return res.status(400).json({
        success: false,
        message: "Follow-up notes must be text.",
      });
    }

    if (followUpNotes.length > 3000) {
      return res.status(400).json({
        success: false,
        message: "Follow-up notes cannot exceed 3000 characters.",
      });
    }

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      {
        $set: {
          followUpNotes: followUpNotes.trim(),
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Follow-up notes saved successfully.",
      consultation,
    });
  } catch (error) {
    console.error("Update follow-up notes error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save follow-up notes.",
    });
  }
};
