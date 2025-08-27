import axios from "./httpRequester";

export const deptlist = params =>{
  return axios.get("/staff/department", {params}).catch(e => e.response);
}