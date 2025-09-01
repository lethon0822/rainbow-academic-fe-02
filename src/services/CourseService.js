import axios from "./httpRequester";
const path = "/course";

//searchFilter 학과 가져오는 용도 
export const getDepartments = () => {
    return axios.get(`${path}/filter/department`).catch(e => e.response);
}

//searchFilter 연도 가져오는 용도
export const getYears = () => {
  return axios.get(`${path}/filter/year`).catch((e) => e.response);
};

//searchFilter에 따른 강의 리스트 조회
export const getCourseListByFilter = (filters) => {
  return axios.get(path, {
    params: filters,
  });
};


// 강의조회
export const loadCourse = (course_id) => {
  return axios.get(`/course/${course_id}`, course_id).catch((e) => e.response);
};
