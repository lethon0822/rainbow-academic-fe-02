<script setup>
import Header from '@/components/Header.vue';
import Basic from '@/components/Basic.vue';
import { check } from '@/services/accountService';
import { watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAccountStore } from '@/stores/account';
const route = useRoute();
const account = useAccountStore();
//로그인 여부 확인
const checkAccount = async () => {

  const res = await check();
  if (res === undefined || res.status != 200) {
    account.setChecked(false);
    return;
  }
  account.setChecked(true);
  account.setLoggedIn(res.data > 0);
};
onMounted(() => {
  checkAccount();
});
watch(
  () => route.path,
  () => {
    checkAccount();
  }
);
</script>
<template>
  <!-- <template v-if="account.state.checked"> -->
    <Header />
    <div class="sidebar">
      <Basic />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer />
  <!-- </template>
  <template v-else>서버 통신 오류</template> -->
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
  background-color: #dee2e5;
  overflow-x: hidden;
}

.content {
  position: relative;
  top: 65px;
  left: 150px;
}

.sidebar {
  position: absolute;
  left: 0;
  top: 65px;
  width: 140px;
}
</style>
