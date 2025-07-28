<script setup>
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue";

</script>

<template>
  <Header />
  <div class="sidebar">
    <SideBar/>
  </div>
  <div class="content">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
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
