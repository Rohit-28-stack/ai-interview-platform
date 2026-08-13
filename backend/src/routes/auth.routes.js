import { Router } from "express";
import { register,login,logout,getCurrentUser,updateProfile } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { get } from "mongoose";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",protect,logout)
router.get("/me",protect,getCurrentUser)
router.put("/profile", protect, updateProfile);
export default router;