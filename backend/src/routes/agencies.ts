// backend/src/routes/agencies.ts

import { Router } from "express";
import { Agency } from "../types/Agency";
import { agencies } from "../store/inMemoryDb";

const router = Router();

/**
 * Agency routes (temporary in-memory implementation).
 * Developer will replace this with real database queries.
 */

// Using shared agencies[] imported from inMemoryDb
function generateId() {
  return "ag_" + Math.random().toString(36).substring(2, 10);
}

// GET /agencies
router.get("/", (_req, res) => {
  return res.json({ ok: true, agencies });
});

// POST /agencies
router.post("/", (req, res) => {
  const {
    name,
    contactName,
    contactEmail,
    contactPhone,
    city,
    state,
  } = req.body as Partial<Agency>;

  if (!name) {
    return res.status(400).json({
      ok: false,
      error: "name is required",
    });
  }

  const agency: Agency = {
    id: generateId(),
    name,
    contactName,
    contactEmail,
    contactPhone,
    city,
    state,
    active: true,
    createdAt: new Date().toISOString(),
  };

  agencies.push(agency);

  return res.status(201).json({
    ok: true,
    message: "Agency created (temporary in-memory store)",
    agency,
  });
});

// GET /agencies/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const agency = agencies.find((a) => a.id === id);

  if (!agency) {
    return res.status(404).json({
      ok: false,
      error: "Agency not found",
    });
  }

  return res.json({ ok: true, agency });
});

export default router;
