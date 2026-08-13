import Groq from "groq-sdk";
console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});
export const generateInterviewQuestion = async (
    topic,
    difficulty
) => {

    const prompt = `
You are a Senior Software Engineer interviewing a fresher.

Generate exactly ONE interview question.

Topic: ${topic}
Difficulty: ${difficulty}


Rules:
- Do NOT repeat previous questions.
- Ask a new technical question.
- Ask only one question.
- No explanation.
- No answer.

Requirements:
- Technical interview question
- No explanation
- No answer
- Return only the question.
`;

    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.7
    });

    return response.choices[0].message.content.trim();
};
export const evaluateInterviewAnswer = async (
    question,
    answer
) => {

    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate answer.

Question:
${question}

Candidate Answer:
${answer}

Return ONLY JSON format:

{
 "score": number between 1 and 10,
 "feedback": "short feedback",
 "improvement": "how candidate can improve"
}

Do not add markdown.
`;

    const result = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.3
    });


    const response = result.choices[0].message.content.trim();


    return JSON.parse(response);
};
export const generateNextInterviewQuestion = async (
    topic,
    difficulty
) => {

    const prompt = `
You are a senior software engineer conducting a mock interview.

Generate the next interview question.

Topic: ${topic}

Difficulty: ${difficulty}

Rules:
- Ask only one technical question.
- No explanation.
- No answer.
`;

    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.7
    });

    return response.choices[0].message.content.trim();
};
export const generateInterviewReport = async (interview) => {

    const questions = interview.questions || [];

    const interviewData = questions.map((q, index) => ({
        questionNumber: index + 1,
        question: q.question,
        answer: q.answer,
        score: q.score,
        feedback: q.feedback
    }));

    const prompt = `
You are a senior technical interviewer.

Analyze the candidate's complete interview.

Topic: ${interview.topic}
Difficulty: ${interview.difficulty}
Total Score: ${interview.totalScore}
Total Questions: ${questions.length}

Interview Data:
${JSON.stringify(interviewData, null, 2)}

Generate a final interview report.

Return ONLY valid JSON in exactly this format:

{
    "overallScore": ${interview.totalScore},
    "totalQuestions": ${questions.length},
    "summary": "Short overall summary of the candidate's performance.",
    "strengths": [
        "Strength 1",
        "Strength 2",
        "Strength 3"
    ],
    "weaknesses": [
        "Weakness 1",
        "Weakness 2",
        "Weakness 3"
    ],
    "suggestions": [
        "Suggestion 1",
        "Suggestion 2",
        "Suggestion 3"
    ]
}

Rules:
- Analyze the actual candidate answers.
- Use the scores and feedback.
- Do not invent information.
- Keep strengths specific to the candidate.
- Keep weaknesses specific to the candidate.
- Give practical suggestions for improvement.
- Return only JSON.
- Do not use markdown.
`;
    const result = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.3
    });

    const response = result.choices[0].message.content.trim();
    const report = JSON.parse(response);
    return report;
};