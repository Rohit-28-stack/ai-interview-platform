import express from "express";
import {
  createSubmission,getMySubmissions,getSubmissionById
} from "../controllers/submission.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createSubmission);
router.get("/my", protect, getMySubmissions);
router.get("/:id", protect, getSubmissionById);


export default router;