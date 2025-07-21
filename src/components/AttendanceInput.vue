<script setup>
import { ref } from 'vue';
import axios from 'axios';

const attendDate = ref('');

// 임시 하드코딩 학생 데이터
const students = ref([
  {
    enrollmentId: 1,
    name: '김수연',
    studentId: '20257945',
    status: '',
    note: '',
  },
  {
    enrollmentId: 2,
    name: '김철수',
    studentId: '20257946',
    status: '',
    note: '',
  },
]);

const saveAttendance = async () => {
  if (!attendDate.value) {
    alert('출결일자를 선택해주세요.');
    return;
  }

  try {
    for (const s of students.value) {
      if (!s.status) {
        alert(`학생 ${s.name}의 출결 상태를 선택해주세요.`);
        return;
      }

      const payload = {
        attendDate: attendDate.value,
        enrollmentId: s.enrollmentId,
        status: s.status,
        note: s.note,
      };

      const { data: exists } = await axios.post(
        '/api/professor/course/check/exist',
        payload
      );
      if (exists === 0) {
        await axios.post('/api/professor/course/check', payload);
      } else {
        await axios.put('/api/professor/course/check', payload);
      }
    }

    alert('출결 저장 완료!'); // 알림 띄우고
    router.push('/professor'); // 교수 홈으로 이동 (원하는 경로 바꿔도 됨)
  } catch (error) {
    console.error('출결 저장 중 오류:', error);
    alert('출결 저장 중 오류가 발생했습니다.');
  }
};
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">출결입력</h2>

    <label class="block mb-2">출결일자</label>
    <input
      type="date"
      v-model="attendDate"
      class="mb-4 border px-2 py-1 rounded"
    />

    <table class="table-auto w-full border">
      <thead>
        <tr>
            <th class="border px-2 py-1">이름</th>
            <th class="border px-2 py-1">학번</th>
            <th class="border px-2 py-1">출결 상태</th>
            <th class="border px-2 py-1">비고</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="s in students" :key="s.enrollmentId">
            <td class="border px-2 py-1">{{ s.name }}</td>
            <td class="border px-2 py-1">{{ s.studentId }}</td>
            <td class="border px-2 py-1">
            <select v-model="s.status" class="border px-1 py-1 rounded">
                <option disabled value="">선택</option>
                <option value="출석">출석</option>
                <option value="지각">지각</option>
                <option value="결석">결석</option>
                <option value="병가">병가</option>
                <option value="경조사">경조사</option>
            </select>
        </td>
        <td class="border px-2 py-1">
            <input
                v-model="s.note"
                :disabled="!['지각', '병가', '경조사'].includes(s.status)"
                class="border px-1 py-1 rounded w-full"
                placeholder="사유 입력"
            />
        </td>
        </tr>
    </tbody>
    </table>

    <button
        @click="saveAttendance"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
    저장!
    </button>
  </div>
</template>
