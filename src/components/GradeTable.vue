<script setup>
import { ref } from "vue";

const props = defineProps({
  grades: {
    type: Array,
    required: true,
  },
});

const showGrades = ref(false);

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}
function toggleGrades() {
  showGrades.value = !showGrades.value;
}
</script>

<template>
  <div>
    <button @click="toggleGrades">
      {{ showGrades ? "성적 숨기기" : "성적 조회" }}
    </button>

    <table v-if="showGrades">
      <thead>
        <tr>
          <th>이수구분</th>
          <th>수업코드</th>
          <th>과목명</th>
          <th>학기</th>
          <th>학점</th>
          <th>등급</th>
          <th>성적등록날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(grade, index) in props.grades" :key="index">
          <td>{{ grade.type }}</td>
          <td>{{ grade.courseId }}</td>
          <td>{{ grade.title }}</td>
          <td>{{ grade.semester }}</td>
          <td>{{ grade.credit }}</td>
          <td>{{ grade.grade }}</td>
          <td>{{ formatDate(grade.createdAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}
th {
  background-color: #f4f4f4;
}
button {
  margin-bottom: 12px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
