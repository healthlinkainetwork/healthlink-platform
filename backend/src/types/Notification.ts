// backend/src/types/Notification.ts

export type NotificationAudienceType = "caregiver" | "agency" | "all";

export interface Notification {
  id: string;
  audienceType: NotificationAudienceType;
  title: string;
  body: string;
  createdAt: string;

  // Optional targeting
  caregiverId?: string;
  agencyId?: string;

  // Simple read-tracking
  read?: boolean;
}
