// backend/src/routes/ratings.ts

import { Router } from "express";
import { ratings, caregivers, agencies } from "../store/inMemoryDb";
import { Rating, RatingTargetType } from "../types/Rating";

const router = Router();

function generateId() {
  return "rate_" + Math.random().toString(36).substring(2, 10);
}

// Helper to recompute caregiver average rating
function recomputeCaregiverRating(caregiverId: string) {
  const caregiver = caregivers.find((c) => c.id === caregiverId);
  if (!caregiver) return;

  const cgRatings = ratings.filter(
    (r) => r.targetType === "caregiver" && r.targetId === caregiverId
  );

  if (cgRatings.length === 0) {
    caregiver.rating = 0;
    caregiver.totalRatings = 0;
    return;
  }

  const totalScore = cgRatings.reduce((sum, r) => sum + r.score, 0);
  caregiver.totalRatings = cgRatings.length;
  caregiver.rating = totalScore / cgRatings.length;
}

// POST /ratings
router.post("/", (req, res) => {
  const {
    targetType,
    targetId,
    score,
    comment,
    fromAgencyId,
    fromCaregiverId,
  } = req.body as Partial<Rating>;

  const normalizedTargetType: RatingTargetType = (targetType as RatingTargetType) ?? "caregiver";

  if (!targetId) {
    return res.status(400).json({ ok: false, error: "targetId is required" });
  }

  if (score == null || typeof score !== "number" || score < 1 || score > 5) {
    return res.status(400).json({
      ok: false,
      error: "score must be a number between 1 and 5",
    });
  }

  // Validate target exists (caregiver or agency)
  if (normalizedTargetType === "caregiver") {
    const exists = caregivers.some((c) => c.id === targetId);
    if (!exists) {
      return res.status(404).json({
        ok: false,
        error: "Target caregiver not found",
      });
    }
  } else if (normalizedTargetType === "agency") {
    const exists = agencies.some((a) => a.id === targetId);
    if (!exists) {
      return res.status(404).json({
        ok: false,
        error: "Target agency not found",
      });
    }
  }

  const rating: Rating = {
    id: generateId(),
    targetType: normalizedTargetType,
    targetId,
    score,
    comment,
    createdAt: new Date().toISOString(),
    fromAgencyId,
    fromCaregiverId,
  };

  ratings.push(rating);

  // Update aggregate rating for caregivers
  if (normalizedTargetType === "caregiver") {
    recomputeCaregiverRating(targetId);
  }

  return res.status(201).json({
    ok: true,
    message: "Rating created",
    rating,
  });
});

// GET /ratings/caregivers/:caregiverId
router.get("/caregivers/:caregiverId", (req, res) => {
  const { caregiverId } = req.params;

  const cgRatings = ratings.filter(
    (r) => r.targetType === "caregiver" && r.targetId === caregiverId
  );

  return res.json({
    ok: true,
    caregiverId,
    ratings: cgRatings,
  });
});

// GET /ratings/agencies/:agencyId
router.get("/agencies/:agencyId", (req, res) => {
  const { agencyId } = req.params;

  const agRatings = ratings.filter(
    (r) => r.targetType === "agency" && r.targetId === agencyId
  );

  return res.json({
    ok: true,
    agencyId,
    ratings: agRatings,
  });
});

export default router;
