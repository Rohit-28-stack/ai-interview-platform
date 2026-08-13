import { useState,useEffect } from "react";
import { FaRobot, FaChartLine, FaBook, FaFileAlt } from "react-icons/fa";
import { FaPlay, FaChartBar } from "react-icons/fa";
import StatsCard from "../../components/dashboard/StatsCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import RecentInterviewCard from "../../components/dashboard/RecentInterviewCard";
import { useAuth } from "../../context/AuthContext";
import { getDashboardData } from "../../services/interview.service";
function Dashboard() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState({
  totalInterviews: 0,
  averageScore: 0,
  totalQuestions: 0,
  totalSubmissions:0,
  recentInterviews: [],
});
useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
   
      setDashboard(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchDashboard();
}, []);

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Ready for your next AI interview?
        </p>
      </div>

      {/* Statistics */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-5">
          Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatsCard
            title="Total Interviews"
            value={dashboard.totalInterviews}
            icon={<FaRobot className="text-white text-xl" />}
            color="bg-cyan-500"
          />

          <StatsCard
            title="Average Score"
            value={`${dashboard.averageScore}`}
            icon={<FaChartLine className="text-white text-xl" />}
            color="bg-green-500"
          />

          <StatsCard
            title="Questions"
            value={dashboard.totalQuestions}
            icon={<FaBook className="text-white text-xl" />}
            color="bg-purple-500"
          />

          <StatsCard
            title="Submissions"
            value={dashboard.totalSubmissions}
            icon={<FaFileAlt className="text-white text-xl" />}
            color="bg-orange-500"
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            title="Start Interview"
            description="Begin a new AI interview"
            icon={<FaPlay className="text-white text-xl" />}
            color="bg-cyan-500"
            to="/interview/start"
          />

          <QuickActionCard
            title="Question Bank"
            description="Practice interview questions"
            icon={<FaBook className="text-white text-xl" />}
            color="bg-green-500"
            to="/questions"
          />

          <QuickActionCard
            title="Reports"
            description="View interview reports"
            icon={<FaChartBar className="text-white text-xl" />}
            color="bg-purple-500"
            to="/reports"
          />
        </div>
      </section>

      {/* Recent Interviews */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-5">
          Recent Interviews
        </h2>

        <div className="grid gap-5">
          <RecentInterviewCard
            topic="React"
            difficulty="Medium"
            score={8}
            date="31 Jul 2026"
          />

          <RecentInterviewCard
            topic="Java"
            difficulty="Easy"
            score={9}
            date="30 Jul 2026"
          />

          <RecentInterviewCard
            topic="Node.js"
            difficulty="Hard"
            score={7}
            date="29 Jul 2026"
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;