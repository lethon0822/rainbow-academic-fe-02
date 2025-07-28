<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import WhiteBox from "@/components/common/WhiteBox.vue";

const router = useRouter();
const attendDate = ref('');

const state = reactive({
  data:[],
  courseId:null
})

onMounted(()=>{
  const arrData = history.state.data;
  state.courseId = history.state.id;
  state.data = arrData
})

// 임시 하드코딩 학생 데이터
const students = ref([
  {
    enrollmentId: 30,
    name: 'lily',
    studentId: '20257945',
    status: '',
    note: '',
  },
  {
    enrollmentId: 31,
    name: 'Andy',
    studentId: '20257946',
    status: '',
    note: '',
  },
  {
    enrollmentId: 32,
    name: 'Hannah',
    studentId: '20257947',
    status: '',
    note: '',
  },
  {
    enrollmentId: 33,
    name: 'Jacob',
    studentId: '20257948',
    status: '',
    note: '',
  },
  {
    enrollmentId: 34,
    name: 'lucy',
    studentId: '20257949',
    status: '',
    note: '',
  },
]);

const saveAttendance = async () => {
  if (!attendDate.value) {
    alert("출결일자를 선택해주세요.");
    return;
  }

  try {
    for (const s of students.value) {
      if (!s.status) {
        alert(`학생 ${s.name}의 출결 상태를 선택해주세요.`);
        return;
      }

      const data = {
        attendDate: attendDate.value,
        enrollmentId: s.enrollmentId,
        status: s.status,
        note: s.note,
      };

      const { data: exists } = await axios.post(
        '/professor/course/check/exist',
        data
      );
      if (exists === 0) {
        await axios.post('/professor/course/check', data);
      } else {
        await axios.put('/professor/course/check', data);
      }
    }

    alert("출결 저장 완료!"); // 알림 띄우고
    router.push("/professor"); // 교수 홈으로 이동 (원하는 경로 바꿔도 됨)
  } catch (error) {
    console.error("출결 저장 중 오류:", error);
    alert("출결 저장 중 오류가 발생했습니다.");
  }
};
</script>

<template>
  <WhiteBox title="출결 관리">
    <div class="attendance-wrapper">
      <div class="attendance-box"></div>
      <h2 class="text-xl font-bold mb-4 text-center">출결 입력창</h2>
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
  </WhiteBox>
</template>

<style scoped lang="scss">
// .attendance-wrapper {
//   padding-left: 160px; // 사이드바 피해서
//   padding-top: 30px;
//   padding-right: 30px;
//   display: flex;
//   justify-content: center;
// }

// .attendance-box {
//   max-width: 800px;
//   width: 100%; /* 최대 크기까지 확장 가능 */
//   background: #fff;
//   padding: 24px;
//   border-radius: 12px;
//   box-shadow: 0 0 10px rgba(0,0,0,0.08);

//   /* 중앙보다는 약간 오른쪽으로 밀고 싶으면 margin-left 조절 */
//   margin-left: 80px;
// }

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: left;
}

.form-group {
  margin-bottom: 16px;

  input[type='date'] {
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }

  input,
  select {
    padding: 4px 6px;
    width: 100%;
    box-sizing: border-box;
  }
}

button {
  background-color: #3b82f6;
  color: #3b82f6;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  float: center;
}

button:hover {
  background-color: #2563eb;
}
</style>
