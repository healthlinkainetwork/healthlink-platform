// backend/src/routes/caregivers.ts

import { Router } from "express";
import { CaregiverProfile } from "../types/Caregiver";

const router = Router();

/**
 * TEMP in-memory caregiver list.
 * Developer will replace with real database queries.
 */
const caregivers: CaregiverProfile[] = [];

function generateId() {
  return "cg_" + Math.random().toString(36).substring(2, 10);
}

// GET /caregivers
router.get("/", (_req, res) => {
  return res.json({ ok: true, caregivers });
});

// POST /caregivers
router.post("/", (req, res) => {
  const {
    fullName,
    email,
    discipline,
    hourlyRate,
  } = req.body as Partial<CaregiverProfile>;

  if (!fullName || !email || !discipline || hourlyRate == null) {
    return res.status(400).json({
      ok: false,
      error: "fullName, email, discipline, and hourlyRate are required",
    });
  }

  const caregiver: CaregiverProfile = {
    id: generateId(),
    userId: "TEMP_USER_ID", // TODO: link to real user
    fullName,
    email,
    discipline,
    role: "caregiver",
    hourlyRate,
    rating: 0,
    totalRatings: 0,
    active: true,
    createdAt: new Date().toISOString(),
  };

  caregivers.push(caregiver);

  return res.status(201).json({
    ok: true,
    message: "Caregiver profile created (temporary in-memory store)",
    caregiver,
  });
});

export default router;
