import axios from "./httpRequester";

// 성적 조회 간소
export const getGrades = (userId) => {
  return axios.get("/student/rank", { params: { userId } });
};

// 과목별 성적 (성적 전체 조회)
export function GradesbyCourse(userId) {
  const parsedUserId = Number(userId);
  if (!userId || isNaN(parsedUserId)) {
    console.error("❌ userId가 없거나 숫자가 아닙니다:", userId);
    return Promise.reject(new Error("userId가 유효하지 않습니다."));
  }

  return axios.get("/student/grade/all", {
    params: { userId: parsedUserId },
    withCredentials: true,
  });
}

// 학생 프로필
export const getProfile = (loginId = "10001") => {
  return axios.get("/student/profile", {
    params: { loginId },
    withCredentials: true,
  });
};
