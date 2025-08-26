import axios from 'axios';

// 필요하면 axios.defaults.baseURL = 'http://localhost:8080';

export const getSchedulesByMonth = (year, month) =>
  axios.get('/api/schedule', { params: { year, month } });

export const createSchedule = (payload) =>
  axios.post('/api/schedule', payload);

export const updateSchedule = (payload) =>
  axios.put('/api/schedule', payload);

export const deleteSchedule = (id) =>
  axios.delete('/api/schedule', { params: { id } });