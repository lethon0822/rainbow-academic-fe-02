import axios from "./httpRequester";

export const deptGet = (params) => {
  return axios.get("/staff/department", { params }).catch((e) => e.response);
};

export const deptPost = (jsonBody) => {
  return axios.post("/staff/department", jsonBody).catch((e) => e.response);
};
