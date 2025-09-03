<script setup>
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue";
import Notices from "@/components/common/Notices.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const isMenuOpen = ref(false);

const toggleMenuOpen = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div>
    <Header @toggle-menu="toggleMenuOpen" />

    <div class="d-flex main">
      <SideBar :is-menu-open="isMenuOpen" />
      <div class="dummy"></div>
      <SideBar />

      <div class="content d-flex">
        <div class="router">
          <router-view />
          <Notices v-if="route.path === '/'" />
        </div>
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

@media (min-width: 1024px) {
  .router {
    min-width: 1580px;
  }
}
</style>
