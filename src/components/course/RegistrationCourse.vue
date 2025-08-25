<!-- 강의 계획서 작성창 -->
<script setup>
import { reactive, onMounted, watch } from "vue";
import { saveCourse, modify } from "@/services/professorService";
import { useRouter } from "vue-router";
import WhiteBox from "@/components/common/WhiteBox.vue";
import { loadCourse } from "@/services/CourseService";
import { useUserStore } from "@/stores/account";
import { professorDept } from "@/services/professorService"

const props = defineProps({
  id: Number,
});

const userStore = useUserStore();

console.log('이름', userStore.userName)
console.log('아이디', userStore.userId)

const state = reactive({
  form: {
    deptName: '',
    courseId: 0,
    classroom: "",
    semesterId: 12,
    type: "전공필수",
    time: "",
    title: "",
    credit: null,
    weekPlan: "",
    textBook: "",
    goal: "",
    maxStd: null,
    grade: 1,
  },
});

watch(
  () => state.form.type,
  (newType) => {
    if (newType !== '전공필수') {
      state.form.grade = 0;
    }
  }
);

onMounted(async () => {
  const name = await professorDept();
  state.form.deptName = name.data;
  console.log(name)
  if (props.id) {
    state.courseId = props.id;
    const res = await loadCourse(props.id);
    state.form = res.data;
  }
});
const router = useRouter();
const submit = async () => {


  let data = null;
  if (state.form.courseId > 0) {

    const res = await modify(state.form);
    data = res;
  } else {
    const res = await saveCourse(state.form);
    data = res;
  }
  if (data === undefined || data.status !== 200) {
    alert("오류 발생. 잠시 후 다시 실행해주십시오.");
    return;
  }
  router.push("/professor/course/status");
};

const back = () => {
  if(!confirm('제출하시겠습니까?')){
    router.push('/professor/course/status')
    return};
}
</script>


<template>

  <WhiteBox :title="'강의등록'">
    <div style= 
      "border: 1px solid gray; border-radius: 10px; background-color: #FAFAD2; margin: 100px; padding: 10px;">
      <span style="font-size: 20px;">새로운 강의를 개설해보세요</span>
       <br>
       <span style="font-size: 15px;">강의계획서와 함께 강의정보를 입력하시면 개설신청이 완료됩니다.</span>
       </br>
    </div>

    
      <div class="fform-group " >
        <div class="form-group " >
            <label for="subject">교과목명</label>
            <input type="text" id="subject" name="subject">
        </div>
        <div class="form-group">
            <label for="category">이수구분</label>
            <select id="category" name="category">
                <option>전공</option>
                <option>교양</option>
            </select>    
        </div>
        <div class="form-group">
            <label for="credits">이수학점</label>
            <select id="credits" name="credits">
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
        </div>
        <div class="form-group">
            <label for="time">강의시간</label>
            <input type="text" id="time" name="time" placeholder="예: 수 1,2,3 & 목 4,5">
        </div>
      </div>
      
      <div class="fform-group2" >
        <div class="form-group">
            <label for="students">수강인원</label>
            <input type="number" id="students" name="students">
        </div>
        <div class="form-group">
            <label for="department">학과명</label>
            <input type="text" id="department" name="department">
        </div> 
        <div class="form-group">
            <label for="semester">학기</label>
            <select id="semester" name="semester">
                <option>전체</option>
                <option>1학기</option>
                <option>2학기</option>
            </select>
        </div>
        <div class="form-group">
            <label for="classroom">강의실</label>
            <input type="text" id="classroom" name="classroom">
        </div>
      </div>
    

    <div class="fform-group3">
        <div class="form-group">
            <label for="textbook">교재정보</label>
            <input type="text" id="textbook" name="textbook">
        </div>
        <div class="form-group">
            <label for="objective">강의목표</label>
            <textarea id="objective" name="objective"></textarea>
        </div>


        <div class="form-group2">
            <label for="evaluation">평가방법</label>
            <input type="text" id="evaluation" name="evaluation" placeholder="%를 입력해주세요.">
        </div>

        <div class="buttons">
            <button type="reset" class="reset">초기화</button>
            <button type="submit">강의개설 신청</button>
        </div>

      </div>
    

    
      
    

   

    <!-- <div class="container">
      <form @submit.prevent="submit">
        <div class="table d-flex top">
          <div class="table-title">교과목명</div>
          <div class="table-content">
            <input
              type="text"
              name="title"
              v-model="state.form.title"
              required
            />
          </div>
          <div class="table-title">수강인원</div>
          <div class="table-content">
            <input type="number" v-model="state.form.maxStd" required />
          </div>
        </div>
        <div class="table d-flex">
          <div class="table-title">교과구분</div>
          <div class="table-content">
            <select v-model="state.form.type" required>
              <option>전공필수</option>
              <option>전공선택</option>
              <option>교양필수</option>
              <option>교양선택</option>
            </select>
          </div>
          <div class="table-title">학과명</div>
          <div class="table-content">
            <span v-if="state.form.type === '교양'"> 교양학부 </span>
            <span v-else> {{ state.form.deptName }}</span>
          </div>
        </div>
        <div class="table d-flex">
          <div class="table-title">이수학점</div>
          <div class="table-content">
            <input type="number" max="3" v-model="state.form.credit" required />
          </div>
          <div class="table-title">학기</div>
          <div class="table-content">
            <select v-model="state.form.semester" required>
              <option value="1">1학기</option>
              <option value="2">2학기</option>
            </select>
          </div>
        </div>
        <div class="table d-flex">
          <div class="table-title">강의시간</div>
          <div class="table-content">
            <input type="text" v-model="state.form.time" required />
          </div>
          <div class="table-title">강의실</div>
          <div class="table-content">
            <input type="text" v-model="state.form.classroom" required />
          </div>
        </div>

        <div class="table d-flex last">
          <div class="table-title">수강인원</div>
          <div class="table-content">
            <input type="number" v-model="state.form.maxStd" required />
          </div>
          <div class="table-title">수강대상</div>
          <template v-if="state.form.type==='전공필수'|| '전공선택'">
            <div class="table-content">
              <select v-model="state.form.grade" required>
                <option value="1">1학년</option>
                <option value="2">2학년</option>
                <option value="3">3학년</option>
                <option value="4">4학년</option>
              </select>
            </div>
          </template>
          <template v-else>
            <div class="table-content">
              <select v-model="state.form.grade" class="fix" disabled>
                <option value="5">수강희망자</option>
              </select>
            </div> -->
          <!-- </template>
          
        </div> -->


        <!-- <p>강의 계획서</p>
        <div class="table d-flex top">
          <div class="table-title">교재</div>
          <div class="table-content">
            <input type="text" v-model="state.form.textBook" />
          </div>
        </div>
        <div class="table d-flex detail">
          <div class="table-title">강의목표</div>
          <div class="table-content">
            <textarea type="text" v-model="state.form.goal"></textarea>
          </div>
        </div>
        <div class="table d-flex detail last">
          <div class="table-title">주차별계획</div>
          <div class="table-content">
            <textarea type="text" v-model="state.form.weekPlan"></textarea>
          </div>
        </div>
        <div class="button">
          <button class="btn btn-light mt-3" @click.stop="back" >
            취소
          </button>
          <button class="btn btn-primary mt-3">
            {{ props.id > 0 ? "수정" : "제출" }}
          </button>
        </div> -->
      <!-- </form>
    </div> -->
  </WhiteBox>
