// backend/src/routes/auth.ts

import { Router } from "express";
import { loginUser, registerUser } from "../services/authService";
import type { UserRole } from "../types/User";

const router = Router();

/**
 * Auth routes (starter version).
 * Developer TODOs:
 * - Add password fields and validation
 * - Hash passwords (e.g. bcrypt)
 * - Replace in-memory users with real database
 * - Replace fake token with real JWT
 */

router.post("/register", (req, res) => {
  try {
    const { email, role } = req.body as { email?: string; role?: UserRole };

    if (!email) {
      return res.status(400).json({ ok: false, error: "Email is required" });
    }

    const normalizedRole: UserRole = role ?? "caregiver";

    const user = registerUser(email, normalizedRole);

    return res.status(201).json({
      ok: true,
      message: "User registered (temporary in-memory implementation)",
      user,
    });
  } catch (err: any) {
    return res.status(400).json({
      ok: false,
      error: err.message || "Failed to register user",
    });
  }
});

router.post("/login", (req, res) => {
  try {
    const { email } = req.body as { email?: string };

    if (!email) {
      return res.status(400).json({ ok: false, error: "Email is required" });
    }

    const { user, token } = loginUser(email);

    return res.json({
      ok: true,
      message: "User logged in (temporary in-memory implementation)",
      user,
      token,
    });
  } catch (err: any) {
    return res.status(401).json({
      ok: false,
      error: err.message || "Invalid login",
    });
  }
});

export default router;
