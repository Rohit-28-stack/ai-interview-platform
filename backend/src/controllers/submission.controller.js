import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Submission from "../models/Submission.js";
import Question from "../models/Questions.js";

// export const createSubmission = asyncHandler(async (req, res) => {
//   const { question, language, code } = req.body;

//   // Validation
//   if (!question || !language || !code) {
//     throw new ApiError(400, "Question, language and code are required");
//   }

//   // Check if question exists
//   const existingQuestion = await Question.findById(question);

//   if (!existingQuestion) {
//     throw new ApiError(404, "Question not found");
//   }

//   // Create submission
//   const submission = await Submission.create({
//     user: req.user._id,
//     question,
//     language,
//     code,

//     // Default values (will be updated after Judge0 execution)
//     verdict: "Wrong Answer",
//     score: 0,
//     executionTime: 0,
//     memory: 0,
//     output: "",
//     error: "",
//   });

//   res.status(201).json({
//     success: true,
//     message: "Submission created successfully",
//     submission,
//   });
// });
export const createSubmission = asyncHandler(async (req, res) => {
  console.log("========== CREATE SUBMISSION ==========");
  console.log("User:", req.user);
  console.log("Body:", req.body);

  const { question, language, code } = req.body;

  if (!question || !language || !code) {
    throw new ApiError(400, "Question, language and code are required");
  }

  const existingQuestion = await Question.findById(question);

  console.log("Question found:", existingQuestion);

  if (!existingQuestion) {
    throw new ApiError(404, "Question not found");
  }

  const submission = await Submission.create({
    user: req.user._id,
    question,
    language,
    code,
    verdict: "Wrong Answer",
    score: 0,
    executionTime: 0,
    memory: 0,
    output: "",
    error: "",
  });

  console.log("========== SUBMISSION CREATED ==========");
  console.log(submission);

  res.status(201).json({
    success: true,
    message: "Submission created successfully",
    submission,
  });
});
export const getMySubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find({
    user: req.user._id,
  })
    .populate("question", "title difficulty")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: submissions.length,
    submissions,
  });
});
export const getSubmissionById = asyncHandler(async (req, res) => {
  const submission = await Submission.findById(req.params.id)
    .populate("question")
    .populate("user", "name email");

  if (!submission) {
    throw new ApiError(404, "Submission not found");
  }

  // Ensure users can only view their own submissions
  if (
    submission.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "You are not authorized to access this submission");
  }

  res.status(200).json({
    success: true,
    submission,
  });
});