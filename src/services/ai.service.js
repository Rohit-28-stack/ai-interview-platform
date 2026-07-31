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
export const generateInterviewReport = async (
    interviewData
) => {

    const prompt = `
You are a senior technical interviewer.

Analyze this interview performance.

Interview Data:

${JSON.stringify(interviewData)}

Return ONLY valid JSON:

{
 "overallScore": number between 1 and 10,
 "strengths": [
   "point 1"
 ],
 "weaknesses":[
   "point 1"
 ],
 "suggestions":[
   "point 1"
 ]
}

No markdown.
`;

    const result =
        await groq.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            temperature: 0.3

        });


    return JSON.parse(
        result.choices[0]
            .message
            .content
            .trim()
    );

};