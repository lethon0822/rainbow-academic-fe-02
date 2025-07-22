import axios from "@/services/httpRequester"

// 강의등록
export const saveCourse = jsonBody =>{
  return axios.post("/professor/course", jsonBody).catch(e => e.response);
}

// 등록한 강의 보기 
export const findMyCourse = params =>{
  return axios.get("/professor/course", {params}).catch(e => e.response);
}