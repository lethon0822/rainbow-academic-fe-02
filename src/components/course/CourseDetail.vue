<script setup>
import { reactive , onMounted} from "vue";
<<<<<<< HEAD:src/components/course/CourseDetail.vue
import WhiteBox from "@/components/common/WhiteBox.vue";
=======
import WhiteBox from "@/components/WhiteBox.vue";
>>>>>>> d6ee899d6252ee54fd31d529051384001d11c9df:src/components/CourseDetail.vue
import { loadCourse } from "@/services/CourseService";

const props = defineProps({
  id: Number
})

const state = reactive({
  form: {
    classroom: '',
    type: '전공',
    semester: 1,
    time: '',
    title: '',
    credit: null,
    weekPlan: '',
    textBook: '',
    goal: '',
    maxStd: null,
    deptName: "",
    userName:"",
    grade: null
  },
});


onMounted(()=>{  
  loadCourseDetail(props.id);

})

const loadCourseDetail = async (id) => {
  console.log('아이디',id)
  const res = await loadCourse(id);
  console.log('res:',res)
  if (res === undefined || res.status !== 200) {
    alert('오류 발생. 잠시 후 다시 실행해주십시오.');
    return;
  }
  state.form = res.data;
  if(state.form.type === '교양'){
    state.form.deptName ='교양학부'
  }


};
</script>

<template>
  <WhiteBox :title="'강의계획서'" class="white-box">
    <div class="container">
      
      <div class="table d-flex top">
        <div class="table-title">교과목명</div>
        <div class="table-content">
          {{state.form.title}}
        </div>
        <div class="table-title">담당교수</div>
        <div class="table-content">
          {{ state.form.userName }}
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">이수구분</div>
        <div class="table-content">
          {{ state.form.type }}
        </div>

        <div class="table-title">학과명</div>
        <div class="table-content">
          {{ state.form.deptName }}
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">이수학점</div>
        <div class="table-content">
          {{ state.form.credit}}
        </div>
        <div class="table-title">학기</div>
        <div class="table-content">
          {{ state.form.semester}}
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">강의시간</div>
        <div class="table-content">
          {{ state.form.time}}
        </div>
        <div class="table-title">수강대상</div>
        <template v-if="state.form.type === '전공'">
          <div class="table-content">
            {{ state.form.deptName +" "+ state.form.grade}}학년
          </div>
        </template>
        <template v-else>
          <div class="table-content">
            수강희망자
          </div>
        </template>
      </div>

      <div class="table d-flex last">
        <div class="table-title">수강정원</div>
        <div class="table-content">
          {{ state.form.maxStd}}
        </div>
        <div class="table-title">강의실</div>
        <div class="table-content">
          {{ state.form.classroom}}
        </div>
      </div>

      <p>강의 계획서</p>
      <div class="table d-flex top">
        <div class="table-title">교재</div>
        <div class="table-content">
          {{ state.form.textBook}}
        </div>
      </div>
      <div class="table d-flex detail">
        <div class="table-title">강의목표</div>
        <div class="table-content">
          {{ state.form.goal}}
        </div>
      </div>
      <div class="table d-flex detail last">
        <div class="table-title">주차별계획</div>
        <div class="table-content">
          {{ state.form.weekPlan}}
        </div>
      </div>

      <p>평가방법</p>

      <div class="score">
        <div class="title">
          <div>출석</div>
          <div>중간고사</div>
          <div>기말고사</div>
        </div>
        <div class="per">
          <div><span>20%</span></div>
          <div class="middle"><span>40%</span></div>
          <div><span> 40%</span></div>
        </div>
      </div>
    </div>
  </WhiteBox>
</template>

<style scoped lang="scss">
.white-box{
  max-width: 1080px;
  margin-left: 0;
}
.container {
  margin-top: 70px;
  max-width: 1080px;
  min-width: 1028px;
}

.title {
  width: 100%;
  background-color: #364157;
  border-top: #000;
  color: #fff;
  display: flex;

  div {
    border-left: 1px solid #b7b7b7;
    border-right: 1px solid #b7b7b7;
    flex: 1;
    padding: 10px;
    text-align: center;
    font-size: 20px;
  }
}
.per {
  display: flex;
  background-color: #fff;
  margin-bottom: 70px;
  height: 120px;
  align-items: center;
  border: 1px solid #b7b7b7;
  div {
    height: 100%;
    flex: 1;
    text-align: center;
    font-size: 20px;

    span {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.middle {
  border-left: 1px solid #b7b7b7;
  border-right: 1px solid #b7b7b7;
}

p {
  font-size: 20px;
  font-weight: 700;
  margin-top: 70px;
  margin-bottom: 5px;
}

.table {
  border: 1px solid #b7b7b7;
  background-color: #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #364157;
  margin-bottom: 0;
  border-bottom: 0.5px;
}
select {
  width: 120px;
  background-color: #e2e2e2;
  color: #4d4d4d;
}

.top {
  border-top: 3px solid #000;
}
.last {
  border-right: 1px solid #fff;
  border-bottom: 1px solid #b7b7b7;
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
input {
  width: 100%;
  box-sizing: border-box;
  outline-color: #a2a2a2;
}

.button {
  display: flex;
  justify-content: flex-end;
  .btn {
    background-color: #2460ce;
    margin-bottom: 100px;
  }
}

.detail {
  height: 200px;
  .table-content { 
    input {
      height: 100%;
    }
  }
}
</style>
