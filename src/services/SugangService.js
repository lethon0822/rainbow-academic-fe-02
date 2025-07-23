import axios from "@/services/httpRequester"

//수강 신청 
export const postEnrollCourse = (sugangReq) => {
    return axios.post('/student/sugang', sugangReq); 
}