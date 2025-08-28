<script setup>
import whiteBox from '@/components/common/WhiteBox.vue';
import { reactive, onMounted } from 'vue';
import { deptlist } from '@/services/DeptManageService';

const state = reactive({
  form:{

    },
})

onMounted(async()=>{

  const params = {
    status:"",
    text:""
  }

  const res = await deptlist(params);
  state.deptList = res.data;
})

</script>

<template>
  <div class="page">
    <h1 class="page-title">신분변동관리</h1>
  </div>

  <whiteBox class="white2">
    <!-- 학과목록 -->
    <div class="container">
    <div class="table-wrapper">
      <div class="title-line">
        <table class="dept-table">
          <thead>
            <tr>
              <th>학과코드</th>
              <th>학과</th>
              <th>학과사무실</th>
              <th>학과장명</th>
              <th>학과 전화번호</th>
              <th>학과 정원</th>
              <th>학과 인원</th>
              <th>상태</th>
              <th>수강</th>
              <th>　　</th>
            </tr>
          </thead>
        </table>
        </div>
        <div class="body-line">
          <table class="dept_table">
            <tbody>
              <tr v-for="item in state.deptList" :key="item.deptId">
                <td>{{ item.deptCode }}</td>
                <td>{{ item.deptName }}</td>
                <td>{{ item.deptOffice }}</td>
                <td>{{ item.userName }}</td>
                <td>{{ item.deptTel }}</td>
                <td>{{ item.deptMaxStd }}</td>
                <td>{{ item.deptPeople }}</td>
                <td> {{item.status === '1' ? "운영중" : "폐지"}}</td>
              </tr>
            </tbody>
      </table>
    </div>
    </div>
  </div>
 
  </whiteBox>

</template>

<style scoped>
.white-box{
  min-height: auto;
  min-width: 1270px;
  width: 1550px;
  margin-top: 20px;
}
  .line{
    margin-bottom: 10px;
  }

.page {
  padding: 16px 24px 48px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0 -100px;
}

.dept-form-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 */
  gap: 15px;
}

.tab{
  padding:10px;
}
.form-label {
  font-weight: 500;
}

label{
  font-weight: 700;
}

input{
  border-radius:10px ;
  background-color: #F8F9FA;
  border: 2px solid #E5E7EB;
  
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.white2{
  max-height: 400px;
}

.filter-bar{
  gap:20px;
  justify-content: end;
  margin-bottom: 10px;
}

.cover{
  padding: 5px;
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  background-color: #F8F9FA;
}

.cover input{
  border: none;
  border-radius: 0;
  color: #7B7B7B;
  outline: none;
}

.cover input::placeholder{
  color: #9e9e9e;
}

.cover select{
  width:150px;
  border: none;
  outline: none;
  color: #7B7B7B;
}

.bi-search{
  color: #7B7B7B;
}


.search{
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter{
  border-radius: 10px;
  background-color: #F8F9FA;
  border: 2px solid #E5E7EB;
}

/* 학과 목록 표 */

.container {
  min-height: auto;
  min-width: 1430px;
  height: 360px;
  
}

/* 가로 스크롤 가능 */
/* 컨테이너 높이 조절 */
/* .table-wrapper {
  max-height: 360px; 
} */

/* 테이블 레이아웃 고정 */

.dept-table {
  width: 100%;
  border-collapse: collapse;
}


/* thead 고정 */
.title-line{            
  background-color: #fff; /* 헤더 배경색 지정 */
  border-top: 2px solid #7B7B7B;
  border-bottom: 1px solid #7B7B7B;
}

.body-line{

  overflow-y: scroll;
}



/* tbody 높이 제한 + 스크롤은 위 .table-wrapper에서 */
.dept-table th,
.dept-table td {
  padding: 12px 16px;
  text-align: center;
}

/* 행 호버 효과 */
.dept-table tbody tr:hover {
  background-color: #f9f9f9;
}


</style>