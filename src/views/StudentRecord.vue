<script setup>
import { ref, onMounted } from "vue";
import { getGrades } from "@/services/GradeService.js";
import Header from "@/components/Header.vue";
import Basic from "@/components/Basic.vue";
import Tab from "@/components/Tab.vue";

const grades = ref([]);

onMounted(async () => {
  const response = await getGrades();
  grades.value = response.data;
  document.body.style.backgroundColor = "#dee2e5";
});
</script>

<template>
  <Header />
  <div class="sidebar">
    <Basic />
  </div>
  <div class="content">
    <Tab :grades="grades" />
  </div>
</template>

<style scoped lang="scss">
//수동 컨트롤러
.content {
  position: relative;
  top: 0px;
  left: 0px;
}
</style>
