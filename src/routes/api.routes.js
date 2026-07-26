import {Router} from "express";
import authRoutes from "./auth.routes.js";
import questionRoutes from "./question.routes.js";
import aiRoutes from "./ai.routes.js";
import interviewRoutes from "./interview.routes.js";
import submissionRoutes from "./submission.routes.js";

const router =Router();

router.use("/auth", authRoutes);
router.use("/questions",questionRoutes);
router.use("/ai", aiRoutes);
router.use("/interview",interviewRoutes);
router.use("/submissions", submissionRoutes);
export default router;