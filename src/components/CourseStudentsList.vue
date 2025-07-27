<script setup>
import WhiteBox from "./WhiteBox.vue";
import { reactive, onMounted } from "vue";
import { courseStudentList } from "@/services/professorService";
import { useUserStore } from "@/stores/account";

const userStore = useUserStore();
  
  const state = reactive({
    data:[],
    course:{
      classroom:'',
      courseId: null,
      credit: null,
      deptName: '',
      grade: '',
      maxStd: '',
      time: '',
      title: '',
      type:'',
    }
  });

onMounted(async ()=>{
  const passJson = history.state.data;
  if(passJson){
    const nana = JSON.parse(passJson);
    state.course = nana
    const id = state.course.courseId
    console.log('아이디:',id)
    const res = await courseStudentList(id);
    console.log("res",res)
    state.data =res.data
    
  }
})

</script>

<template>
  <WhiteBox :title="'학생조회'">
    <div class="container">
      
      <div class="table d-flex top">
        <div class="table-title">교과목명</div>
        <div class="table-content">
          {{state.course.title}}
        </div>
        <div class="table-title">담당교수</div>
        <div class="table-content">
          {{ userStore.userName }}
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">이수구분</div>
        <div class="table-content">
          {{ state.course.type }}
        </div>

        <div class="table-title">학과명</div>
        <div class="table-content">
          {{ state.course.deptName }}
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">이수학점</div>
        <div class="table-content">
          {{ state.course.credit}}
        </div>
        <div class="table-title">학기</div>
        <div class="table-content">
          {{ state.course.semester}}
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">강의시간</div>
        <div class="table-content">
          {{ state.course.time}}
        </div>
        <div class="table-title">수강대상</div>
        <template v-if="state.course.type === '전공'">
          <div class="table-content">
            {{ state.course.deptName +" "+ state.course.grade}}학년
          </div>
        </template>
        <template v-else>
          <div class="table-content">
            수강희망자
          </div>
        </template>
      </div>

      <div class="table d-flex last">
        <div class="table-title">수강인원</div>
        <div class="table-content">
          {{state.data.length}}
        </div>
        <div class="table-title">강의실</div>
        <div class="table-content">
          {{ state.course.classroom}}
        </div>
      </div>
    </div>

    <div class="button d-flex">
      <router-link to="/attendance">
        <button class="btn btn-primary">출결관리</button>
      </router-link>
      <router-link to="/EnrollmentGrade">
        <button class="btn btn-primary">성적관리</button>
      </router-link>
    </div>

    <div class="table-container">
    <table>
      <thead>
        <tr>
          <th class="width-0">no</th>
          <th>학번</th>
          <th>이름</th>
          <th>학과</th>
          <th>학년</th>
          <th>이메일</th>
          <th>전화번호</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in state.data" :key="student.loginId">
          <td class="width-0">{{ index + 1 }}</td>
          <td>{{ student.loginId }}</td>
          <td>{{ student.userName }}</td>
          <td>{{ student.deptName }}</td>
          <td>{{ student.grade }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  </WhiteBox>
</template>


<style scoped>
.container {
  margin-top: 70px;
  max-width: 1350px;
  min-width: 1350px;
  margin-bottom: 70px;
}

.table {
  border: 1px solid #b7b7b7;
  background-color: #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #364157;
  margin-bottom: 0;
  border-bottom: 0.5px;
}

.button{
  justify-content: flex-end;
  margin-right: 26px;

  .btn{
    background-color: #2460CE
  }
}

.student-table{
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color:#364157;
  color: #fff;
  padding: 5px;;
}

.table-title {
  width: 150px;
  background-color: #364157;
  border-right: 1px solid #b7b7b7;
  color: #fff;
  padding: 5px;
  align-content: center;
}

.table-content {
  background-color: #fff;
  align-content: center;
  padding: 3px;
  flex: 1;
}

.top {
  border-top: 3px solid #000;
}
.last {
  border-right: 1px solid #fff;
  border-bottom: 1px solid #b7b7b7;
}

.table-container {
  margin: 20px;
  margin-top:10px;
  width: 100%;
  max-width: 1350px;
  min-width: 800px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-bottom: 1px solid #ddd;
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
  padding: 7px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

tbody {
  text-align: center;
  color: black;
}

tbody tr {
  border-bottom: 1px solid #ddd;
  height: 30px;
}

.width-0{
 width: 100px;
}

</style>
