import api from "./api";

export const createSubmission = async (data) => {
  const response = await api.post("/submissions", data);
  return response.data;
};

export const getMySubmissions = async () => {
  const response = await api.get("/submissions/my");
  return response.data;
};