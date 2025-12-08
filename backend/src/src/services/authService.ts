// backend/services/authService.ts

import { User, UserRole } from "../types/User";

/**
 * TEMPORARY in-memory store.
 * Your developer MUST replace this with:
 * - a real database table
 * - password hashing (bcrypt)
 * - proper unique constraints
 */
const users: User[] = [];

function generateId() {
  return "user_" + Math.random().toString(36).substring(2, 10);
}

export function registerUser(email: string, role: UserRole = "caregiver"): User {
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    // In real life: throw proper error
    throw new Error("User already exists");
  }

  const user: User = {
    id: generateId(),
    email,
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
}

export function loginUser(email: string): { user: User; token: string } {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // In real life: validate password, return 401, etc.
    throw new Error("Invalid credentials");
  }

  // TEMP fake token. Your dev will replace with real JWT.
  const fakeToken = "fake-jwt-" + user.id;

  return { user, token: fakeToken };
}
