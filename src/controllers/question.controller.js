
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Question from "../models/Questions.js";


export const createQuestion = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    difficulty,
    type,
    companies,
    tags,
    hints,
    explanation,
  } = req.body;


  if (
    !title ||
    !description ||
    !category ||
    !difficulty ||
    !type
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }
  const existingQuestion = await Question.findOne({
    title
  });

  if (existingQuestion) {
    throw new ApiError(
      409,
      "Question already exists"
    );
  }

  const question = await Question.create({
    title,
    description,
    category,
    difficulty,
    type,
    companies,
    tags,
    hints,
    explanation,
    createdBy: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      question,
      "Question created successfully"
    )
  );


})

export const getAllQuestions = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    difficulty,
    company,
    sort = "latest",
  } = req.query;

  const filter = {
    isActive:true
  };

  if (category) {
    filter.category = category;
  }

  if (difficulty) {
    filter.difficulty = difficulty;
  }

  if (company) {
    filter.companies = company;
  }

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  let sortOption = {};

  if (sort === "latest") {
    sortOption.createdAt = -1;
  } else if (sort === "oldest") {
    sortOption.createdAt = 1;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const questions = await Question.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber);

  const totalQuestions = await Question.countDocuments(filter);

  const totalPages = Math.ceil(totalQuestions / limitNumber);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        questions,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          totalQuestions,
          totalPages,
        },
      },
      "Questions fetched successfully"
    )
  );

});

export const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    category,
    difficulty,
    type,
    companies,
    tags,
    hints,
    explanation,
  } = req.body;

  const question = await Question.findById(id)
  if (!question) {
    throw new ApiError(404, "Question not found");
  }
  const updatedQuestion = await Question.findByIdAndUpdate(
    id,
    {
      title,
      description,
      category,
      difficulty,
      type,
      companies,
      tags,
      hints,
      explanation,
    },
    {
     returnDocument: "after",
      runValidators: true,
    }
  );
   return res.status(200).json(
    new ApiResponse(
      200,
      updatedQuestion,
      "Question updated successfully"
    )
  );

});
export const deleteQuestion=asyncHandler(async(req,res)=>{
  const { id } = req.params;
    const question = await Question.findById(id);
      if (!question) {
    throw new ApiError(404, "Question not found");
  }
    await Question.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  return res.status(200).json(
    new ApiResponse(
        200,
        null,
        "Question deleted successfully"
    )
);
});