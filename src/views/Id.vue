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
  const res = await findId(state.form);
  state.data = res.data;
  //   try {
  //     const res = await findId(state.form);
  //     foundId.value = res.id || '아이디를 찾을 수 없습니다.';
  //   } catch (err) {
  //     console.error('아이디 찾기 실패:', err);
  //     foundId.value = '조회 중 오류가 발생했습니다.';
  //   }
};
</script>

<template>
  <h1>아이디 찾기</h1>
  <div class="findId">
    <div class="container">
      <form class="py-5 d-flex flex-column gap-3" @submit.prevent="submit">
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
  <div class="showId mt-3" v-if="state.data">
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
h1 {
  display: flex;
  justify-content: center;
}
.showId {
  display: flex;
  justify-content: center;
}
</style>
