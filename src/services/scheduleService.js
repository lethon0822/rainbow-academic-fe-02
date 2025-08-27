import axios from 'axios';

// 필요하면 axios.defaults.baseURL = 'http://localhost:8080';

export const getSchedulesByMonth = (year, month) =>
  axios.get('/schedule', { params: { year, month } });

export const createSchedule = (payload) =>
  axios.post('/schedule', payload);

export const updateSchedule = (payload) =>
  axios.put('/schedule', payload);

export const deleteSchedule = (id) =>
  axios.delete('/schedule', { params: { id } });