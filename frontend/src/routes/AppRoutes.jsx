import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import StartInterview from "../pages/interview/StartInterview";
import Interview from "../pages/interview/Interview"
import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import InterviewReport from "../pages/interview/Report";
import QuestionDetails from "../pages/questions/QuestionDetails";
import Questions from "../pages/questions/Questions";
import Submissions from "../pages/submissions/Submission";
import Profile from "../pages/profile/Profile";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview/start" element={<StartInterview />} />
          <Route path="/interview/:id" element={<Interview />} />
          <Route path="/interview/report/:id" element={<InterviewReport/>}/>
          <Route path="/questions" element={<Questions/>}/>
          <Route path="/questions" element={<QuestionDetails/>}/>
          <Route path="/submissions" element={<Submissions />}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;