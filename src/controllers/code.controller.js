import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { executeCode } from "../services/codeExecution.service.js";

export const runCode = asyncHandler(async (req, res) => {
  const { language, code, stdin } = req.body;

  // Validation
  if (!language || !code) {
    throw new ApiError(400, "Language and code are required");
  }

  // Execute code
  const result = await executeCode(language, code, stdin);

  // Response
  res.status(200).json({
    success: true,
    data: result,
  });
});