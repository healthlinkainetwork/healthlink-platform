// backend/src/store/gamificationStore.ts

import { CaregiverGamification } from "../types/Gamification";

export const gamification: CaregiverGamification[] = [];

// Helper to load or create a record
export function getOrCreateGamification(caregiverId: string): CaregiverGamification {
  let record = gamification.find((g) => g.caregiverId === caregiverId);

  if (!record) {
    record = {
      caregiverId,
      points: 0,
      level: 1,
      lastUpdated: new Date().toISOString(),
    };
    gamification.push(record);
  }

  return record;
}

// Level calculation rules
export function calculateLevel(points: number): number {
  if (points >= 2000) return 5;
  if (points >= 1000) return 4;
  if (points >= 500) return 3;
  if (points >= 200) return 2;
  return 1;
}
