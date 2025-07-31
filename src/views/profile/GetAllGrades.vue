<script setup>
import { ref, computed, onMounted } from "vue";
import { GradesbyCourse } from "@/services/GradeService.js";
import PutAllGrades from "@/components/profile/PutAllGrades.vue";
import WhiteBox from "@/components/common/WhiteBox.vue";
import { useUserStore } from "@/stores/account";

const grades = ref([]);
const userStore = useUserStore();
const userId = Number(userStore.userId);

if (!userId || isNaN(userId)) {
  throw new Error(`userId가 유효하지 않습니다: ${userStore.userId}`);
}

// 학기별 이수구분별 취득학점 집계
const creditByCategory = computed(() => {
  const result = [];

  grades.value.forEach((grade) => {
    const found = result.find(
      (r) => r.grade === grade.grade && r.semester === grade.semester
    );

    if (!found) {
      result.push({
        grade: grade.grade,
        semester: grade.semester,
        majorRequired:
          grade.type === "전공필수" || grade.type === "전공"
            ? grade.credit || 0
            : 0,
        majorElective: grade.type === "전공선택" ? grade.credit || 0 : 0,
        generalEducation: grade.type === "교양" ? grade.credit || 0 : 0,
      });
    } else {
      if (grade.type === "전공필수" || grade.type === "전공") {
        found.majorRequired += grade.credit || 0;
      } else if (grade.type === "전공선택") {
        found.majorElective += grade.credit || 0;
      } else if (grade.type === "교양") {
        found.generalEducation += grade.credit || 0;
      }
    }
  });

  return result;
});

// 학기별 성적 계산 (평균 평점, 신청학점 등 프론트에서 계산)
const mergedSemesterGrades = computed(() => {
  const semMap = new Map();

  grades.value.forEach((g) => {
    const key = `${g.grade}-${g.semester}`;
    if (!semMap.has(key)) {
      semMap.set(key, {
        grade: g.grade,
        semester: g.semester,
        acquiredCredits: 0,
        requestedCredits: 0,
        totalGradePoint: 0,
        count: 0,
        avgScore: 0,
        avgGradePoint: 0,
        grading: 1,
        totalStudents: 30,
      });
    }

    const sem = semMap.get(key);
    sem.acquiredCredits += g.credit || 0;
    sem.requestedCredits += g.credit || 0;

    const rankToGradePoint = {
      "A+": 4.5,
      A: 4.0,
      "B+": 3.5,
      B: 3.0,
      "C+": 2.5,
      C: 2.0,
      D: 1.5,
      F: 0,
    };
    const gradePoint = rankToGradePoint[g.rank] ?? 0;
    sem.totalGradePoint += gradePoint;
    sem.count++;
  });

  const result = [];
  semMap.forEach((value) => {
    value.avgGradePoint = value.count
      ? (value.totalGradePoint / value.count).toFixed(2)
      : 0;
    value.avgScore = (value.avgGradePoint * 20).toFixed(1);

    delete value.totalGradePoint;
    delete value.count;

    result.push(value);
  });

  return result.sort((a, b) => {
    if (a.grade === b.grade) return Number(a.semester) - Number(b.semester);
    return a.grade - b.grade;
  });
});

onMounted(async () => {
  try {
    const userStore = useUserStore();
    const userId = Number(userStore.userId);

    if (!userId || isNaN(userId)) {
      throw new Error(`userId가 유효하지 않습니다: ${userStore.userId}`);
    }

    const response = await GradesbyCourse(userId);

    grades.value = response.data || [];
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
});
</script>

<template>
  <WhiteBox title="영구성적조회">
    <div class="content">
      <PutAllGrades
        :grades="grades"
        :creditByCategory="creditByCategory"
        :semesterGrades="mergedSemesterGrades"
      />
    </div>
  </WhiteBox>
</template>

<style scoped lang="scss">
.content {
  width: 1350px;
}
</style>
