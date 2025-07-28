<script setup>
// import Header from "@/components/Header.vue";
import { reactive, provide, onMounted, watch } from "vue";
import CourseDetail from "@/components/course/CourseDetail.vue";
import { useAccountStore } from "@/stores/account";
import { check } from "@/services/accountService";
import { useRoute, useRouter } from "vue-router";
const show = reactive({
  modal: false,
  id: null
})
const openModal = (id) => {
  console.log('id:', id)
  show.modal = true;
  show.id = id
  console.log('show.id', show.id)
}
provide('openModal', openModal)
const route = useRoute();
const account = useAccountStore();
const router = useRouter();
// 초기 로딩 상태 관리
const isInitializing = reactive({ value: true });
// 로그인 여부 확인
const checkAccount = async () => {
  try {
    const res = await check();
    if (res === undefined || res.status !== 200) {
      account.setChecked(false);
      account.setLoggedIn(false);
      return false;
    }
    account.setChecked(true);
    account.setLoggedIn(res.data > 0);
    return res.data > 0;
  } catch (error) {
    console.error('Account check failed:', error);
    account.setChecked(false);
    account.setLoggedIn(false);
    return false;
  }
};
// 초기화 및 라우팅 처리
const initializeApp = async () => {
  const isLoggedIn = await checkAccount();
  isInitializing.value = false;
  // 현재 경로가 /login이 아닌 경우에만 리다이렉션 처리
  if (route.path === '/login') {
    // 로그인 페이지에서 이미 로그인된 경우 홈으로 리다이렉션
    if (isLoggedIn) {
      router.push('/');
    }
  } else {
    // 다른 페이지에서 로그인되지 않은 경우 로그인 페이지로 리다이렉션
    if (!isLoggedIn) {
      router.push('/login');
    }
  }
};
onMounted(() => {
  initializeApp();
});
// 라우트 변경 감지
watch(
  () => route.path,
  async (newPath) => {
    // 초기화 중이 아닐 때만 체크
    if (!isInitializing.value) {
      const isLoggedIn = await checkAccount();
      // 로그인 페이지가 아닌데 로그인되지 않은 경우
      if (newPath !== '/login' && !isLoggedIn) {
        router.push('/login');
      }
      // 로그인 페이지인데 이미 로그인된 경우
      else if (newPath === '/login' && isLoggedIn) {
        router.push('/');
      }
    }
  }
);
</script>
<template>
  <!-- 초기화 중일 때 로딩 표시 (선택사항) -->
  <div v-if="isInitializing.value" class="loading">
    로딩중...
  </div>
  <template v-else>
    <template v-if="show.modal">
      <div class="black-bg" @click="show.modal = false">
        <div class="cover">
          <div class="white-bg" @click.stop>
            <div @click="show.modal = false" class="close">⨯</div>
            <CourseDetail :id="show.id" />
          </div>
        </div>
      </div>
    </template>
    <router-view />
  </template>
</template>
<style lang="scss">
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
}
.black-bg {
  display: flex;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
  z-index: 9999;
  justify-content: center;
  align-items: center;
}
.cover {
  overflow: hidden;
  border-radius: 8px;
}
.close {
  font-size: 20px;
  font-weight: 800;
  background-color: #2460CE;
  color: #fff;
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  margin-left: auto;
  border-radius: 8px;
  line-height: 30px;
  margin-right: 28px;
}
.white-bg {
  justify-content: center;
  width: 100%;
  height: 80vh;
  background: white;
  padding: 20px;
  z-index: 99999;
  overflow-y: auto;
  padding-right: 10px;
}
</style>