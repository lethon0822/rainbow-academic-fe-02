import axios from "./httpRequester";

export const login = (args) => {
  return axios.post("/account/login", args).catch((e) => e.response);
};

export const check = () => {
  return axios.get("/account/check").catch((e) => e.response);
};

export const logout = () => {
  return axios.post("/account/logout").catch((e) => e.response);
};

export const findId = (params) => {
  return axios.get("/account/id", { params }).catch((e) => e.response);
};
