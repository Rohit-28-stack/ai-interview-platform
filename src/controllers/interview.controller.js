import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
    evaluateInterviewAnswer,
    generateNextInterviewQuestion
} from "../services/ai.service.js";
import Interview from "../models/Interview.js";

import { 
    generateInterviewQuestion,generateInterviewReport
} from "../services/ai.service.js";


export const startInterview = asyncHandler(
async (req,res)=>{

    const {
        topic,
        difficulty
    } = req.body;


    if(!topic || !difficulty){
        throw new ApiError(
            400,
            "Topic and difficulty are required"
        );
    }


    const question =
        await generateInterviewQuestion(
            topic,
            difficulty
        );


    const interview =
        await Interview.create({
            user:req.user._id,
            topic,
            difficulty,
            questions:[
                {
                    question
                }
            ]
        });


    return res.status(201).json(
        new ApiResponse(
            201,
            {
                interviewId: interview._id,
                question
            },
            "Interview started successfully"
        )
    );

});
export const submitAnswer = asyncHandler(
async(req,res)=>{

    const {
        interviewId,
        answer
    } = req.body;


    if(!interviewId || !answer){
        throw new ApiError(
            400,
            "Interview id and answer are required"
        );
    }


    const interview =
        await Interview.findById(interviewId);


    if(!interview){
        throw new ApiError(
            404,
            "Interview not found"
        );
    }


    const currentQuestion =
        interview.questions[
            interview.questions.length - 1
        ];


    const evaluation =
        await evaluateInterviewAnswer(
            currentQuestion.question,
            answer
        );


    currentQuestion.answer = answer;
    currentQuestion.score = evaluation.score;
    currentQuestion.feedback = evaluation.feedback;


    interview.totalScore += evaluation.score;


    const nextQuestion =
        await generateNextInterviewQuestion(
            interview.topic,
            interview.difficulty
        );


    interview.questions.push({
        question: nextQuestion
    });


    await interview.save();


    return res.status(200).json(
        new ApiResponse(
            200,
            {
                score:evaluation.score,
                feedback:evaluation.feedback,
                nextQuestion
            },
            "Answer evaluated successfully"
        )
    );

});
export const getInterviewReport=asyncHandler(async(req,res)=>{
    const {interviewId}=req.params;

    const interview=await Interview.findById(interviewId)


    if(!interviewId){
        throw new ApiError(
            404,"Interview not found"
        )
    };

    const report =await generateInterviewReport(
        {
            topic:interview.topic,
            difficulty:interview.difficulty,
            questions:interview.questions
        }
    )
    interview.report=report;
    interview.status="Completed";
    await interview.save();

    return res.status(200).json(
        new ApiResponse(
            200,report,
            "Interview report generated successfully"
        )
    )
});