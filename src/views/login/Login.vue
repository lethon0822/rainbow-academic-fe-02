<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/services/accountService";
import { useUserStore } from "@/stores/account";
import Modal from "@/components/common/Modal.vue";
import Id from "@/views/login/Id.vue";
import RenewalPwd from "@/views/login/RenewalPwd.vue";

const router = useRouter();

const isModalOpen = ref(false);
const modalContent = ref(null);

const state = reactive({
  form: {
    loginId: "",
    password: "",
  },
});
//모달
const openModal = (type) => {
  if (type === "id") {
    modalContent.value = "id";
  } else if (type === "renewal") {
    modalContent.value = "renewal";
  }
  isModalOpen.value = true;
};
const closeModal = () => {
  isModalOpen.value = false;
  modalContent.value = null;
};

const submit = async () => {
  const res = await login(state.form);

  switch (res.status) {
    case 200:
      await router.push({
        path: "/",
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
    <div class="login-container">
      <h2 class="login-title">로그인</h2>
      <form class="login-form" @submit.prevent="submit">
        <div class="input-group">
          <input
            type="text"
            class="login-input"
            id="loginId"
            placeholder="아이디"
            v-model="state.form.loginId"
            required
          />
        </div>
        <div class="input-group">
          <input
            type="password"
            class="login-input"
            id="password"
            placeholder="패스워드"
            v-model="state.form.password"
            autocomplete="off"
            required
          />
        </div>
        <button type="submit" class="login-button">로그인</button>
      </form>

      <div class="login-links">
        <a href="#" class="link" @click.prevent="openModal('id')">아이디찾기</a>
        <span class="divider">|</span>
        <a href="#" class="link" @click.prevent="openModal('renewal')"
          >비밀번호변경</a
        >
      </div>
      <Modal v-if="isModalOpen" @close="closeModal">
        <component :is="modalContent === 'id' ? Id : RenewalPwd" />
      </Modal>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.login-container {
  width: 100%;
  max-width: 320px;
  padding: 0;
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 30px 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.input-group {
  position: relative;
}

.login-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.login-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.login-input::placeholder {
  color: #999;
}

.login-button {
  width: 100%;
  height: 48px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.login-button:hover {
  background: #0056b3;
}

.login-button:active {
  transform: translateY(1px);
}

.login-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.link {
  color: #666;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.link:hover {
  color: #333;
  text-decoration: underline;
}

.divider {
  color: #ccc;
  font-size: 12px;
}

@media (max-width: 480px) {
  .login-container {
    max-width: 280px;
  }

  .login-title {
    font-size: 22px;
    margin-bottom: 24px;
  }

  .login-input,
  .login-button {
    height: 44px;
  }

  .login-button {
    font-size: 15px;
  }
}
</style>
