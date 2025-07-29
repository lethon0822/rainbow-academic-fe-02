<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const { grades } = defineProps({
  grades: {
    type: Array,
    required: true,
  },
});

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

function handleButtonClick(grade) {
  router.push({
    path: "/course/survey",
    query: { courseId: grade.courseId },
  });
}
</script>
``
<template>
  <div class="table-wrapper">
    <!-- 고정 헤더 -->
    <div class="header-container">
      <table class="header-table">
        <thead>
          <tr>
            <th>순번</th>
            <th>년도</th>
            <th>학년</th>
            <th>학기</th>
            <th>과목명</th>
            <th>학점</th>
            <th>등급</th>
            <th>이수구분</th>
            <th>담당교수</th>
            <th>성적등록날짜</th>
          </tr>
        </thead>
      </table>
    </div>

    <!-- 스크롤 가능한 바디 -->
    <div class="body-container">
      <table class="body-table">
        <tbody>
          <tr v-for="(grade, index) in grades" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ grade.year }}</td>
            <td>{{ grade.grade }}</td>
            <td>{{ grade.semester }}</td>
            <td>{{ grade.title }}</td>
            <td>{{ grade.credit }}</td>
            <td>{{ grade.rank }}</td>
            <td>{{ grade.type }}</td>
            <td>{{ grade.professorName }}</td>
            <td>{{ formatDate(grade.createdAt) }}</td>
            <td>
              <button class="btn btn-primary" @click="handleButtonClick(grade)">
                강의평가
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-wrapper {
  margin: 20px auto;
  margin-top: 15px;
  max-width: 1430px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

// 헤더 테이블
.header-container {
  background-color: #364157;
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;
}

.header-table {
  width: 1250px;
  table-layout: fixed;
  border-collapse: collapse;
}

.header-table thead th {
  padding: 7px 7px;
  text-align: center;
  font-weight: 600;
  color: white;
  background-color: #364157;
  border-bottom: 1px solid #555;
}

// 바디 테이블
.body-container {
  max-height: 220px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.body-table {
  width: 1375px;
  table-layout: fixed;
  border-collapse: collapse;
}

.body-table tbody td {
  padding: 5px 7px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.body-table tbody tr:hover {
  background-color: #f9f9f9;
}

// 버튼 스타일
.btn {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, #4a76a8 0%, #2c5f8a 100%);
  color: white;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #3b5f8a 0%, #1f4568 100%);
}

// 스크롤바 스타일
.body-container::-webkit-scrollbar {
  width: 8px;
}

.body-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.body-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.body-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
