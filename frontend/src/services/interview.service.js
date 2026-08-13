import api from "./api";

export const getDashboardData = async () => {
    const response = await api.get("/interview/dashboard");
    return response.data;
};

export const startInterview = async (data) => {
    const response = await api.post("/interview/start", data);
    return response.data;
};

export const submitAnswer = async (data) => {
    const response = await api.post("/interview/submit", data);
    return response.data;
};

export const getInterviewReport = async (interviewId) => {
    const response = await api.get(`/interview/report/${interviewId}`);
    return response.data;
};