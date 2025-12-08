// backend/src/types/Caregiver.ts

import type { UserRole } from "./User";

export type CaregiverDiscipline = "PCA" | "CNA" | "LPN" | "RN" | "Therapist";

export interface CaregiverProfile {
  id: string;
  userId: string; // links back to User.id
  fullName: string;
  email: string;
  phone?: string;
  discipline: CaregiverDiscipline;
  role: UserRole; // usually "caregiver"
  hourlyRate: number;
  rating: number; // 0–5 average rating
  totalRatings: number;
  active: boolean;
  createdAt: string;
}
