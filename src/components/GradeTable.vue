<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
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

<template>
  <table class="fixed_headers">
    <thead>
      <tr>
        <th>이수구분</th>
        <th>수업코드</th>
        <th>과목명</th>
        <th>학기</th>
        <th>학점</th>
        <th>등급</th>
        <th>성적등록날짜</th>
        <th></th>
        <th></th>
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
        <td>
          <button class="btn btn-primary" @click="handleButtonClick(grade)">
            강의평가
          </button>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.fixed_headers {
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.fixed_headers th {
  background-color: #364157;
  color: #fff;
  position: sticky;
  top: 0;
  padding: 8px;
}

.fixed_headers th,
.fixed_headers td {
  padding: 6px 20px;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
}

.fixed_headers td {
  border-bottom: 1px solid #c8c8c8;
}

.fixed_headers td:nth-child(9),
.fixed_headers th:nth-child(9) {
  padding-left: 3px;
  padding-right: 5px;
}

.fixed_headers tbody tr:nth-child(even) {
  background-color: #fff;
}

.fixed_headers th:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.fixed_headers th:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
