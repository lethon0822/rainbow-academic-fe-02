<script setup>
import { ref, onMounted } from "vue";
import { getGrades } from "@/services/GradeService.js";
import GradeTable from "@/components/GradeTable.vue";
import Basic from "./components/Basic.vue";
import Header from "@/components/Header.vue";
import Tab from "@/components/Tab.vue";

const grades = ref([]);

onMounted(async () => {
  const response = await getGrades({});
  grades.value = response.data;
  console.log("받은 성적 데이터:", grades.value);
});

onMounted(() => {
  document.body.style.backgroundColor = "#dee2e5";
});
</script>

<template>
  <GradeTable :grades="grades" />
  <div>
    <!-- 헤더 -->
    <Header />

    <!-- 왼쪽 사이드 메뉴 -->
    <div class="sidebar">
      <Basic />
    </div>

    <!-- 오른쪽 탭 -->
    <div class="content">
      <Tab />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  position: relative;
  top: 65px;
  left: 150px;
}
</style>
