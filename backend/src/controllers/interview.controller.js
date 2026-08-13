import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Submission from "../models/Submission.js";
import {
    evaluateInterviewAnswer,
    generateNextInterviewQuestion,generateInterviewQuestion,generateInterviewReport
} from "../services/ai.service.js";
import Interview from "../models/Interview.js";




export const startInterview = asyncHandler(
    async (req, res) => {

        const {
            topic,
            difficulty
        } = req.body;


        if (!topic || !difficulty) {
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
                user: req.user._id,
                topic,
                difficulty,
                currentQuestion: 1,
                maxQuestions: 3,
                questions: [
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
    async (req, res) => {

        const {
            interviewId,
            answer
        } = req.body;


        if (!interviewId || !answer) {
            throw new ApiError(
                400,
                "Interview id and answer are required"
            );
        }


        const interview =
            await Interview.findById(interviewId);


        if (!interview) {
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
        currentQuestion.followUpTopic=evaluation.followUpTopic;

        
        
        interview.totalScore += evaluation.score;
        interview.currentQuestion += 1;
        if (interview.currentQuestion > interview.maxQuestions) {
            const report =await generateInterviewReport(interview);
            interview.report = report;
            interview.status = "Completed";
            await interview.save();

            return res.status(200).json(
                new ApiResponse(
                    200, {
                    completed: true,
                    interviewId: interview._id
                },
                    "Interview completed successfully"
                )
            )
        }


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
                    completed: false,
                    score: evaluation.score,
                    feedback: evaluation.feedback,
                    nextQuestion
                },
                "Answer evaluated successfully"
            )
        );

    });
export const getInterviewReport = asyncHandler(async (req, res) => {
    const { interviewId } = req.params;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
        throw new ApiError(404, "Interview not found");
    }

    const report={
        topic: interview.topic,
        difficulty: interview.difficulty,
        overallScore: interview.totalScore,
        totalQuestions: interview.questions?.length || 0,
        summary: interview.report?.summary || "",
        strengths: interview.report?.strengths || [],
        weaknesses: interview.report?.weaknesses || [],
        suggestions: interview.report?.suggestions || []
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            report,
            "Interview report fetched successfully"
        )
    );
});
export const getDashboardData = asyncHandler(async (req, res) => {
    const interviews = await Interview.find({
        user: req.user._id,
    }).sort({ createdAt: -1 });

    const totalInterviews = interviews.length;

    let totalScore = 0;
    let totalQuestions = 0;

    interviews.forEach((interview) => {
        totalScore += interview.totalScore || 0;
        totalQuestions += interview.questions.length;
    });

    const totalPossibleScore=interviews.reduce(
        (sum,interview)=>
            sum+(interview.questions?.length ||0)*10,
            0
        
    )

    const averageScore =
        totalInterviews === 0
            ? 0
            : Number(
               ( (totalScore/totalPossibleScore)*100).toFixed(1)
            
        );
        const totalSubmissions = await Submission.countDocuments({
    user: req.user._id,
});

    const recentInterviews = interviews.slice(0, 5);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalInterviews,
                averageScore,
                totalQuestions,
                totalSubmissions,
                recentInterviews,
            },
            "Dashboard data fetched successfully"
        )
    );
});