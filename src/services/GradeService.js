import axios from "./httpRequester";

// 영구 성적 조회 (금학기 제외)
export function GradesbyCourse(params) {
  return axios.get("/student/grade/permanent", {params});
}
