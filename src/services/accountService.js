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

export const getAddressByZipcode = async (zipcode) => {
  const res = await axios.get(`/api/zipcode?code=${zipcode}`);
  return res.data;
};

export const updateUser = async (userDto) => {
  const res = await axios.post("/api/user/update", userDto);
  return res.data;
};

export async function verifyAuthCode(code) {
  return await axios.post("/api/email/verify-code", { code });
}

export async function changePasswordApi(userId, newPassword) {
  return await axios.post("/api/user/change-password", {
    userId,
    newPassword,
  });
}
