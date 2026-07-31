import express from "express";
import { generateQuestion,evaluateAnswer } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/generate-question", generateQuestion);
router.post("/evaluate-answer", evaluateAnswer);

export default router;