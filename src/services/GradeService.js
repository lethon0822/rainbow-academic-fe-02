import axios from "./HttpService";

//성적 조회 간소
export const getGrades = (params) => {
  return axios.get("/student/rank", { params });
};

//성적 조회 전체
