import { Router } from "express";

import {
    startInterview,submitAnswer,getInterviewReport
} from "../controllers/interview.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/start",protect,startInterview);
router.post("/submit",protect,submitAnswer);
router.get("/report/:interviewId",protect,getInterviewReport)

export default router;