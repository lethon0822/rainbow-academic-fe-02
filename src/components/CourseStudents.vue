<script setup>
import WhiteBox from "./WhiteBox.vue";
import CourseDetail from "./CourseDetail.vue";

import { ref } from "vue";
const link = ref("/course/detail");

const openLink = () => {
  window.open(link.value, "_blank", "width=700px,height=800px,scrollbars=yes");
};
</script>

<template>
  <WhiteBox :title="'학생조회'">
    <button @click="openLink">
      <!-- <a href="/course/detail" target="_blank">강의계획서</a> -->
      강의계획서
    </button>
  </WhiteBox>
</template>

<style scoped></style>
