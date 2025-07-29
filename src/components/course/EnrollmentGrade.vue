<!-- 성적 기입 -->

<script setup>
import { onMounted, ref, watchEffect } from "vue";

import axios from "axios";
import { useRoute } from "vue-router";
import WhiteBox from "@/components/common/WhiteBox.vue";


const student = ref([]);
const route = useRoute();
const courseId = Number(route.params.courseId); // props/ 상태에서 가져오기

onMounted(async () => {
  try {
    const res = await axios.get(`/api/professor/course/${courseId}/grades`);
    students.value = res.data;
  } catch (error) {
    console.error('성적 조회 실패:', error);
  }
});
// 임시 하드코딩
const students = ref([
  {
    enrollmentId: 18,
    major: '컴퓨터공학과',
    courseId: '180',
    studentId: '20001',
    name: '김주현',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: "",
  },
  {
    enrollmentId: 17,
    major: '전자공학과',
    courseId: '181',
    studentId: '20002',
    name: '김설영',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 16,
    major: '전자공학과',
    courseId: '182',
    studentId: '20003',
    name: '류지민',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 15,
    major: '경영학과',
    courseId: '183',
    studentId: '20004',
    name: '남도일',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 14,
    major: '일본어학과',
    courseId: '184',
    studentId: '20005',
    name: '유미란',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: ''
  }
]);

//  점수 유효성 검사 + 총점/등급 자동 계산
watchEffect(() => {
  students.value.forEach((s) => {
    s.attendanceScore = Math.min(100, Math.max(0, s.attendanceScore));
    s.midtermScore = Math.min(100, Math.max(0, s.midtermScore));
    s.finalScore = Math.min(100, Math.max(0, s.finalScore));
    s.assignmentScore = Math.min(100, Math.max(0, s.assignmentScore));

    // 총점 계산
    const total =
      s.attendanceScore * 0.2 +
      s.midtermScore * 0.3 +
      s.finalScore * 0.3 +
      s.assignmentScore * 0.2;

    s.totalScore = Math.round(total * 100) / 100; // 소수점 둘째 자리

    // 등급 계산
    if (s.totalScore >= 95) s.grade = "A+";
    else if (s.totalScore >= 90) s.grade = "A";
    else if (s.totalScore >= 85) s.grade = "B+";
    else if (s.totalScore >= 80) s.grade = "B";
    else if (s.totalScore >= 75) s.grade = "C+";
    else if (s.totalScore >= 70) s.grade = "C";
    else s.grade = "F";
  });
});

// 저장 API
const saveGrades = async () => {
  try {
    for (const s of students.value) {
      const enrollmentgradeputreq = {
        enrollmentId: s.enrollmentId, // 수강 Id
        grade: s.totalScore, // 총점
        rank: s.grade, // 등급 A+, B, C+, F
        midScore: s.midtermScore, // 중간
        finScore: s.finalScore, // 기말
        attendanceScore: s.attendanceScore, // 출석
        assignmentScore: s.assignmentScore // 과제
    };
    await axios.put('http://localhost:8080/api/professor/course/grade', enrollmentgradeputreq);
    }
    alert("성적 저장 완료!");
  } catch (e) {
    console.error(e);
    alert("저장 실패!");
  }
};
</script>

<template>
  <WhiteBox title="성적 관리">
    <div class="grade-wrapper">
      <h3 class="text-2xl font-bold mb-4 text-center">
        성적입력 (출석20%, 중간30%, 기말30%, 과제20%)
      </h3>
      <table class="grade-table">
      <thead class="grade-table-header">
          <tr>
            <th class="px-3 py-2 text-center align-middle">학과</th>
            <th class="px-3 py-2 text-center align-middle">학번</th>
            <th class="px-3 py-2 text-center align-middle">이름</th>
            <th class="px-3 py-2 text-center align-middle">출석<br />(20%)</th>
            <th class="px-3 py-2 text-center align-middle">중간<br />(30%)</th>
            <th class="px-3 py-2 text-center align-middle">기말<br />(30%)</th>
            <th class="px-3 py-2 text-center align-middle">과제<br />(20%)</th>
            <th class="px-3 py-2 text-center align-middle">총점<br />(%)</th>
            <th class="px-3 py-2 text-center align-middle">등급</th>
          </tr>
        </thead>
          <tbody>
        <tr v-for="s in students" :key="s.enrollmentId">
          <td class="text-center align-middle px-3 py-2">{{ s.major }}</td>
          <td class="text-center align-middle px-3 py-2">{{ s.studentId }}</td>
          <td class="text-center align-middle px-3 py-2">{{ s.name }}</td>
          <td><input type="number" v-model="s.attendanceScore" class="form-control" /></td>
          <td><input type="number" v-model="s.midtermScore" class="form-control" /></td>
          <td><input type="number" v-model="s.finalScore" class="form-control" /></td>
          <td><input type="number" v-model="s.assignmentScore" class="form-control" /></td>
          <td><input type="text" :value="s.totalScore + '%'" class="form-control bg-light" readonly /></td>
          <td><input type="text" :value="s.grade" class="form-control bg-light" readonly /></td>
        </tr>
      </tbody>
      </table>

      <div class="text-center mt-3">
        <button @click="saveGrades" class="btn btn-primary">저장</button>
      </div>
    </div>
  </WhiteBox>
</template>

<style scoped>
:deep(.grade-table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  border: 1px solid #ddd; /* 테이블 외곽선 */

  th,
  td {
    border: 1px solid #ddd !important; /* 셀 구분선 */
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #364157;
    color: white;
  }

  input {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    background-color: #f8f9fa; /* 입력 칸에 연한 회색 */
  }
}
</style>


