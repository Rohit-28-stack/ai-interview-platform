import { Router } from "express";

import {
    startInterview,submitAnswer,getInterviewReport,getDashboardData
} from "../controllers/interview.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/start",protect,startInterview);
router.post("/submit",protect,submitAnswer);
router.get("/report/:interviewId",protect,getInterviewReport)
router.get("/dashboard",protect,getDashboardData);
export default router;