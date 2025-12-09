// backend/src/routes/notifications.ts

import { Router } from "express";
import { notifications } from "../store/inMemoryDb";
import { Notification, NotificationAudienceType } from "../types/Notification";

const router = Router();

function generateId() {
  return "ntf_" + Math.random().toString(36).substring(2, 10);
}

/**
 * GET /notifications
 * Optional query params:
 *  - caregiverId
 *  - agencyId
 *  - audienceType (caregiver | agency | all)
 */
router.get("/", (req, res) => {
  const { caregiverId, agencyId, audienceType } = req.query as {
    caregiverId?: string;
    agencyId?: string;
    audienceType?: NotificationAudienceType;
  };

  let result = notifications.slice();

  if (audienceType) {
    result = result.filter((n) => n.audienceType === audienceType || n.audienceType === "all");
  }

  if (caregiverId) {
    result = result.filter(
      (n) =>
        n.audienceType === "all" ||
        (n.audienceType === "caregiver" && n.caregiverId === caregiverId)
    );
  }

  if (agencyId) {
    result = result.filter(
      (n) =>
        n.audienceType === "all" ||
        (n.audienceType === "agency" && n.agencyId === agencyId)
    );
  }

  return res.json({ ok: true, notifications: result });
});

/**
 * POST /notifications
 * Body:
 *  - title (required)
 *  - body (required)
 *  - audienceType: "caregiver" | "agency" | "all"
 *  - caregiverId? (if audienceType = caregiver)
 *  - agencyId? (if audienceType = agency)
 */
router.post("/", (req, res) => {
  const {
    title,
    body,
    audienceType,
    caregiverId,
    agencyId,
  } = req.body as Partial<Notification> & { audienceType?: NotificationAudienceType };

  if (!title || !body) {
    return res.status(400).json({ ok: false, error: "title and body are required" });
  }

  const normalizedAudience: NotificationAudienceType = audienceType ?? "all";

  if (normalizedAudience === "caregiver" && !caregiverId) {
    return res.status(400).json({
      ok: false,
      error: "caregiverId is required when audienceType is 'caregiver'",
    });
  }

  if (normalizedAudience === "agency" && !agencyId) {
    return res.status(400).json({
      ok: false,
      error: "agencyId is required when audienceType is 'agency'",
    });
  }

  const notification: Notification = {
    id: generateId(),
    audienceType: normalizedAudience,
    title,
    body,
    createdAt: new Date().toISOString(),
    caregiverId,
    agencyId,
    read: false,
  };

  notifications.push(notification);

  return res.status(201).json({
    ok: true,
    message: "Notification created",
    notification,
  });
});

/**
 * PATCH /notifications/:id/read
 * Marks a notification as read.
 */
router.patch("/:id/read", (req, res) => {
  const { id } = req.params;

  const notification = notifications.find((n) => n.id === id);
  if (!notification) {
    return res.status(404).json({ ok: false, error: "Notification not found" });
  }

  notification.read = true;

  return res.json({
    ok: true,
    message: "Notification marked as read",
    notification,
  });
});

export default router;
