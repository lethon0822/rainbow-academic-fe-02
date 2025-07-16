import axios, { API_PATH } from "./HttpService";

//성적 조회 간소
export const getGrades = (params) => {
  return axios.get("/api/grades", { params });
};
