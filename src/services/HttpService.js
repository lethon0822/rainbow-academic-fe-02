import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const HttpService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const gradeService = {
  getAllGrades(studentId) {
    return HttpService.get(`/grades/${studentId}`);
  },

  getGradesBySemester(studentId, semester) {
    return HttpService.get(`/grades/${studentId}/${semester}`);
  },
};

export const evaluationService = {
  submitEvaluation(studentId, evaluationData) {
    return HttpService.post(`/evaluations/${studentId}`, evaluationData);
  },
};
