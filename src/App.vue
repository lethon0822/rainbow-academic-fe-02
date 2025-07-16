<script setup>
import { ref, onMounted } from "vue";
import { getGrades } from "@/services/GradeService.js";
import GradeTable from "@/components/GradeTable.vue";

const grades = ref([]);

onMounted(async () => {
  const response = await getGrades({});
  grades.value = response.data;
  console.log("받은 성적 데이터:", grades.value);
});
</script>

<template>
  <GradeTable :grades="grades" />
</template>