</template>


<style scoped lang="scss">

//2025-8-22
   .container1 {
        max-width: 1200px;
        min-width: 1200px;
  
   }
  body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
    }
    
    h1 {
        margin-bottom: 20px;
    }
    
    .fform-group {
      border: #9e9e9e;
      position: fixed;
      
      left: 450px;
      width: 540px;
      display: flex;
      flex-direction: column;
    }
    .fform-group2{
      position: fixed;
     
      left: 1000px;
      width: 600px;
      display: flex;
      flex-direction: column;
    }

    .fform-group3 {
       
        margin: 50px ;
       
        padding: 20px 40px;
        
       
        position: fixed;
        bottom:150px;
        max-width: 1225px;
        min-width: 1225px;
    }
    .form-group {
       
        display: flex;
        margin-bottom: 15px;
        
        flex-direction: column; /* 세로 정렬 */
    }
    
    .form-group label {
      
        display:block;
        width: 120px;
        font-weight: bold;
    }
    .form-group input, 
    .form-group select, 
    .form-group textarea {
        flex: 1;
        padding: 6px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    textarea {
        resize: vertical;
        height: 60px;
    }
    .week-plan {
        margin-top: 20px;
    }
    .week-plan ul {
        list-style: none;
        padding-left: 0;
    }
    .week-plan li {
        background: #e0f0d9;
        margin-bottom: 5px;
        padding: 5px 10px;
        border-radius: 5px;
    }
    .buttons {
        margin-top: 20px;
        text-align: center;
    }
    button {
        padding: 8px 20px;
        margin: 0 5px;
        border: none;
        border-radius: 5px;
        background-color: #2e7d32;
        color: #fff;
        cursor: pointer;
    }
    button.reset {
        background-color: #9e9e9e;
    }
//2025-8-22

.table1 {
  border: 1px solid #B7B7B7;
  background-color: #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #364157;
  margin-bottom: 0;
  border-bottom: 0.5px;
}


.container {
  max-width: 1200px;
  min-width: 1200px;
  
}
.title {
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}
p {
  font-size: 20px;
  font-weight: 400;
  margin-top: 70px;
  margin-bottom: 5px;
}
.table {
  border: 1px solid #B7B7B7;
  background-color: #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #364157;
  margin-bottom: 0;
  border-bottom: 0.5px;
}
select {
  width: 120px;
  background-color: #E2E2E2;
  color: #4D4D4D;
}
.top {
  border-top: 3px solid #000;
}
.last {
  border-bottom: 1px solid #B7B7B7;
}
.table-title {
  width: 150px;
  background-color: #364157;
  border-right: 1px solid #B7B7B7;
  color: #fff;
  padding: 5px;
  align-content: center;
  font-style: #000;
}
.table-content {
  background-color: #fff;
  align-content: center;
  padding: 3px;
  flex: 1;
}
input, textarea {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  outline-color: #A2A2A2;
}

.button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 100px;
  width: 100%;
}

.btn-primary {
    background-color: #2460CE;
  }
.btn-light{
  background-color: #E2E2E2;
}

.detail {
  height: 200px;
  .table-content {
    input {
      height: 100%;
    }
  }
}

i{
  margin-left:-1px;
  margin-right: 3px;
  display: flex;
  height:30px;
  width: 35px;
  padding:3px;
  text-align: center;
  align-items: center;
  border: 2px solid #c2c2c2;
  background-color: #e2e2e2;
  color: #8a8a8a;
  font-weight: 600;
}
.num{
  width:150px;
  background-color: #e2e2e2;
}
.name{
  background-color: #c9c9c9;
  
}

.fa-search{
  font-size: 20px;
  
}

.fix{
  background-color: #fff;
  appearance: none;
  border: none;
  
}
</style>
