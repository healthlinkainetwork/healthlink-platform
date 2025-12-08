// backend/src/types/Rating.ts

export type RatingTargetType = "caregiver" | "agency";

export interface Rating {
  id: string;
  targetType: RatingTargetType;
  targetId: string; // caregiverId or agencyId
  score: number;    // 1–5
  comment?: string;
  createdAt: string;

  // Optional metadata about who rated who
  fromAgencyId?: string;
  fromCaregiverId?: string;
}
