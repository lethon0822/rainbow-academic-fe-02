import axios from "./HttpService";

//성적 조회 간소
export const getGrades = (params) => {
  return axios.get("/student/rank", { params });
};

//과목별 성적(성적전체조회)
export function GradesbyCourse() {
  return axios.get("/student/grade/all", { params: { userId: 1 } });
}
