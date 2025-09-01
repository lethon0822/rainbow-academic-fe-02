import axios from "./httpRequester";

// 영구 성적 조회 (금학기 제외)
export function GradesbyCourse({ year, semester, semesterId }) {
  return axios.get("/student/grade/permanent", {
    // /api 제거
    params: {
      year,
      semester,
      semesterId,
    },
    withCredentials: true,
  });
}

// 기존에 있던 함수들 유지
export const getProfile = () => {
  return axios.get("/api/student/profile", {
    withCredentials: true,
  });
};

export const getGrades = (userId) => {
  return axios.get("/api/student/rank", { params: { userId } });
};
