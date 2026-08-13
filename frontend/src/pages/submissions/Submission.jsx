import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getMySubmissions } from "../../services/submission.service";

const Submissions = () => {
    const navigate = useNavigate();

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);

            const response = await getMySubmissions();

            console.log("Submissions API response:", response);

            setSubmissions(response.submissions || []);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);

            toast.error(
                error.response?.data?.message ||
                    "Failed to load submissions"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const getScoreColor = (score) => {
        if (score >= 8) return "text-green-400";
        if (score >= 5) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Submission History
                </h1>

                <p className="text-slate-400 mt-2">
                    Review your previous coding submissions.
                </p>
            </div>

            {loading ? (
                <div className="text-center text-slate-400 py-20">
                    Loading submissions...
                </div>
            ) : submissions.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-10 text-center">
                    <p className="text-slate-400">
                        No submissions yet.
                    </p>

                    <button
                        onClick={() => navigate("/interview/start")}
                        className="mt-5 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg"
                    >
                        Start Coding
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {submissions.map((submission) => (
                        <div
                            key={submission._id}
                            className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-500 transition"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        {submission.question?.title ||
                                            "Unknown Question"}
                                    </h2>

                                    <p className="text-slate-400 mt-1">
                                        Difficulty:{" "}
                                        {submission.question?.difficulty ||
                                            "N/A"}
                                    </p>

                                    <p className="text-slate-400 mt-1">
                                        Language:{" "}
                                        {submission.language || "N/A"}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Score
                                        </p>

                                        <p
                                            className={`text-2xl font-bold ${getScoreColor(
                                                submission.score || 0
                                            )}`}
                                        >
                                            {submission.score || 0}/10
                                        </p>
                                    </div>

                                    <div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                submission.verdict ===
                                                "Accepted"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                            }`}
                                        >
                                            {submission.verdict || "Unknown"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-700 mt-5 pt-4">
                                <p className="text-sm text-slate-500">
                                    {submission.createdAt
                                        ? new Date(
                                              submission.createdAt
                                          ).toLocaleDateString()
                                        : "Date unavailable"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Submissions;