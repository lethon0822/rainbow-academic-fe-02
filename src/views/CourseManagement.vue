<script setup>
import SearchFilterBar from "@/components/SearchFilterBar.vue";
import WhiteBox from "@/components/WhiteBox.vue";
</script>

<template>
  <WhiteBox :title="'강의관리'">
    <router-link to="/professor/course/students">
      <button class="btn btn-primary">클릭시 이동합니다.</button>
    </router-link>
  </WhiteBox>
</template>

<style scoped></style>
