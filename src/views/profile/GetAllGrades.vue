<script setup>
import { ref, onMounted } from "vue";
import WhiteBox from "@/components/common/WhiteBox.vue";
import AcademicFilterBar from "@/components/common/AcademicFilterBar.vue";
import GradeTable from "@/components/profile/GradeTable.vue";

// 영구 성적 조회는 GradeService에서
import { GradesbyCourse } from "@/services/GradeService";
// 학기 조회는 CourseService에서
import { getDepartments, getYears } from "@/services/CourseService";

const departments = ref([]);
const years = ref([]);
const courseList = ref([]);

onMounted(async () => {
  try {
    const departmentRes = await getDepartments();
    departments.value = departmentRes.data;

    const yearRes = await getYears();
    years.value = yearRes.data;
  } catch (e) {
    console.error("초기 데이터 로드 실패", e);
  }
});

const handleSearch = async (filters) => {
  console.log("검색 필터:", filters);
  try {
    const res = await GradesbyCourse({
      year: filters.year,
      semester: filters.semester,
      grade: filters.grade,
      semesterId: filters.semesterId || 0, // 필요하다면
    });
    courseList.value = res.data.filter((course) => course.status === "승인");
  } catch (error) {
    console.error("강의 목록 조회 실패", error);
  }
};
</script>

<template>
  <div class="page">
    <h1 class="page-title">영구 성적조회</h1>
  </div>

  <AcademicFilterBar
    :state="true"
    :departments="departments"
    :years="years"
    @search="handleSearch"
  />

  <GradeTable
    :courseList="courseList"
    maxHeight="800px"
    :show="{ professorName: true, semester: true }"
  />
</template>

<style scoped>
.page {
  padding: 16px 24px 48px;
}
.page-title {
  font-size: 22px;
  font-weight: 600px;
  margin: 8px 0 -100px;
}
</style>
