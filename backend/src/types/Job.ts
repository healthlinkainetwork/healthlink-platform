// backend/src/types/Job.ts

export type JobStatus = "open" | "assigned" | "completed" | "cancelled";

export interface Job {
  id: string;
  title: string;
  description?: string;
  locationCity?: string;
  locationState?: string;
  hourlyRate: number;
  hoursEstimated: number;
  status: JobStatus;
  postedAt: string;
  assignedCaregiverId?: string; // CaregiverProfile.id
}
