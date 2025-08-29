import axios from "./httpRequester";

export const getList = (param) => {
  return axios.get("/api/staff/approval", {param}).catch((e) => e.response);
};

export const decicdeApp = (param) => {
    return axios.patch("/api/staff/approval", {param}).catch((e) => e.response);
}