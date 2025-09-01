import axios from "./httpRequester";

export const getList = (params) => {
  return axios.get("/api/staff/approval", { params }).catch((e) => e.response);
};

export const getOne = (id) =>{
  return axios.get(`/api/staff/approval/${id}`).catch((e) => e.response);
}

export const decideApp = (param) => {
  return axios.patch("/api/staff/approval", param).catch((e) => e.response);
}