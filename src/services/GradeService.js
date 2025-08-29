import axios from "./httpRequester";

// 영구 성적 조회
export function GradesbyCourse(userId) {
  const parsedUserId = Number(userId);
  if (!userId || isNaN(parsedUserId)) {
    console.error("❌ userId가 없거나 숫자가 아닙니다:", userId);
    return Promise.reject(new Error("userId가 유효하지 않습니다."));
  }

  return axios.get("/student/grade/permanent", {
    params: { userId: parsedUserId },
    withCredentials: true,
  });
}

//금학기 성적 조회

// 학생 프로필
export const getProfile = () => {
  return axios.get("/student/profile", {
    withCredentials: true,
  });
};

export const getGrades = (userId) => {
  return axios.get("/student/rank", { params: { userId } });
};
