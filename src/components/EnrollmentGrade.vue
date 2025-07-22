<!-- 성적 기입 -->

<script setup>
import { ref, watchEffect } from 'vue';
import axios from 'axios';
import WhiteBox from './WhiteBox.vue';

const students = ref([
  {
    enrollmentId: 1,
    major: '컴퓨터공학과',
    studentId: '20257945',
    name: '유아린',
    attendanceScore: 90,
    midtermScore: 80,
    finalScore: 70,
    assignmentScore: 85,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 2,
    major: '전자공학과',
    studentId: '20257946',
    name: '홍길동',
    attendanceScore: 80,
    midtermScore: 75,
    finalScore: 60,
    assignmentScore: 90,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 3,
    major: '전자공학과',
    studentId: '20257946',
    name: '남효정',
    attendanceScore: 80,
    midtermScore: 75,
    finalScore: 60,
    assignmentScore: 90,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 4,
    major: '경영학과',
    studentId: '20257946',
    name: '김효정',
    attendanceScore: 80,
    midtermScore: 75,
    finalScore: 60,
    assignmentScore: 90,
    totalScore: 0,
    grade: ''
  },
  {
    enrollmentId: 5,
    major: '일본어학과',
    studentId: '20257946',
    name: '조효정',
    attendanceScore: 80,
    midtermScore: 75,
    finalScore: 60,
    assignmentScore: 90,
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
    if (s.totalScore >= 95) s.grade = 'A+';
    else if (s.totalScore >= 90) s.grade = 'A';
    else if (s.totalScore >= 85) s.grade = 'B+';
    else if (s.totalScore >= 80) s.grade = 'B';
    else if (s.totalScore >= 75) s.grade = 'C+';
    else if (s.totalScore >= 70) s.grade = 'C';
    else s.grade = 'F';
  });
});

// 저장 API
const saveGrades = async () => {
  try {
    for (const s of students.value) {
      const enrollmentgradeputreq = {
        enrollmentId: s.enrollmentId,
        score: s.totalScore,
        grade: s.grade
    };
    await axios.put('http://localhost:8080/api/professor/course/grade', enrollmentgradeputreq);
    }
    alert('성적 저장 완료!');
    } catch (e) {
    console.error(e);
    alert('저장 실패!');
    }
};
</script>

<template>
    <WhiteBox title="성적 관리">
    <div class="max-w-4xl mx-auto p-4">
        <h2 class="text-2xl font-bold mb-4 text-center">
        성적입력 (출석20%, 중간30%, 기말30%, 과제20%)
        </h2>

        <table class="w-full border text-center">
        <thead class="bg-gray-100">
            <tr>
            <th class="border px-2 py-1">학과</th>
            <th class="border px-2 py-1">학번</th>
            <th class="border px-2 py-1">이름</th>
            <th class="border px-2 py-1">출석<br/>(20%)</th>
            <th class="border px-2 py-1">중간<br/>(30%)</th>
            <th class="border px-2 py-1">기말<br/>(30%)</th>
            <th class="border px-2 py-1">과제<br/>(20%)</th>
            <th class="border px-2 py-1">총점<br/>(%)</th>
            <th class="border px-2 py-1">등급</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="s in students" :key="s.enrollmentId">
            <td class="border px-2 py-1">{{ s.major }}</td>
            <td class="border px-2 py-1">{{ s.studentId }}</td>
            <td class="border px-2 py-1">{{ s.name }}</td>
            <td class="border px-2 py-1">
                <input
                type="number"
                v-model="s.attendanceScore"
                min="0"
                max="100"
                class="w-16 border rounded text-center"
                />
            </td>
            <td class="border px-2 py-1">
                <input
                type="number"
                v-model="s.midtermScore"
                min="0"
                max="100"
                class="w-16 border rounded text-center"
                />
            </td>
            <td class="border px-2 py-1">
                <input
                type="number"
                v-model="s.finalScore"
                min="0"
                max="100"
                class="w-16 border rounded text-center"
                />
            </td>
            <td class="border px-2 py-1">
                <input
                type="number"
                v-model="s.assignmentScore"
                min="0"
                max="100"
                class="w-16 border rounded text-center"/>
            </td>
            <td class="border px-2 py-1">
                <input
                type="text"
                :value="s.totalScore + '%'"
                class="w-20 border rounded text-center bg-gray-100"
                readonly/>
            </td>
            <td class="border px-2 py-1">
                <input
                type="text"
                :value="s.grade"
                class="w-16 border rounded text-center bg-gray-100"
                readonly />
            </td>
        </tr>
        </tbody>
    </table>

    <div class="text-center mt-6">
        <button @click="saveGrades" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
            저장
        </button>
    </div>
    </div>
    </WhiteBox>
</template>

<style scoped lang="scss">
button {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background-color: #2563eb;
}
</style>
