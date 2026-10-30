import express from "express";

import {
  createConsultation,
  getConsultations,
  updateConsultationStatus,
  updateFollowUpNotes,
} from "../controllers/consultationController.js";

import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// Public: visitors can submit consultation requests.
router.post("/", createConsultation);

// Admin only: retrieve all enquiries.
router.get("/", requireAdmin, getConsultations);

// Admin only: update an enquiry's status.
router.patch("/:id/status", requireAdmin, updateConsultationStatus);

router.patch("/:id/notes",requireAdmin,updateFollowUpNotes)

export default router;
