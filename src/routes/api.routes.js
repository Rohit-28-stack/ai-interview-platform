import {Router} from "express";
import authRoutes from "./auth.routes.js";
import questionRoutes from "./question.routes.js";
const router =Router();

router.use("/auth", authRoutes);
router.use("/questions",questionRoutes);


export default router;