// backend/src/routes/jobs.ts

import { Router } from "express";
import { Job, JobStatus } from "../types/Job";

const router = Router();

/**
 * TEMP in-memory job list.
 * Developer will replace with real database queries.
 */
const jobs: Job[] = [];

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

export default router;
