<script setup>
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue";
import Notices from "@/components/common/Notices.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>
    <Header />
  </div>

  <div class="d-flex main">
    <div class="sidebar">
      <div class="dummy"></div>
      <SideBar />
    </div>

    <div class="content d-flex">
      <div class="router">
        <router-view />
        <WaveLoader />
<<<<<<< HEAD
=======
        <Notices v-if="route.path === '/'" />
>>>>>>> d8620a4aaed4359bff7f7ed6b59c953c9328b010
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-top: 60px;
}
.sidebar {
  width: 250px;
  box-sizing: border-box;
}
.dummy {
  width: 250px;
}
.content {
  flex: 1;
}
.router {
  min-width: 1580px;
}
</style>
