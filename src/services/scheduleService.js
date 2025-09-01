import axios from 'axios';



export const getSchedulesByMonth = (year, month) =>
  axios.get('/schedule', { params: { year, month } });

export const createSchedule = (payload) =>
  axios.post('/schedule', payload);

export const updateSchedule = (payload) =>
  axios.put('/schedule', payload);

export const deleteSchedule = (id) =>
  axios.delete('/schedule', { params: { id } });

export const getScheduleFor = ({ semesterId, type }) =>
  axios.get('/schedules', { params: { semesterId, type } }).then(r => r.data[0] || null);