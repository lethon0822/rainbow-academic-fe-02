<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/services/accountService";
import { useUserStore } from "@/stores/account";

const router = useRouter();

const state = reactive({
  form: {
    loginId: "",
    password: "",
  },
  // data: {
  //     userId: '',
  //     password: '',
  //     userName: '',
  //     userRole: ''
  // }
});

const submit = async () => {
  const res = await login(state.form);

  // state.data = res.data;
  // const json = JSON.stringify(state.data);
  switch (res.status) {
    case 200:
      await router.push({
        path: "/",
        // state: {
        //     data:json
        // }
      });

      break;
    case 404:
      alert("아이디/비밀번호를 확인해주세요.");
      break;
  }
  const userStore = useUserStore();
  userStore.userName = res.data.userName;
  userStore.userId = res.data.userId;
  userStore.userRole = res.data.userRole;
};
</script>

<template>
  <div class="login">
    <div class="container">
      <h2 class="title">로그인</h2>
      <form class="py-5 d-flex flex-column gap-3" @submit.prevent="submit">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="loginId"
            placeholder="아이디"
            v-model="state.form.loginId"
          />
          <label for="loginId">아이디</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="패스워드"
            v-model="state.form.password"
            autocomplete="off"
          />
          <label for="password">패스워드</label>
        </div>
        <button class="w-100 h6 btn py-3 btn-primary">로그인</button>
      </form>

      <div class="d-flex change">
        <router-link to="/id">아이디찾기</router-link>
        <router-link to="/renewal">비밀번호변경</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  margin: 50px 0;
  font-weight: 600;
}
.container {
  max-width: 576px;
}
.login {
  justify-content: center;
  align-content: center;
}
.change {
  justify-content: center;
  gap: 70px;
}
</style>
