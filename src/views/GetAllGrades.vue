<script setup>
import { ref, onMounted, computed } from "vue";
import WhiteBox from "@/components/WhiteBox.vue";
import PutAllGrades from "@/components/PutAllGrades.vue";
import { GradesbyCourse } from "@/services/GradeService.js";

const grades = ref([]);
const semesterGrades = ref([]);

// 이수구분별 취득학점 계산 (기존 코드)
const creditByCategory = computed(() => {
  const result = {
    majorRequired: 0,
    majorElective: 0,
    generalEducation: 0,
  };
  if (Array.isArray(grades.value)) {
    grades.value.forEach((grade) => {
      if (grade.type === "전공필수") {
        result.majorRequired += grade.credit || 0;
      } else if (grade.type === "전공선택") {
        result.majorElective += grade.credit || 0;
      } else if (grade.type === "교양") {
        result.generalEducation += grade.credit || 0;
      }
    });
  }
  return [result];
});

// semesterGrades에 requestedCredits 계산해서 붙이기
const mergedSemesterGrades = computed(() => {
  if (!semesterGrades.value.length || !grades.value.length) return [];

  return semesterGrades.value.map((sem) => {
    const requestedCredits = grades.value
      .filter(
        (g) => g.academicYear === sem.grade && g.semester === sem.semester
      )
      .reduce((sum, g) => sum + (g.credit || 0), 0);

    return {
      ...sem,
      requestedCredits,
    };
  });
});

onMounted(async () => {
  const response = await GradesbyCourse();
  grades.value = response.data.grades || [];
  semesterGrades.value = response.data.semesterGrades || [];
});
</script>

<template>
  <WhiteBox title="수강 신청">
    <div class="content">
      <PutAllGrades
        :grades="grades"
        :creditByCategory="creditByCategory"
        :semesterGrades="mergedSemesterGrades"
      />
    </div>
  </WhiteBox>
</template>

<style scoped>
.content {
  width: 1350px;
  margin-left: -150px;
}
</style>
