<script setup>
const { grades, creditByCategory, semesterGrades } = defineProps([
  "grades",
  "creditByCategory",
  "semesterGrades",
]);
</script>

<template>
  <!-- 과목별 성적 테이블 -->
  <h3>과목별 성적</h3>
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
  <h3>이수구분별 취득학점 (학기별)</h3>
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
  <h3>학기별 성적</h3>
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
  max-width: 1430px;
  overflow-y: auto; // 세로 스크롤
}

table {
  width: 100%;
  table-layout: fixed; // 열 너비 일정하게 주기
  border-collapse: collapse;
  border-bottom: 1px solid #ddd;
}

thead {
  color: white;
  background-color: #364157;
}

thead th {
  //스크롤시 헤더 고정하는 부분 및 스타일 적용
  position: sticky; //스크롤 해도 헤더가 상단에 고정되도록 하기 위함
  top: 0; // 가장 가까운 overflow 조상 요소기준 최상단(0px) 위치에 고정 (table-container)
  background-color: #364157; /* 스티키는 기본 배경색 투명이므로 배경색 다시 지정*/
  z-index: 2; // 스티키 헤더가 다른 요소보다 위에 떠있게 설정
  padding: 7px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

tbody {
  text-align: center; // 내용 가운데 정렬
  color: black;
}

tbody tr {
  border-bottom: 1px solid #ddd;
  height: 30px;
}

tbody td {
  padding: 10px 5px;
  line-height: 1.5; // 선택 사항 (조금 더 부드럽게 보이게)
}
</style>
