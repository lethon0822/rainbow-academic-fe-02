<script setup>
import { reactive } from "vue";
import { findId } from "@/services/accountService";

const state = reactive({
  form: {
    email: "",
    phone: "",
  },
  data: {
    name: "",
    loginId: "",
  },
});

const submit = async () => {
  try {
    const res = await findId(state.form);

    // 데이터가 없거나 loginId가 비어있으면 경고창 표시
    if (!res.data || !res.data.loginId) {
      alert("일치하는 회원 정보가 없습니다.");
      state.data = { userName: "", loginId: "" }; // 결과 초기화
    } else {
      state.data = res.data;
    }
  } catch (error) {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
    console.error(error);
  }
};
</script>

<template>
  <h2 class="title">아이디 찾기</h2>
  <div class="findId">
    <div class="container">
      <form class="py-4 d-flex flex-column gap-3" @submit.prevent="submit">
        <div>
          이메일:
          <input
            type="email"
            class="form-control"
            v-model="state.form.email"
            placeholder="이메일을 입력해주세요."
            required
          />
        </div>
        <div>
          핸드폰:
          <input
            type="text"
            class="form-control"
            v-model="state.form.phone"
            placeholder="'-'를 제외하고 입력해주세요."
            required
          />
        </div>
        <button class="w-100 h6 btn py-3 mt-3 btn-primary">조회</button>
      </form>
    </div>
  </div>
  <div class="showId" v-if="state.data">
    <p>
      🔐 찾은 아이디:
      <strong
        >이름:{{ state.data.userName }}, 아이디:
        {{ state.data.loginId }}</strong
      >
    </p>
  </div>
</template>

<style scoped>
/* 예시 스타일 */
.findId {
  max-width: 400px;
  margin: auto;
}
.title {
  text-align: center;
  margin: 20px 0 0px;
  font-weight: 600;
}
.showId {
  display: flex;
  justify-content: center;
}
</style>
