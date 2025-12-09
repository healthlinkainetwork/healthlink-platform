// backend/src/types/Gamification.ts

export interface CaregiverGamification {
  caregiverId: string;
  points: number;
  level: number;
  lastUpdated: string;
}

export type GamificationEvent =
  | "rating_received"
  | "job_completed"
  | "job_accepted"
  | "profile_completed"
  | "certification_verified";
