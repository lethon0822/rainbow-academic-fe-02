<script>
export default {
  name: "GradeTable",
  props: {
    grades: {
      type: Array,
      required: true,
    },
  },
};
</script>

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
</style>

<template>
  <table>
    <thead>
      <tr>
        <th>과목명</th>
        <th>학점</th>
        <th>성적</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(grade, index) in grades" :key="index">
        <td>{{ grade.subject }}</td>
        <td>{{ grade.credit }}</td>
        <td>{{ grade.score }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
