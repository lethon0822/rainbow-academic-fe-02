import axios from "./httpRequester";

//성적 조회 간소
export const getGrades = (params) => {
  return axios.get("/student/rank", { params });
};

//과목별 성적(성적전체조회)
export function GradesbyCourse() {
  return axios.get("/student/grade/all", { params: { userId: 1 } });
}

//학생프로필
export const getProfile = (loginId = "10001") => {
  return axios.get("/student/profile", {
    params: { loginId },
    withCredentials: true,
  });
};
