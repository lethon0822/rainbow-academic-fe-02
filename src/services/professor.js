import axios from "@/services/httpRequester"

// 강의등록
export const saveCourse = jsonBody =>{
  return axios.post("/professor/course", jsonBody).catch(e => e.response);

}