<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/account";
import { GradesbyCourse } from "@/services/GradeService";

// 성적 데이터 상태
const courseList = ref([]);

// 사용자 스토어 (로그인된 사용자 정보 및 semesterId 가져오기 위함)
const userStore = useUserStore();

// 테이블 높이 기본값
const maxHeight = "600px";

// API 호출 함수
async function fetchGrades() {
  try {
    const semesterId = userStore.semesterId;
    const res = await GradesbyCourse({ semesterId });

    console.log("API 응답 데이터:", JSON.stringify(res.data, null, 2));
    courseList.value = res.data;
  } catch (error) {
    console.error("성적 조회 실패:", error);
    courseList.value = []; // 실패 시 빈 배열로 초기화
  }
}

// 컴포넌트 마운트 시 데이터 가져오기
onMounted(() => {
  fetchGrades();
});
</script>

<template>
  <div class="table-container" :style="{ maxHeight: maxHeight }">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>연도</th>
            <th>학기</th>
            <th>이수구분</th>
            <th>과목코드</th>
            <th>과목명</th>
            <th>담당교수</th>
            <th>수강학년</th>
            <th>학점</th>
            <th>등급</th>
            <th>평점</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courseList" :key="course.courseCode">
            <td>{{ course.year }}</td>
            <td>{{ course.semester }}</td>
            <td>{{ course.type }}</td>
            <td>{{ course.courseCode }}</td>
            <td>{{ course.title }}</td>
            <td>{{ course.professorName }}</td>
            <td>{{ course.grade }}학년</td>
            <td>{{ course.credit }}</td>
            <td>{{ course.rank }}</td>
            <td>{{ course.point }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-container {
  margin: 20px auto;
  border-radius: 8px;
  width: 100%;
  max-width: 1430px;
  min-width: 1350px;
  border: 0.2 solid #74747480;
  position: relative;
  background-color: white;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 25px 25px 0 25px;
}

.table-wrapper {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #cdcdcd #f0f0f0;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  table-layout: auto;
}
thead {
  color: #333;
  background-color: #f8f9fa;
}
thead th {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 2;
  padding: 12px 4px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
}

thead th::before,
thead th::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #969696;
}

thead th::before {
  top: 0;
}

thead th::after {
  bottom: 0;
}

tbody {
  text-align: center;
  color: black;
  background-color: white;
}
tbody tr {
  border-bottom: 1px solid #747474;
  height: 40px;
  background-color: white;
}
tbody tr:hover {
  background-color: #f8f9fa;
}
tbody td {
  padding: 8px 4px;
  border-right: none;
  font-size: 13px;
}
thead th,
tbody td {
  color: #343a40;
}

/* 버튼 */
button {
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  margin: 2px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

button.enroll-btn {
  background-color: #2460ce;
  color: #fff;
}

button.enroll-btn:hover {
  background-color: #1f53b5;
}

.enroll-btn.enrolled {
  background-color: gray;
  cursor: not-allowed;
}

.enroll-btn.enrolled:hover {
  background-color: gray;
}

button.cancel-btn {
  background-color: #f44336;
}

button.cancel-btn:hover {
  background-color: #d32f2f;
}

.link {
  color: #2460ce;
  cursor: pointer;
  text-decoration: underline;
}
.link:hover {
  color: #1f53b5;
}
.setting {
  padding-top: 2px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  justify-content: center;
}
.red {
  color: #d61421;
  font-weight: 600;
}
.gray {
  color: #666;
  font-weight: 600;
}
.blue {
  color: #2460ce;
  font-weight: 700;
}

.remaining-count {
  color: #28a745;
  font-weight: 600;
}

.status {
  width: 120px;
}
.button {
  width: 150px;
}

th.code,
td.code,
th.deptName,
td.deptName,
th.title,
td.title,
th.classroom,
td.classroom,
th.type,
td.type,
th.professor,
td.professor {
  width: 130px;
  text-align: center;
}

th.grade,
td.grade {
  width: 150px;
  text-align: center;
}

td.time,
th.time {
  width: 110px;
  text-align: center;
}

th.credit,
td.credit {
  width: 60px;
  text-align: center;
}

th.maxStd,
td.maxStd,
th.remStd,
td.remStd {
  width: 120px;
  text-align: center;
}

td.enroll-action {
  width: 120px;
  text-align: center;
}
</style>
