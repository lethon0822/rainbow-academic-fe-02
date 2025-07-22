import axios from "@/services/httpRequester"

// 강의등록
export const loadCourse = id =>{
  return axios.get(`/course/${id}`, id).catch(e => e.response);
}