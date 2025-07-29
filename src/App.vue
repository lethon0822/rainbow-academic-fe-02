<script setup>
// import Header from "@/components/Header.vue";
import { reactive, provide, onMounted, watch } from "vue";
import CourseDetail from "@/components/course/CourseDetail.vue";
import { useAccountStore } from "@/stores/account";
import { check } from "@/services/accountService";
import { useRoute, useRouter } from "vue-router";

const show = reactive({
  modal: false,
  id: null,
});

const openModal = (id) => {
  console.log("id:", id);
  show.modal = true;
  show.id = id;
  console.log("show.id", show.id);
};

provide("openModal", openModal);

const route = useRoute();
const account = useAccountStore();
const router = useRouter();
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

  if (account.state.checked) {
    router.push("/");
    return;
  }
  router.push("/login");
});

watch(
  () => route.path,
  () => {
    checkAccount();
  }
);
</script>

<template>
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

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
  background-color: #dee2e5;
  overflow-x: hidden;
}

div {
  box-sizing: border-box;
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
  background-color: #2460ce;
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
