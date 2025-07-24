<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import AllGradesWhiteBox from "@/components/AllGradesWhiteBox.vue";
import PutAllGrades from "@/components/PutAllGrades.vue";
import { GradesbyCourse } from "@/services/GradeService.js";

const grades = ref([]);

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
        grading: 1, // 임의값, 필요에 따라 수정
        totalStudents: 30, // 임의값, 실제 데이터로 대체 필요
      });
    }

    const sem = semMap.get(key);
    sem.acquiredCredits += g.credit || 0;
    sem.requestedCredits += g.credit || 0;

    // rank -> 평점 매핑 예시 (필요에 따라 확장)
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

  // 평균 평점, 평균 점수 계산
  const result = [];
  semMap.forEach((value) => {
    value.avgGradePoint = value.count
      ? (value.totalGradePoint / value.count).toFixed(2)
      : 0;
    value.avgScore = (value.avgGradePoint * 20).toFixed(1); // 임의 점수 계산

    // 불필요한 프로퍼티 제거
    delete value.totalGradePoint;
    delete value.count;

    result.push(value);
  });

  // 학년, 학기 순 정렬 (필요 시)
  return result.sort((a, b) => {
    if (a.grade === b.grade) return a.semester.localeCompare(b.semester);
    return a.grade - b.grade;
  });
});

onMounted(async () => {
  try {
    const response = await GradesbyCourse();
    console.log("✅ API response:", response.data);

    grades.value = response.data || [];
  } catch (error) {
    console.error("API 호출 실패:", error);
  }
});

watchEffect(() => {
  console.log("👀 [Parent] grades:", JSON.stringify(grades.value));
  console.log(
    "👀 [Parent] creditByCategory:",
    JSON.stringify(creditByCategory.value)
  );
  console.log(
    "👀 [Parent] mergedSemesterGrades:",
    JSON.stringify(mergedSemesterGrades.value)
  );
});
</script>

<template>
  <AllGradesWhiteBox title="학적변동관리">
    <div class="content">
      <PutAllGrades
        :grades="grades"
        :creditByCategory="creditByCategory"
        :semesterGrades="mergedSemesterGrades"
      />
    </div>
  </AllGradesWhiteBox>
</template>

<style scoped lang="scss">
.content {
  width: 1350px;
  margin-left: -150px;
}
</style>
