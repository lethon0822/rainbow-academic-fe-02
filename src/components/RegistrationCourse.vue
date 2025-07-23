<script setup>
import { reactive } from "vue";
import { saveCourse } from "@/services/professorService";
import { useRouter } from "vue-router";
import WhiteBox from "@/components/WhiteBox.vue";

const state = reactive({
  form: {
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
  },
});

const router = useRouter();

const submit = async () => {
  console.log("시작할게");

  const res = await saveCourse(state.form);
  console.log("알이에스:", res);

  if (res === undefined || res.status !== 200) {
    alert("오류 발생. 잠시 후 다시 실행해주십시오.");
    return;
  }
  console.log("성공했나?");
  router.push("/professor/course/management");
};
</script>

<template>
  <WhiteBox :title="'강의등록'">
    <div class="container">
      <div class="d-flex top last">
        <div class="table-title">교수번호</div>
      </div>

      <form @submit="submit">
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
          </div>
        </div>

        <div class="table d-flex">
          <div class="table-title">이수학점</div>
          <div class="table-content">
            <input type="number" v-model="state.form.credit" required />
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
        </div>

        <div class="table d-flex last">
          <div class="table-title">수강인원</div>
          <div class="table-content">
            <input type="number" v-model="state.form.maxStd" required />
          </div>
          <div class="table-title">강의실</div>
          <div class="table-content">
            <input type="text" v-model="state.form.classroom" required />
          </div>
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
            <input type="text" v-model="state.form.goal" />
          </div>
        </div>
        <div class="table d-flex detail last">
          <div class="table-title">주차별계획</div>
          <div class="table-content">
            <input type="text" v-model="state.form.weekPlan" />
          </div>
        </div>

        <div class="button">
          <button class="btn btn-primary mt-3">제출</button>
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
