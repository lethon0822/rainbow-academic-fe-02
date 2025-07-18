<script setup>
import Header from "@/components/Header.vue";
import Basic from "@/components/Basic.vue";
</script>

<template>
  <Header />
  <div class="sidebar">
    <Basic />
  </div>
  <div class="content">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
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
