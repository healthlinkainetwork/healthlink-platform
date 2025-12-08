// backend/src/routes/jobs.ts

import { Router } from "express";
import { Job, JobStatus } from "../types/Job";
import { jobs } from "../store/inMemoryDb";

const router = Router();

/**
 * Job routes (temporary in-memory implementation).
 * Developer will replace with real database queries.
 */

// Using shared jobs[] imported from inMemoryDb
function generateId() {
  return "job_" + Math.random().toString(36).substring(2, 10);
}

// GET /jobs
router.get("/", (_req, res) => {
  return res.json({ ok: true, jobs });
});

// POST /jobs
router.post("/", (req, res) => {
  const {
    title,
    description,
    locationCity,
    locationState,
    hourlyRate,
    hoursEstimated,
    agencyId,
  } = req.body as Partial<Job>;

  if (!title || hourlyRate == null || hoursEstimated == null) {
    return res.status(400).json({
      ok: false,
      error: "title, hourlyRate, and hoursEstimated are required",
    });
  }

  const job: Job = {
    id: generateId(),
    title,
    description,
    locationCity,
    locationState,
    hourlyRate,
    hoursEstimated,
    status: "open",
    postedAt: new Date().toISOString(),
    agencyId,
  };

  jobs.push(job);

  return res.status(201).json({
    ok: true,
    message: "Job created (temporary in-memory store)",
    job,
  });
});

// PATCH /jobs/:id/status
router.patch("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status?: JobStatus };

  const job = jobs.find((j) => j.id === id);
  if (!job) {
    return res.status(404).json({ ok: false, error: "Job not found" });
  }

  if (!status) {
    return res.status(400).json({ ok: false, error: "status is required" });
  }

  job.status = status;
  return res.json({
    ok: true,
    message: "Job status updated",
    job,
  });
});

// POST /jobs/:id/assign
router.post("/:id/assign", (req, res) => {
  const { id } = req.params;
  const { caregiverId } = req.body as { caregiverId?: string };

  const job = jobs.find((j) => j.id === id);
  if (!job) {
    return res.status(404).json({ ok: false, error: "Job not found" });
  }

  if (!caregiverId) {
    return res.status(400).json({
      ok: false,
      error: "caregiverId is required",
    });
  }

  job.assignedCaregiverId = caregiverId;
  job.status = "assigned";

  return res.json({
    ok: true,
    message: "Job assigned to caregiver (temporary in-memory store)",
    job,
  });
});

export default router;
