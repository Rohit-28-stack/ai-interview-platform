import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { runCode } from "../controllers/code.controller.js";

const router = express.Router();

// POST /api/v1/code/run
router.post("/run", protect, runCode);

export default router;