// scheduleService.js
import axios from 'axios'

export async function getSchedulesByMonth(year, month) {
  const res = await axios.get('/schedule', { params: { year, month } })
  const d = res?.data
  if (Array.isArray(d)) return d
  if (Array.isArray(d?.data)) return d.data
  if (Array.isArray(d?.list)) return d.list
  if (Array.isArray(d?.data?.list)) return d.data.list
  return []
}

export const createSchedule = (payload) => axios.post('/schedule', payload)
export const updateSchedule = (payload) => axios.put('/schedule', payload)
export const deleteSchedule = (id)      => axios.delete('/schedule', { params: { id } })