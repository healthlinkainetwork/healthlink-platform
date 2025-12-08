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

  // New: who posted this job (optional for now)
  agencyId?: string;

  // Who it's assigned to (CaregiverProfile.id)
  assignedCaregiverId?: string;
}
