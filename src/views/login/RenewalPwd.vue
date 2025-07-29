<script setup>
import { reactive } from 'vue';
import { findId } from '@/services/accountService';

const state = reactive({
  data: {
    email: '',
    auth: ''
  },
});

const submit = async () => {
  const res = await findId(state.form);
  state.data = res.data;

};
</script>

<template>
  <h2 class="title">비밀번호 변경</h2>
  <div class="container">
    <form class="py-5 d-flex flex-column gap-3" @submit.prevent="submit">
      <label class="labels">이메일:</label>
      <div class="d-flex">
        <input
          type="email"
          class="form-control"
          v-model="state.data.email"
          placeholder="이메일을 입력해주세요."
          required
          인증번호 요청
          />
      </div>
      <label class="labels">인증번호:</label>
      <div class="d-flex">
        <input
          type="text"
          class="form-control"
          v-model="state.data.auth"
          placeholder="인증번호를 입력해주세요."
          />
        <button class="h6 btn py-3 mt-3 btn-primary auth">인증번호 요청</button>
      </div>
      <button class="w-100 h6 btn py-3 mt-3 btn-primary">제출</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
}
.title {
  text-align: center;
  margin: 50px 0 0px;
  font-weight: 600;
}
.labels {
  margin-left: 10px;
}
input {
  margin: 10px;
}
.email {
  width: 500px;
  padding: 20px;
}
.auth {
  display: flex;
  width: 220px;
  height: 40px;
  justify-content: center;
  align-items: center;
}
</style>