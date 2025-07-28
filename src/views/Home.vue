<script setup>
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue"
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
