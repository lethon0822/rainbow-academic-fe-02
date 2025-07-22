<script setup>
const { grades, creditByCategory, semesterGrades } = defineProps([
  "grades",
  "creditByCategory",
  "semesterGrades",
]);
</script>

<template>
  <!-- 과목별 성적 테이블 -->
  <h5>과목별 성적</h5>
  <div class="table-container">
    <table class="fixed_headers">
      <thead>
        <tr>
          <th>순번</th>
          <th>학년</th>
          <th>학기</th>
          <th>과목코드</th>
          <th>교과목명</th>
          <th>학점</th>
          <th>등급</th>
          <th>이수구분</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(grade, index) in grades" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ grade.grade }}</td>
          <td>{{ grade.semester }}</td>
          <td>{{ grade.courseId }}</td>
          <td>{{ grade.title }}</td>
          <td>{{ grade.credit }}</td>
          <td>{{ grade.rank || "-" }}</td>
          <td>{{ grade.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 이수구분별 취득학점 테이블 -->
  <h5>이수구분별 취득학점 (학기별)</h5>
  <div class="table-container">
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
        <tr v-for="(record, index) in creditByCategory" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ record.grade }}</td>
          <td>{{ record.semester }}</td>
          <td>{{ record.majorRequired }}</td>
          <td>{{ record.majorElective }}</td>
          <td>{{ record.generalEducation }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 학기별 성적 테이블 -->
  <h5>학기별 성적</h5>
  <div class="table-container">
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
        <tr v-for="(semesterGrade, index) in semesterGrades" :key="index">
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
  </div>
</template>

<style scoped lang="scss">
.table-container {
  margin: 20px;
  border-radius: 5px;
  max-width: 1100px; // 이미지 가로 길이에 맞게 조정
  max-height: 350px; // 세로 길이도 맞춰줌 (필요하면 변경)
  overflow-y: auto; // 세로 스크롤 가능
  overflow-x: hidden; // 가로 스크롤은 없게 (필요하면 auto로 변경)
  border: 1px solid #ddd; // 테두리 좀 더 명확히
}

table {
  width: 100%;
  table-layout: fixed; // 열 너비 균등 유지
  border-collapse: collapse;
  border-bottom: 1px solid #ddd;
  font-size: 14px; // 폰트 크기 이미지에 맞춤
}

thead {
  color: white;
  background-color: #364157;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #364157;
  z-index: 2;
  padding: 8px 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-weight: 600;
}

tbody {
  text-align: center;
  color: black;
}

tbody tr {
  border-bottom: 1px solid #ddd;
  height: 30px;
}

h5 {
  font-weight: bold;
  color: #364157;
  margin-left: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
