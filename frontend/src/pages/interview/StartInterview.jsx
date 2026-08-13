import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { startInterview } from "../../services/interview.service";
import toast from "react-hot-toast";

const StartInterview = () => {
  const [topic, setTopic] = useState("Java");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      setLoading(true);
    

      const response = await startInterview({
        topic,
        difficulty,
      });
        console.log(response)
     
      
      toast.success("Interview started");

      navigate(`/interview/${response.data.interviewId}`, {
        state: {
          question: response.data.question,
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-center mb-8">
        🤖 Start AI Interview
      </h2>

      {/* Topic */}
      <div className="mb-5">
        <label className="block mb-2 font-medium">Topic</label>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none"
        >
          <option>Java</option>
          <option>JavaScript</option>
          <option>React</option>
          <option>Node.js</option>
          <option>MongoDB</option>
          <option>DBMS</option>
          <option>Operating System</option>
          <option>Computer Networks</option>
          <option>OOP</option>
          <option>DSA</option>
        </select>
      </div>

      {/* Difficulty */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Difficulty</label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Starting..." : "Start Interview"}
      </button>
    </div>
  );
};

export default StartInterview;