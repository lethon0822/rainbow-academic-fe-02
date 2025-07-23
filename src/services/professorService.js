import axios from "@/services/httpRequester"

// 강의등록
export const saveCourse = jsonBody =>{
  return axios.post("/professor/course", jsonBody).catch(e => e.response);
}
// 등록한 강의 보기
export const findMyCourse = params =>{
  return axios.get("/professor/course", {params}).catch(e => e.response);
}
<<<<<<< HEAD
=======

>>>>>>> d0c30aedebe1a8fe2851f55727eb6bf9d95334e9
// 강의 계획서 수정
export const modify = jsonBody =>{
  return axios.put ("/professor/course", jsonBody).catch(e => e.response);
}