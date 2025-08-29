import axios from "@/services/httpRequester"

export const getMemberList = (json) =>{
  return axios.get("/staff/member",json).catch(e => e.response);
}