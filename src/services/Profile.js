import axios from './httpRequester';

//
const path = '/user';

export const fetchUserProfile = () => {
    return axios.get(`${path}/profile`).catch(e => e.response);
  };