// backend/src/types/User.ts

export type UserRole = "caregiver" | "agency" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}
