import api from "./api";
export const getQuestions = async (params = {}) => {
    const response = await api.get("/questions", {
        params,
    });

    return response.data;
};