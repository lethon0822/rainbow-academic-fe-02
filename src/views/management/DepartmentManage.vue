<script setup>
import whiteBox from '@/components/common/WhiteBox.vue';
import { reactive, onMounted } from 'vue';
import { deptlist } from '@/services/DeptManageService';

const state = reactive({
  form:{
    deptName:"",
    headProfId:0,
    deptOffice: "",
    deptTel: "",
    deptMaxStd:0,
    deptCode: "",
  },
  deptList:[]
})

onMounted(async()=>{

  const params = {
    status:"",
    text:""
  }

  const res = await deptlist(params);
  console.log("알이에수",res);

  state.deptList = res.data;
  console.log('list',state.deptList)

  const ths = document.querySelectorAll('.title-line th');
  const tds = document.querySelectorAll('.body-line td');
  ths.forEach((th, i) => {
    const width = th.offsetWidth + 'px';
    tds.forEach((td, idx) => {
      if(idx % ths.length === i) td.style.width = width;
    });
  })
});

</script>

<template>
  <whiteBox :title="'학과관리'" class="white1" >
    <div class="dept-form-container">
      <form>
        <!-- 입력 필드들을 감싸는 grid -->
        <div class="dept-form-grid">
          <div class="tab">
            <label for="deptCode" class="form-label"><b>학과코드</b></label>
            <input type="text" class="form-control" id="deptCode" v-model="state.form.deptCode" />
          </div>

          <div class="tab">
            <label for="deptName" class="form-label"><b>학과명</b></label>
            <input type="text" class="form-control" id="deptName" v-model="state.form.deptName" />
          </div>

          <div class="tab">
            <label for="deptCourse" class="form-label"><b>학과장명</b></label>
            <input type="text" class="form-control" id="deptCourse" v-model="state.form.headProfId" />
          </div>

          <div class="tab">
            <label for="deptOffice" class="form-label"><b>학과 사무실</b></label>
            <input type="text" class="form-control" id="deptOffice" v-model="state.form.deptOffice" />
          </div>

          <div class="tab">
            <label for="deptPhone" class="form-label"><b>학과 전화번호</b></label>
            <input type="text" class="form-control" id="deptPhone" v-model="state.form.deptTel" />
          </div>

          <div class="tab">
            <label for="deptCapacity" class="form-label"><b>학과 정원</b></label>
            <input type="text" class="form-control" id="deptCapacity" v-model="state.form.deptMaxStd" />
          </div>
        </div>

        <!-- 버튼은 grid 바깥 -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">학과개설</button>
        </div>
      </form>
    </div>
  </whiteBox>

  <whiteBox class="white2">
    <div class="d-flex filter-bar">
      <div class="cover d-flex">
        <div class="search">
          <i class="bi bi-search"></i>
        </div>
        <input type="text" placeholder="학과명을 입력하세요">
      </div>
      <div class="cover d-flex" >
        <div class="search">
          <i class="bi bi-funnel"></i>
        </div>
        <select name="filter" class="filter">
          <option value="null">상태/전체</option>
          <option value="1">운영중</option>
          <option value="0">폐지</option>
        </select>
      </div>
      <button class="btn btn-success">조회</button>
    </div>
    <!-- 학과목록 -->
    <div class="container">
    <div class="table-wrapper">
      <div class="title-line">
        <table class="dept-table">
          <thead>
            <tr>
              <th class="dept-code">학과코드</th>
              <th class="dept-name">학과</th>
              <th class="dept-office">학과사무실</th>
              <th class="dept-head">학과장명</th>
              <th class="dept-tel">학과 전화번호</th>
              <th class="dept-max">학과 정원</th>
              <th class="dept-people">학과 인원</th>
              <th class="dept-status">상태</th>
              <th class="dept-btn"><span v-for="n in 10" :key="n">&nbsp;</span></th>
            </tr>
          </thead>
        </table>
        </div>
        <div class="body-line">
          <table class="dept-table">
            <tbody>
              <tr v-for="item in state.deptList" :key="item.deptId" class="tr-line">
                <td>{{ item.deptCode }}</td>
                <td>{{ item.deptName }}</td>
                <td>{{ item.deptOffice }}</td>
                <td>{{ item.userName }}</td>
                <td>{{ item.deptTel }}</td>
                <td>{{ item.deptMaxStd }}</td>
                <td>{{ item.deptPeople }}</td>
                <td> {{item.status === '1' ? "운영중" : "폐지"}}</td>
                <td class="btn-td">
                  <button class="btn btn-primary">수정</button>
                </td>
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
  width: 100%;
  height: 250px;
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

/* 상태 색상 */
.status-processing {
  color: #e53e3e; /* 빨간색 */
  font-weight: 500;
}

.status-complete {
  color: #38a169; /* 초록색 */
  font-weight: 500;
}

/* 버튼 스타일 */


.btn-edit {
  background-color: #3182ce;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn-edit:hover {
  background-color: #2b6cb0;
}

/* th */
.dept-table th.dept-code{
  width:128px;

}
.dept-table th.dept-name{
  width: 247px;
}
.dept-table th.dept-office{
  width: 216px;
}
.dept-table th.dept-max{
  width: 95px;
}
.dept-table th.dept-people{
  width: 110px;
}

.dept-table th.dept-btn{
  width: 190px;
}
.tr-line{
  border-bottom: 1px solid #c4c4c4;
}
</style>