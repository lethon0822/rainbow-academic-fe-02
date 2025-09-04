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
  height: calc(100vh - 60px); /* 헤더 빼고 꽉 채움 */
  overflow: hidden; /* 부모 스크롤 막음 */
  display: flex;
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
  overflow: hidden;
  display: flex;
}

.content:has(.transcript-history-page) {
  flex: none;
  width: 100%;
}

.router {
  flex: 1;
  overflow-y: overlay;
  height: 100%;
}

.router::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}

.router::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.router::-webkit-scrollbar-track {
  background: transparent;
}

/* 반응형에서 더미 숨김 */
@media (max-width: 1023px) {
  .d-flex {
    display: block !important;
  }
  .dummy {
    display: none;
  }
}

@media (min-width: 1024px) {
  .router {
    width: 100%;
  }
}
</style>
