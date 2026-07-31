import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    generateInterviewQuestion,
    evaluateInterviewAnswer
} from "../services/ai.service.js";



export const generateQuestion = asyncHandler(async (req, res) => {

    const { topic, difficulty } = req.body;

    if (!topic || !difficulty) {
        throw new ApiError(
            400,
            "Topic and difficulty are required."
        );
    }


    const question = await generateInterviewQuestion(
        topic,
        difficulty
    );


    return res.status(200).json(
        new ApiResponse(
            200,
            {
                question
            },
            "Interview question generated successfully."
        )
    );
});




export const evaluateAnswer = asyncHandler(
    async (req, res) => {

        const {
            question,
            answer
        } = req.body;


        if (!question || !answer) {
            throw new ApiError(
                400,
                "Question and answer are required."
            );
        }


        const evaluation =
            await evaluateInterviewAnswer(
                question,
                answer
            );


        return res.status(200).json(
            new ApiResponse(
                200,
                evaluation,
                "Answer evaluated successfully."
            )
        );

    }
);