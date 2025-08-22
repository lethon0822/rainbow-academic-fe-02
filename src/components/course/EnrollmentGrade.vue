<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import WhiteBox from "@/components/common/WhiteBox.vue";

const grades = reactive({
  data: [],
  courseId: ""
});

// 라우터로 전달된 학생정보/과목ID 세팅
onMounted(() => {
  const passJson = history.state.data; // 학생정보
  const passid = history.state.id;     // courseId
  const nana = JSON.parse(passJson);

grades.data = nana.map(s => ({
  ...s,
  attendanceDays: s.attendanceDays ?? 0,   // 출결일수
  absence: s.absence ?? 0,        // 결석일수
  attendanceEval: s.attendanceEval ?? 0,   // 출결평가
  attendance: s.attendance ?? 0,           // 출결 점수
  assignment: s.assignment ?? 0,           // 과제 점수
  midterm: s.midterm ?? 0,                 // 중간
  finalExam: s.finalExam ?? 0,             // 기말
  total: 0,
  grade: "",
  gpa: 0
}));

  grades.courseId = JSON.parse(passid);
});

// 👉 총점, 등급, 평점 자동계산
const calculate = (s) => {
  // 가중치 예시: 출결10 + 과제20 + 중간30 + 기말40
  s.total = (s.attendance * 0.1) + (s.assignment * 0.2) + (s.midterm * 0.3) + (s.finalExam * 0.4);

  if (s.total >= 95) { s.grade = "A+"; s.gpa = 4.5; }
  else if (s.total >= 90) { s.grade = "A"; s.gpa = 4.0; }
  else if (s.total >= 85) { s.grade = "B+"; s.gpa = 3.5; }
  else if (s.total >= 80) { s.grade = "B"; s.gpa = 3.0; }
  else if (s.total >= 75) { s.grade = "C+"; s.gpa = 2.5; }
  else if (s.total >= 70) { s.grade = "C"; s.gpa = 2.0; }
  else if (s.total >= 60) { s.grade = "D"; s.gpa = 1.0; }
  else { s.grade = "F"; s.gpa = 0; }
};


// 👉 저장 API 호출
const saveGrades = async () => {
  try {
    for (const s of grades.data) {
      const data = {
        enrollmentId: s.enrollmentId,
        attendance: s.attendance,
        assignment: s.assignment,
        midterm: s.midterm,
        finalExam: s.finalExam,
        total: s.total,
        grade: s.grade,
        gpa: s.gpa,
      };
      await axios.put("/professor/course/grade", data);
    }
    alert("성적 저장 완료!");
  } catch (err) {
    console.error("성적 저장 오류:", err);
    alert("성적 저장 실패!");
  }
  
};
</script>

<template>
  <WhiteBox title="성적 관리">
    <div class="grade-container">
      <h3 class="subtitle">성적 입력 및 정정</h3>

        <div class="flex justify-between items-center mb-3">

          <div class="button-group">
    <button class="btn btn-success">전체선택</button>
    <button class="btn btn-success">내보내기</button>
      </div>
      <div class="flex justify-end items-center mb-3 search-box">
  <input
    type="text"
    placeholder="이름 또는 학번 검색"
    class="search-input"
  />
  <button class="btn btn-primary ml-2">저장</button>
</div>
    </div>

      <table class="grade-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>이름</th>
            <th>학번</th>
            <th>학과</th>
            <th>출결일수</th>
            <th>결석일수</th>
            <th>출결평가</th>
            <th>중간</th>
            <th>기말</th>
            <th>총점</th>
            <th>등급</th>
            <th>평점</th>
            <th>수정</th>
          </tr>
        </thead>
      <tbody>
  <tr v-for="s in grades.data" :key="s.enrollmentId">
    <td><input type="checkbox" /></td>
    <td>{{ s.userName }}</td>
    <td>{{ s.loginId }}</td>
    <td>{{ s.departmentName }}</td>
    
    <td>
      <input v-model.number="s.attendance" type="number" @input="calculate(s)" value="0" />
    </td>
    <td>
      <input v-model.number="s.absence" type="number" @input="calculate(s)" value="0" />
    </td>
    
    <td>
      <input v-model.number="s.attendanceEval" type="number" @input="calculate(s)" value="0" />
    </td>
    <td>
      <input v-model.number="s.midterm" type="number" @input="calculate(s)" value="0" />
    </td>
    <td>
      <input v-model.number="s.finalExam" type="number" @input="calculate(s)" value="0" />
    </td>
    <td>{{ s.total.toFixed(1) }}</td>
    <td>{{ s.grade }}</td>
    <td>{{ s.gpa.toFixed(1) }}</td>
    <td>
  <button class="btn btn-success">수정</button>
    </td>
  </tr>
</tbody>
      </table>

      <div class="text-center mt-3">
        <button @click="saveGrades" class="btn btn-success px-4">저장</button>
        
      </div>
    </div>
  </WhiteBox>
</template>

<style scoped lang="scss">
.grade-container {
  margin-top: 20px;
}

.page-title {
  text-align: left;
  font-weight: bold;
  margin-bottom: 20px;
  color: #00664F;
}

.grade-table {
  table-layout: fixed;
  width: 100%;
}


.grade-input {
  width: 60px;
  text-align: center;
}
.grade-table input {
  width: 60px;
  text-align: center;
  font-size: 13px;
}
.grade-table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse; // 테두리 겹침 
}

  th, td {
    border: 1px solid #000;
    vertical-align: middle;
    text-align: center;
    padding: 8px;
  }

  th {
    background-color: #00664F; // 피그마처럼 초록 헤더
    color: white;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 4px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
  }


.btn-success {
  background-color: #00664F;
  border-color: #00664F;
}
.subtitle { 
  color: #00664F;
  font-weight: bold;
  margin-bottom: 10px;
}

.save-wrapper { 
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.save-btn { 
  background-color: #006400;
  color: white;
  padding: 6px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.subtitle {
  font-weight: bold;
  margin-bottom: 10px;
}

/* 저장 버튼처럼 강조된 제목 */
.highlight-title {
  background-color: #006400; /* 진한 초록색 */
  color: white;
  padding: 6px 15px;
  border-radius: 5px;
  display: inline-block;
}

/* 수정 버튼 스타일 */
.btn-edit {
  background-color: #808080; /* 저장 버튼과 동일한 초록색 */
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit:hover {
  background-color: #004d00; /* hover 시 조금 더 진하게 */
}
.subtitle {
  color: #0f5132;   /* 짙은 초록 */
  font-weight: bold;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.btn-success {
  background-color: #0f5132;  /* 저장 버튼과 동일한 색 */
  border: none;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}
.search-input {
  width: 300px; /* 원하는 고정 너비 */
  max-width: 50%; /* 화면 크기 대비 줄이고 싶다면 */
}
.search-box {
  .search-input {
    width: 250px;
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  .btn-primary {
    background-color: #0d6efd;  // 파란색 (Bootstrap primary 스타일)
    border: none;
    color: white;
    padding: 6px 15px;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-primary:hover {
    background-color: #0b5ed7; // hover 시 조금 진하게
  }
  .layout {
  display: flex;
}
.sidebar {
  width: 300px;
  background: #f5f5f5;
}
.content {
  flex: 1;
  padding: 10px;
}
}
</style>