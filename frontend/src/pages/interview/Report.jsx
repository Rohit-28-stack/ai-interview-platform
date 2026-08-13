import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getInterviewReport } from "../../services/interview.service";
import Dashboard from "../dashboard/Dashboard";

const InterviewReport = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getInterviewReport(id);
                
            setReport(response.data);
            } catch (error) {
                
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load interview report."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white text-xl">
                Loading Report...
            </div>
        );
    }

    if (!report) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 text-xl">
                Report not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold text-cyan-400 mb-8">
                📊 AI Interview Report
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

    <div className="bg-slate-700 rounded-xl p-4">
        <p className="text-slate-400 text-sm">
            Topic
        </p>

        <p className="text-white text-xl font-semibold mt-1">
            {report.topic}
        </p>
    </div>

    <div className="bg-slate-700 rounded-xl p-4">
        <p className="text-slate-400 text-sm">
            Difficulty
        </p>

        <p className="text-white text-xl font-semibold mt-1">
            {report.difficulty}
        </p>
    </div>

</div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">

                <h2 className="text-2xl font-bold text-white mb-6">
                    Overall Score :   {report.totalQuestions > 0
        ? `${(
              (report.overallScore /
                  (report.totalQuestions * 10)) *
              100
          ).toFixed(1)}%`
        : "0%"}
                </h2>

                <div className="mb-8">
                    <h3 className="text-xl text-green-400 font-semibold mb-3">
                        💪 Strengths
                    </h3>

                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                        {report.strengths?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl text-red-400 font-semibold mb-3">
                        ⚠️ Weaknesses
                    </h3>

                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                        {report.weaknesses?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl text-yellow-400 font-semibold mb-3">
                        📚 Suggestions
                    </h3>

                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                        {report.suggestions?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                    Back to Dashboard
                </button>

            </div>

        </div>
    );
};

export default InterviewReport;