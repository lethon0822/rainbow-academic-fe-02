<!-- 강의 계획서 작성창 -->
<script setup>
import { reactive, onMounted } from "vue";
import { saveCourse, modify } from "@/services/professorService";
import { useRouter } from "vue-router";
import WhiteBox from "@/components/common/WhiteBox.vue";
import { loadCourse } from "@/services/CourseService";
import { useUserStore } from "@/stores/account";

const props = defineProps({
  id: Number,
});

const userStore = useUserStore();

console.log('이름', userStore.userName)
console.log('아이디', userStore.userId)

const state = reactive({
  form: {
    courseId: 0,
    classroom: "",
    type: "전공",
    semester: 1,
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
onMounted(async () => {
  if (props.id) {
    state.courseId = props.id;
    const res = await loadCourse(props.id);
    console.log("계획표 수정 가보자");
    state.form = res.data;
  }
});
const router = useRouter();
const submit = async () => {
  if(!confirm('제출하시겠습니까?')){return};

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
</script>
<template>
  <WhiteBox :title="'강의등록'">
    <div class="container">
      <div class="d-flex top last">
        <div class="table-title">교수번호</div>
        <div class="table-content d-flex"> 
          <input type="text" class="num" disabled :placeholder="userStore.userId"/>
            <i class="fas fa-search"></i>
          <input type="text" class="name" disabled :placeholder="userStore.userName" />
        </div>
      </div>
      <form @submit.prevent="submit">
        <p>개설신청</p>
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
        </div>
        <div class="table d-flex">
          <div class="table-title">교과구분</div>
          <div class="table-content">
            <select v-model="state.form.type" required>
              <option>전공</option>
              <option>교양</option>
            </select>
          </div>
          <div class="table-title">학과명</div>
          <div class="table-content">
            <span v-if="state.form.type === '교양'"> 교양학부 </span>
            <input v-else type="text" />
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
          <template v-if="state.form.type==='전공'">
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
              <input type="text" value="1" disabled/>
            </div>
          </template>
        </div>


        <p>강의 계획서</p>
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
          <button class="btn btn-light mt-3">
            취소
          </button>
          <button class="btn btn-primary mt-3">
            {{ props.id > 0 ? "수정" : "제출" }}
          </button>
        </div>
      </form>
    </div>
  </WhiteBox>
</template>
<style scoped lang="scss">
.container {
  max-width: 1280px;
  min-width: 1280px;
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
</style>
