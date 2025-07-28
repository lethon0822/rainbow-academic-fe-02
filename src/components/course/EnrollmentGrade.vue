<!-- 성적 기입 -->

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import axios from "axios";
<<<<<<< HEAD:src/components/EnrollmentGrade.vue
import WhiteBox from "./WhiteBox.vue";
import { useRoute } from "vue-router";
=======
import WhiteBox from "./common/WhiteBox.vue";
>>>>>>> 8fbc6b44a0f10d1d36eecc80de98ac7b190e59b9:src/components/course/EnrollmentGrade.vue

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
    enrollmentId: 30,
    major: '컴퓨터공학과',
    courseId: '5',
    studentId: '20250001',
    name: '유아린',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: "",
  },
  {
    enrollmentId: 31,
    major: '전자공학과',
    courseId: '9',
    studentId: '20250002',
    name: '홍길동',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 32,
    major: '전자공학과',
    courseId: '7',
    studentId: '20250003',
    name: '남효정',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 33,
    major: '경영학과',
    courseId: '29',
    studentId: '20250004',
    name: '김효정',
    attendanceScore: 0,
    midtermScore: 0,
    finalScore: 0,
    assignmentScore: 0,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 34,
    major: '일본어학과',
    courseId: '28',
    studentId: '20250005',
    name: '조효정',
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
      <h2 class="text-2xl font-bold mb-4 text-center">
        성적입력 (출석20%, 중간30%, 기말30%, 과제20%)
      </h2>
      <table class="grade-table w-full">
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

<style scoped lang="scss">
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: left;
}
.grade-table {
  width: 100%;
  th, td {
    text-align: center;
    vertical-align: middle;
    padding: 8px;
  }
}
input[type='number'], input[type='text'] {
  padding: 4px 8px;
  text-align: center;
}
.grade-table-header {
  background-color: #364157 !important;
  color: white !important;
}
.grade-table th,
.grade-table td {
  vertical-align: middle !important;
  text-align: center;
}
</style>

