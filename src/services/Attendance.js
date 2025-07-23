import axios from 'axios';

export const attendance = () => {
    return axios.put('/professor/course/check', data).catch((e) => e.response);
}

