import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import {
    submitAnswer
} from "../../services/interview.service";

const Interview = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    const [currentQuestion, setCurrentQuestion] = useState(
    location.state?.question?.text || location.state?.question || ""
);

    const [answer, setAnswer] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!answer.trim()) {
            return toast.error("Please enter your answer.");
        }

        try {
            setLoading(true);

            const response = await submitAnswer({
    interviewId: id,
    answer,
});

console.log("Response:", response);

const result = response.data || response;

console.log("Result:", result);
console.log("Completed:", result.completed);

if (result.completed) {
    toast.success("Interview completed!");
    navigate(`/interview/report/${result.interviewId}`);
    return;
}

setResult(result);
setCurrentQuestion(result.nextQuestion);

toast.success("Answer submitted successfully.");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Failed to submit answer."
            );
        } finally {
            setLoading(false);
        }
    };

   

    const getFeedbackColor = (score) => {
        if (score >= 8) return "text-green-400";

        if (score >= 5) return "text-yellow-400";

        return "text-red-400";
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold text-white mb-8">
                🤖 AI Interview
            </h1>

            {/* Question */}

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">

                <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                    Interview Question
                </h2>

              <p className="text-slate-200 leading-8">
  {
    typeof currentQuestion === "object"
      ? currentQuestion.text
      : currentQuestion
  }
</p>

            </div>

            {/* Answer */}

            <textarea
                rows={8}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your answer here..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {!result ? (
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit Answer"}
                </button>
            ) : (
                <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6">

                    <h2 className="text-2xl font-bold text-white">
                        Score : {result.score}/10
                    </h2>

                    <h3 className="mt-5 text-lg font-semibold text-cyan-400">
                        AI Feedback
                    </h3>

                    <p
                        className={`mt-2 whitespace-pre-wrap ${getFeedbackColor(
                            result.score
                        )}`}
                    >
                        {result.feedback}
                    </p>

                    {result.improvement && (
                        <>
                            <h3 className="mt-6 text-lg font-semibold text-cyan-400">
                                Improvement
                            </h3>

                            <p className="text-slate-300 mt-2">
                                {result.improvement}
                            </p>
                        </>
                    )}

                    <button
                        onClick={()=>{
                            setAnswer("");
                                setResult(null);
                            
                        }}
                        
                        className="mt-8 bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
                    >
                        Next Question
                    </button>

                </div>
            )}

        </div>
    );
};

export default Interview;