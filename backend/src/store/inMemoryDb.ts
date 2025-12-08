// backend/src/store/inMemoryDb.ts

import type { CaregiverProfile } from "../types/Caregiver";
import type { Job } from "../types/Job";
import type { Agency } from "../types/Agency";
import type { Rating } from "../types/Rating";

/**
 * TEMP in-memory "database".
 * Your developer will eventually replace this with a real database:
 * - PostgreSQL, MySQL, Mongo, etc.
 */
export const caregivers: CaregiverProfile[] = [];
export const jobs: Job[] = [];
export const agencies: Agency[] = [];
export const ratings: Rating[] = [];
