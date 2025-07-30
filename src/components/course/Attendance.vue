<script setup>
import { ref, reactive, onMounted} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import WhiteBox from "@/components/common/WhiteBox.vue";

const router = useRouter();
const attendDate = ref('');

const state = reactive({
  data:[],
  courseId:''
})
onMounted(async ()=>{
  const passJson = history.state.data;
  const passid = history.state.id;
  const nana = JSON.parse(passJson);
  state.data = nana
  const id = JSON.parse(passid)
  state.courseId = id;
  console.log('스테이트데이타:',state.data)
  console.log('라우팅 아이디:',state.courseId)
  }
)
const isLoading = ref(false);
const saveAttendance = async () => {
  if (!attendDate.value) {
    alert("출결일자를 선택해주세요.");
    return;
  }
  isLoading.value = true; // 로딩 시작
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
    await router.push("/professor/attendance"); // 교수 홈으로 이동 (원하는 경로 바꿔도 됨)
  } catch (error) {
    console.error("출결 저장 중 오류:", error);
    alert("출결 저장 중 오류가 발생했습니다.");
  } finally {
    isLoading.value = false; //로딩 끝
  }
};
</script>
<template>
  <WhiteBox title="출결 관리">
    <div class="container mt-4">
      <h2 class="text-center fw-bold mb-4">출결 입력창</h2>
      <div class="mb-3">
        <label class="form-label">출결일자</label>
        <input
          type="date"
          v-model="attendDate"
          class="form-control w-25"
        />
      </div>
      <table class="attendance-table">
        <thead class="grade-table-header">
          <tr>
            <th>이름</th>
            <th>학번</th>
            <th>출결 상태</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in state.data" :key="s.enrollmentId">
            <td>{{ s.userName }}</td>
            <td>{{ s.loginId }}</td>
            <td>
              <select v-model="s.status" class="form-select">
                <option disabled value="">선택</option>
                <option value="출석">출석</option>
                <option value="지각">지각</option>
                <option value="결석">결석</option>
                <option value="병가">병가</option>
                <option value="경조사">경조사</option>
              </select>
            </td>
            <td>
              <input
                v-model="s.note"
                :disabled="!['지각', '병가', '경조사'].includes(s.status)"
                class="form-control"
                placeholder="사유 입력"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center mt-4">
        <button @click="saveAttendance" class="btn btn-primary px-4">
          저장!
        </button>
      </div>
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
:deep(.attendance-table) {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;  /* :흰색_확인_표시: 테두리 전체 */
  th, td {
    border: 1px solid #ddd !important; /* :흰색_확인_표시: 셀 간 경계선 */
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #364157;
    color: white;
  }
  input,
  select {
    padding: 4px 6px;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>