import axios from './httpRequester';


export const getPrivacy = (userId) => {
    return axios.get(`/account/privacy/${userId}`).catch(e => e.response);
};

export const putPrivacy = (jsonBody) => {
  return axios.put('/account/privacy', jsonBody).catch(e => e.response);
};