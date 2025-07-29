<script setup>
import logo from "@/assets/logoW.svg";
import { useAccountStore, useUserStore } from "@/stores/account";
import { logout } from "@/services/accountService";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

const state = reactive({
  data: {
    userId: 0,
    password: "",
    userName: "",
    userRole: "",
  },
});

const router = useRouter();
const userStore = useUserStore();

const account = useAccountStore();

//로그아웃
const logoutAccount = async () => {
  if (!confirm("로그아웃 하시겠습니까?")) {
    return;
  }
  const res = await logout();

  console.log("로그아웃", res);
  if (res === undefined || res.status !== 200) {
    return;
  }
  account.setLoggedIn(false);
  router.push("/login");
};

// onMounted(()=>{
//   const passJson = history.state.data;
//    if (passJson) {
//       //passJson을 객체로 바꿔서
//       state.data = JSON.parse(passJson);
//     }
//     console.log("악",state.data)
// })
</script>

<template>
  <header>
    <div
      class="navbar navbar-dark text-white shadow-sm"
      style="background-color: #364157; height: 60px"
    >
      <div
        class="container-fluid d-flex justify-content-between align-items-center px-4"
      >
        <!-- 로고 왼쪽 -->
        <div class="logo d-flex align-items-center" @click="$router.push('/')">
          <img :src="logo" alt="로고 아이콘" height="40" />
          <span class="systemText" @click="$router.push('/')"
            >학사관리시스템</span
          >
        </div>

        <!-- 메뉴 오른쪽 -->
        <template v-if="account.state.loggedIn">
          <div class="menus d-flex align-items-center gap-3">
            <span>{{ userStore.userName }}님 반갑습니다</span>
            <span class="divider">|</span>
            <a @click="logoutAccount()">로그아웃</a>
          </div>
        </template>
        <!-- <template v-else>
          <router-link to="/login">
            <a href="#" class="text-white text-decoration-none">로그인</a>
          </router-link>
        </template> -->
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #364157;
  padding: 10px 20px;
  height: 60px;
  min-width: 1024px;
}

body,
main,
#app {
  padding-top: 60px;
}

a {
  text-decoration: none;
}

.logo img {
  position: relative;
  left: -20px;
  display: block;
  height: 45px;
  cursor: pointer;
}

.menus {
  position: relative;
  top: -2px;
  display: flex;
  gap: 20px;
}

.menus a {
  cursor: pointer;
  color: #fff;
  text-decoration: none;
}

.divider {
  color: #fff;
  user-select: none;
}

.systemText {
  position: relative;
  top: -2px;
  left: -12px;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
}
</style>
