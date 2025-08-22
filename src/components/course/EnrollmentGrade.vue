<!-- 성적 기입 -->

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);

// 학생 목록 데이터
const students = ref([]);
const courseId = ref("");

// 검색 관련
const searchQuery = ref("");
const selectedStudents = ref([]);
const allSelected = ref(false);

// 총점 계산 함수
const totalScore = (s) => {
  return (
    (s.attendance_score || 0) * 0.2 +
    (s.mid_score || 0) * 0.3 +
    (s.fin_score || 0) * 0.3 +
    (s.etc_score || 0) * 0.2
  );
};

// 등급 계산
const getGrade = (total) => {
  if (total >= 95) return 'A+';
  if (total >= 90) return 'A';
  if (total >= 85) return 'B+';
  if (total >= 80) return 'B';
  if (total >= 75) return 'C+';
  if (total >= 70) return 'C';
  return 'F';
};

// mount 시 데이터 세팅
onMounted(() => {
  const passJson = history.state.data;
  const passid = history.state.id;

  students.value = JSON.parse(passJson).map((s) => ({
    ...s,
    attendance_score: s.attendance || 0,
    mid_score: s.midterm || 0,
    fin_score: s.final || 0,
    etc_score: s.assignment || 0,
    rawScore: totalScore(s),
    convertedScore: totalScore(s), // 변환점수 계산 필요 시 수정
    gradeLetter: getGrade(totalScore(s)),
    gpa: 0, // 평점 계산 로직 추가 가능
  }));

  courseId.value = JSON.parse(passid);
});

// 검색 필터
const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value;
  return students.value.filter(
    (s) =>
      s.name.includes(searchQuery.value) ||
      s.studentNo.includes(searchQuery.value)
  );
});

// 전체 선택
const toggleAll = () => {
  if (allSelected.value) {
    selectedStudents.value = students.value.map((s) => s.user_id);
  } else {
    selectedStudents.value = [];
  }
};

// 개별 수정
const updateGrade = async (student) => {
  try {
    await axios.put("http://localhost:8080/api/professor/course/grade", {
      enrollmentId: student.enrollmentId,
      attendanceScore: student.attendance_score,
      midScore: student.mid_score,
      finScore: student.fin_score,
      assignmentScore: student.etc_score,
      rank: getGrade(totalScore(student)),
    });
    alert(`${student.name} 성적이 수정되었습니다.`);
  } catch (err) {
    console.error(err);
    alert("성적 수정 실패");
  }
};

// 전체 저장
const saveAll = async () => {
  try {
    await axios.post("http://localhost:8080/api/professor/course/grade", students.value);
    alert("전체 저장 완료!");
    await router.push("/enrollmentgrade");
  } catch (err) {
    console.error(err);
    alert("전체 저장 중 오류 발생");
  }
};

// 검색 버튼 클릭
const search = () => {
  console.log("검색 실행:", searchQuery.value);
};

// 엑셀 다운로드 (더미)
const downloadExcel = () => {
  alert("엑셀 다운로드 기능은 추후 구현 예정");
};

// 전체 선택 버튼
const selectAll = () => {
  allSelected.value = true;
  toggleAll();
};
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- 헤더 -->
    <div class="mb-4">
      <h2 class="text-xl font-bold">컴퓨터 과학개론 성적 입력 및 정정</h2>
      <p class="text-gray-600">CS101 | 공학관 301호</p>
    </div>

    <!-- 액션 버튼 -->
    <div class="flex justify-between items-center mb-3">
      <div>
        <button class="btn mr-2 bg-gray-200" @click="selectAll">전체선택</button>
        <button class="btn bg-green-500 text-white" @click="downloadExcel">내보내기</button>
      </div>
      <div class="flex">
        <input v-model="searchQuery" placeholder="이름 또는 학번 검색"
               class="border rounded-l px-3 py-1 w-60" />
        <button class="btn bg-blue-500 text-white rounded-r px-4" @click="search">검색</button>
      </div>
    </div>

    <!-- 성적 테이블 -->
    <div class="overflow-x-auto bg-white shadow rounded">
      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="p-2"><input type="checkbox" v-model="allSelected" @change="toggleAll" /></th>
            <th class="p-2">학번</th>
            <th class="p-2">이름</th>
            <th class="p-2">학년</th>
            <th class="p-2">학과</th>
            <th class="p-2">출석</th>
            <th class="p-2">결석</th>
            <th class="p-2">출결평가</th>
            <th class="p-2">중간평가</th>
            <th class="p-2">기말평가</th>
            <th class="p-2">기타평가</th>
            <th class="p-2">원점수</th>
            <th class="p-2">환산점수</th>
            <th class="p-2">등급</th>
            <th class="p-2">평점</th>
            <th class="p-2">수정</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.user_id" class="border-b">
            <td class="p-2 text-center">
              <input type="checkbox" v-model="selectedStudents" :value="student.user_id" />
            </td>
            <td class="p-2">{{ student.studentNo }}</td>
            <td class="p-2">{{ student.name }}</td>
            <td class="p-2">{{ student.grade }}</td>
            <td class="p-2">{{ student.department }}</td>
            <td class="p-2">{{ student.attendCnt }}</td>
            <td class="p-2">{{ student.absentCnt }}</td>
            <td class="p-2"><input v-model.number="student.attendance_score" type="number" class="input" /></td>
            <td class="p-2"><input v-model.number="student.mid_score" type="number" class="input" /></td>
            <td class="p-2"><input v-model.number="student.fin_score" type="number" class="input" /></td>
            <td class="p-2"><input v-model.number="student.etc_score" type="number" class="input" /></td>
            <td class="p-2">{{ student.rawScore }}</td>
            <td class="p-2">{{ student.convertedScore }}</td>
            <td class="p-2">{{ student.gradeLetter }}</td>
            <td class="p-2">{{ student.gpa }}</td>
            <td class="p-2">
              <button class="btn bg-gray-300 px-3 py-1" @click="updateGrade(student)">수정</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 전체 저장 버튼 -->
    <div class="mt-4 text-right">
      <button class="btn bg-blue-600 text-white px-5 py-2" @click="saveAll">전체저장</button>
    </div>
  </div>
</template>

<style scoped>
.input {
  border: 1px solid #ccc;
  padding: 2px;
  width: 60px;
  text-align: center;
}
.btn {
  border-radius: 4px;
}
</style>

