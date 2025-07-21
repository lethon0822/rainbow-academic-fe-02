<script setup>
const props = defineProps({
  grades: {
    type: Array,
    default: () => [],
  },
  creditByCategory: {
    type: Array,
    default: () => [],
  },
  semesterGrades: {
    type: Array,
    default: () => [],
  },
  requestedCreditsBySemester: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <!-- 과목별 성적 테이블 -->
  <h2>과목별 성적</h2>
  <table class="fixed_headers">
    <thead>
      <tr>
        <th>순번</th>
        <th>학년</th>
        <th>학기</th>
        <th>강좌번호</th>
        <th>교과목명</th>
        <th>학점</th>
        <th>등급</th>
        <th>이수구분</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(grade, index) in props.grades" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ grade.grade }}</td>
        <td>{{ grade.semester }}</td>
        <td>{{ grade.courseId }}</td>
        <td>{{ grade.title }}</td>
        <td>{{ grade.credit }}</td>
        <td>{{ grade.rank }}</td>
        <td>{{ grade.type }}</td>
      </tr>
    </tbody>
  </table>

  <!-- 이수구분별 취득학점 테이블 -->
  <h2>이수구분별 취득학점</h2>
  <table class="fixed_headers">
    <thead>
      <tr>
        <th>순번</th>
        <th>학년</th>
        <th>학기</th>
        <th>전공필수</th>
        <th>전공선택</th>
        <th>교양</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in props.creditByCategory" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ record.grade }}</td>
        <td>{{ record.semester }}</td>
        <td>{{ record.majorRequired }}</td>
        <td>{{ record.majorElective }}</td>
        <td>{{ record.generalEducation }}</td>
      </tr>
    </tbody>
  </table>

  <!-- 학기별 성적 테이블 -->
  <h2>학기별 성적</h2>
  <table class="fixed_headers">
    <thead>
      <tr>
        <th>순번</th>
        <th>학년</th>
        <th>학기</th>
        <th>신청학점</th>
        <th>취득학점</th>
        <th>평균점수</th>
        <th>평균평점</th>
        <th>석차</th>
        <th>인원</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(semesterGrade, index) in props.semesterGrades" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ semesterGrade.grade }}</td>
        <td>{{ semesterGrade.semester }}</td>
        <td>{{ semesterGrade.requestedCredits }}</td>
        <td>{{ semesterGrade.acquiredCredits }}</td>
        <td>{{ semesterGrade.avgScore }}</td>
        <td>{{ semesterGrade.avgGradePoint }}</td>
        <td>{{ semesterGrade.grading }}</td>
        <td>{{ semesterGrade.totalStudents }}</td>
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
