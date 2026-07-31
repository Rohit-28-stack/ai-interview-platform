import{Router} from "express";
import{createQuestion,getAllQuestions, updateQuestion,deleteQuestion} from "../controllers/question.controller.js";
import{protect} from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/auth.middleware.js";
const router=Router();


router.post("/",protect,authorize("admin"),createQuestion);
router.get("/",protect, getAllQuestions);
router.put("/:id",protect,authorize("admin"),updateQuestion);
router.delete("/:id",protect,authorize("admin"),deleteQuestion)
export default router;