// backend/src/routes/gamification.ts

import { Router } from "express";
import { caregivers } from "../store/inMemoryDb";
import { getOrCreateGamification, calculateLevel } from "../store/gamificationStore";

const router = Router();

// GET /gamification/caregivers/:id
router.get("/caregivers/:id", (req, res) => {
  const { id } = req.params;

  const exists = caregivers.some((c) => c.id === id);
  if (!exists) {
    return res.status(404).json({ ok: false, error: "Caregiver not found" });
  }

  const record = getOrCreateGamification(id);

  return res.json({ ok: true, gamification: record });
});

// POST /gamification/award
router.post("/award", (req, res) => {
  const { caregiverId, event, amount } = req.body;

  if (!caregiverId) {
    return res.status(400).json({ ok: false, error: "caregiverId required" });
  }

  const record = getOrCreateGamification(caregiverId);

  const points = typeof amount === "number" ? amount : defaultPoints(event);
  record.points += points;
  record.level = calculateLevel(record.points);
  record.lastUpdated = new Date().toISOString();

  return res.json({
    ok: true,
    message: `Awarded ${points} points`,
    gamification: record,
  });
});

// Default point rules
function defaultPoints(event: string) {
  switch (event) {
    case "job_completed":
      return 50;
    case "job_accepted":
      return 20;
    case "rating_received":
      return 30;
    case "profile_completed":
      return 40;
    case "certification_verified":
      return 60;
    default:
      return 10;
  }
}

export default router;
