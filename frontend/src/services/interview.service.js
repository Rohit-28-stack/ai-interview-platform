import api from "./api";
export const getDashboardData = async () => {
    const response = await api.get("/interview/dashboard");
    return response.data;
};