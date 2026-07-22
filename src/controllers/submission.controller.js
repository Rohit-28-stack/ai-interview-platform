import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Submission from "../models/Submission.js";
import Question from "../models/Question.js";

export const createSubmission = asyncHandler(async (req, res) => {
  const { question, language, code } = req.body;

  // Validation
  if (!question || !language || !code) {
    throw new ApiError(400, "Question, language and code are required");
  }

  // Check if question exists
  const existingQuestion = await Question.findById(question);

  if (!existingQuestion) {
    throw new ApiError(404, "Question not found");
  }

  // Create submission
  const submission = await Submission.create({
    user: req.user._id,
    question,
    language,
    code,

    // Default values (will be updated after Judge0 execution)
    verdict: "Wrong Answer",
    score: 0,
    executionTime: 0,
    memory: 0,
    output: "",
    error: "",
  });

  res.status(201).json({
    success: true,
    message: "Submission created successfully",
    submission,
  });
});