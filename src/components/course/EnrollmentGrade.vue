<!-- 성적 기입 -->

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import WhiteBox from '@/components/common/WhiteBox.vue';

const router = useRouter();
const isLoading = ref(false);


// 라우터로부터 받은 데이터 보관용
const state = reactive({
  data: [],
  courseId: '',
});
console.log('받은 데이터', state.data);

// 총점 계산 함수
const totalScore = (s) => {
  return (
    (s.attendance || 0) * 0.2 +
    (s.midterm || 0) * 0.3 +
    (s.final || 0) * 0.3 +
    (s.assignment || 0) * 0.2
  );
};

const getGrade = (total) => {
  if (total >= 95) return 'A+';
  if (total >= 90) return 'A';
  if (total >= 85) return 'B+';
  if (total >= 80) return 'B';
  if (total >= 75) return 'C+';
  if (total >= 70) return 'C';
  return 'F';
};

// 페이지 진입 시 전달된 데이터 파싱 및 기본값 0 세팅
onMounted(() => {
  
  const passJson = history.state.data;
  const passid = history.state.id;

  const parsedStudents = JSON.parse(passJson);
  const parsedCourseId = JSON.parse(passid);

  state.data = parsedStudents.map((s) => ({
    ...s,
    attendance: s.attendance !== undefined ? s.attendance : 0,
    midterm: s.midterm !== undefined ? s.midterm : 0,
    final: s.final !== undefined ? s.final : 0,
    assignment: s.assignment !== undefined ? s.assignment : 0,
  }));

  state.courseId = parsedCourseId;

  console.log('학생 목록(history):', state.data);
  console.log('코스 아이디:', state.courseId);
});



// 성적 저장 로직
const saveGrade = async () => {
  isLoading.value = true;

  try {
    for (const s of state.data) {
      const data = {
        enrollmentId: s.enrollmentId,
        attendance: s.attendance || 0,
        midterm: s.midterm || 0,
        final: s.final || 0,
        assignment: s.assignment || 0,
        total: totalScore(s),
      };

      const { data: exists } = await axios.post(
        '/professor/grade/check/exist',
        data
      );

      if (exists === 0) {
        await axios.post('/professor/grade/save', data);
      } else {
        await axios.put('/professor/grade/update', data);
      }
    }

    alert('성적 저장 완료!');
    await router.push('/professor/grade');
  } catch (err) {
    console.error('성적 저장 오류:', err);
    alert('성적 저장 중 오류가 발생했습니다.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <WhiteBox title="성적 관리">
    <div class="container mt-4">
      <h2 class="text-center fw-bold mb-4">성적 입력창</h2>
      <h3 class="text-2xl font-bold mb-4 text-center">
        성적입력 (출석20%, 중간30%, 기말30%, 과제20%)
      </h3>
      <table class="grade-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>학번</th>
            <th>학과</th>
            <th>출석<br />(20%)</th>
            <th>중간<br />(30%)</th>
            <th>기말<br />(30%)</th>
            <th>과제<br />(20%)</th>
            <th>총점</th>
            <th>등급</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="s in state.data" :key="s.enrollmentId">
            <td>{{ s.userName }}</td>
            <td>{{ s.loginId }}</td>
            <td>{{ s.deptName }}</td>
            <!-- 학과 -->

            <!-- 출석 점수 입력 -->
            <td>
              <input
                v-model.number="s.attendance"
                type="number"
                min="0"
                max="100"
                @input="s.attendance = Math.min(100, Math.max(0, s.attendance))"
                class="form-control"
              />
            </td>

            <!-- 중간 점수 입력 (여기에 작성!) -->
            <td>
              <input
                v-model.number="s.midterm"
                type="number"
                min="0"
                max="100"
                @input="s.midterm = Math.min(100, Math.max(0, s.midterm))"
                class="form-control"
              />
            </td>

            <!-- 기말 점수 입력 -->
            <td>
              <input
                v-model.number="s.final"
                type="number"
                min="0"
                max="100"
                @input="s.final = Math.min(100, Math.max(0, s.final))"
                class="form-control"
              />
            </td>

            <!-- 과제 점수 입력 -->
            <td>
              <input
                v-model.number="s.assignment"
                type="number"
                min="0"
                max="100"
                @input="s.assignment = Math.min(100, Math.max(0, s.assignment))"
                class="form-control"
              />
            </td>
            <td>{{ totalScore(s) }}</td>
            <td>{{ getGrade(totalScore(s)) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center mt-4">
        <button
          @click="saveGrade"
          :disabled="isLoading"
          class="btn btn-success px-4"
        >
          성적 저장
        </button>
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
