import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getQuestions } from "../../services/question.service";
import { useNavigate } from "react-router-dom";
const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
const navigate=useNavigate();
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");

    const fetchQuestions = async () => {
        try {
            setLoading(true);

            const response = await getQuestions({
                search,
                difficulty,
                category,
            });

            setQuestions(
                response.data?.questions ||
                response.data ||
                []
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load questions"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [difficulty, category]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchQuestions();
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">
                    Question Bank
                </h1>

                <p className="text-slate-400 mt-2">
                    Practice technical interview questions.
                </p>
            </div>

            {/* Filters */}

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-8">

                <form
                    onSubmit={handleSearchSubmit}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >

                    {/* Search */}

                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={handleSearch}
                        className="bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    {/* Difficulty */}

                    <select
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(e.target.value)
                        }
                        className="bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="">
                            All Difficulties
                        </option>

                        <option value="Easy">
                            Easy
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Hard">
                            Hard
                        </option>
                    </select>

                    {/* Category */}

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                        <option value="">
                            All Categories
                        </option>

                        <option value="Java">
                            Java
                        </option>

                        <option value="JavaScript">
                            JavaScript
                        </option>

                        <option value="React">
                            React
                        </option>

                        <option value="Node.js">
                            Node.js
                        </option>

                        <option value="MongoDB">
                            MongoDB
                        </option>

                        <option value="SQL">
                            SQL
                        </option>
                    </select>

                    <button
                        type="submit"
                        className="md:col-span-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Search Questions
                    </button>

                </form>

            </div>

            {/* Questions */}

            {loading ? (
                <div className="text-center text-slate-400 py-20">
                    Loading questions...
                </div>
            ) : questions.length === 0 ? (
                <div className="text-center text-slate-400 py-20">
                    No questions found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {questions.map((question) => (
                        <div
                            key={question._id}
                              onClick={() => navigate(`/questions/${question._id}`)}
                            className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-500 transition"
                        >

                            <div className="flex justify-between items-start gap-4">

                                <h2 className="text-xl font-semibold text-white">
                                    {question.title}
                                </h2>

                                <span className="text-xs bg-cyan-600 text-white px-3 py-1 rounded-full whitespace-nowrap">
                                    {question.difficulty}
                                </span>

                            </div>

                            <p className="text-slate-400 mt-4 line-clamp-3">
                                {question.description}
                            </p>

                            <div className="flex justify-between items-center mt-6">

                                <span className="text-sm text-cyan-400">
                                    {question.category}
                                </span>

                                <span className="text-sm text-slate-500">
                                    {question.type}
                                </span>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default Questions;