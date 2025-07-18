<script setup>
import { ref, onMounted } from "vue";
import { getGrades } from "@/services/GradeService.js";
import StudentRecordTab from "@/components/StudentRecordTab.vue";

const grades = ref([]);

onMounted(async () => {
  const response = await getGrades();
  grades.value = response.data;
  document.body.style.backgroundColor = "#dee2e5";
});
</script>

<template>
  <div class="content">
    <StudentRecordTab :grades="grades" />
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
