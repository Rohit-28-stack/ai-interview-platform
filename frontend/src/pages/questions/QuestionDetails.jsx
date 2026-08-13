import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

const QuestionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchQuestion = async () => {
        try {
            setLoading(true);

            const response = await api.get(`/questions/${id}`);

            setQuestion(response.data.data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load question"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center text-slate-400 py-20">
                Loading question...
            </div>
        );
    }

    if (!question) {
        return (
            <div className="text-center text-slate-400 py-20">
                Question not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">

            <button
                onClick={() => navigate("/questions")}
                className="text-cyan-400 hover:text-cyan-300 mb-6"
            >
                ← Back to Questions
            </button>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">

                <div className="flex justify-between items-start gap-4">

                    <h1 className="text-3xl font-bold text-white">
                        {question.title}
                    </h1>

                    <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm">
                        {question.difficulty}
                    </span>

                </div>

                <div className="flex gap-3 mt-4">

                    <span className="text-cyan-400">
                        {question.category}
                    </span>

                    <span className="text-slate-500">
                        {question.type}
                    </span>

                </div>

                <div className="mt-8">

                    <h2 className="text-xl font-semibold text-white">
                        Description
                    </h2>

                    <p className="text-slate-300 mt-3 leading-7">
                        {question.description}
                    </p>

                </div>

                {question.tags?.length > 0 && (
                    <div className="mt-8">

                        <h2 className="text-xl font-semibold text-white">
                            Tags
                        </h2>

                        <div className="flex flex-wrap gap-2 mt-3">

                            {question.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm"
                                >
                                    #{tag}
                                </span>
                            ))}

                        </div>

                    </div>
                )}

                {question.companies?.length > 0 && (
                    <div className="mt-8">

                        <h2 className="text-xl font-semibold text-white">
                            Asked By
                        </h2>

                        <div className="flex flex-wrap gap-2 mt-3">

                            {question.companies.map(
                                (company, index) => (
                                    <span
                                        key={index}
                                        className="bg-slate-700 text-slate-300 px-3 py-1 rounded-lg text-sm"
                                    >
                                        {company}
                                    </span>
                                )
                            )}

                        </div>

                    </div>
                )}

                {question.hints?.length > 0 && (
                    <div className="mt-8">

                        <h2 className="text-xl font-semibold text-yellow-400">
                            💡 Hints
                        </h2>

                        <ul className="mt-3 space-y-2">

                            {question.hints.map(
                                (hint, index) => (
                                    <li
                                        key={index}
                                        className="text-slate-300"
                                    >
                                        • {hint}
                                    </li>
                                )
                            )}

                        </ul>

                    </div>
                )}

                {question.explanation && (
                    <div className="mt-8 border-t border-slate-700 pt-6">

                        <h2 className="text-xl font-semibold text-green-400">
                            Explanation
                        </h2>

                        <p className="text-slate-300 mt-3 leading-7">
                            {question.explanation}
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
};

export default QuestionDetails;