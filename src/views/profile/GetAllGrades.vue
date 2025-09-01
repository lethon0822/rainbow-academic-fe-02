<script setup>
import { ref, onMounted } from "vue";
import WhiteBox from "@/components/common/WhiteBox.vue";
import AcademicFilterBar from "@/components/common/AcademicFilterBar.vue";
import GradeTable from "@/components/profile/GradeTable.vue";

import { GradesbyCourse } from "@/services/GradeService";
import { getDepartments, getYears } from "@/services/CourseService";

const departments = ref([]);
const years = ref([]);
const courseList = ref([]);

const filters = ref({
  semester: "",
  grade: "",
  semesterId: 0,
});

onMounted(async () => {
  try {
    const departmentRes = await getDepartments();
    departments.value = departmentRes.data;

    const yearRes = await getYears();
    years.value = yearRes.data;

    // 초기 데이터 조회 (초기 필터값 넣기)
    await handleSearch(filters.value);
  } catch (e) {
    console.error("초기 데이터 로드 실패", e);
  }
});

const handleSearch = async (searchFilters) => {
  // searchFilters의 값을 보정해서 null 처리해주기
  filters.value.semester = searchFilters.semester || null;
  filters.value.grade = searchFilters.grade || null;
  filters.value.semesterId = searchFilters.semesterId;

  console.log("검색 필터:", filters.value);

  try {
    const res = await GradesbyCourse({
      semester: filters.value.semester,
      grade: filters.value.grade,
      semesterId: filters.value.semesterId,
    });
    console.log("API 응답:", res.data);
    courseList.value = res.data;
  } catch (error) {
    console.error("강의 목록 조회 실패", error);
  }
};

console.log(
  "요청 값:",
  JSON.stringify({
    semester: filters.value.semester,
    grade: filters.value.grade,
    semesterId: filters.value.semesterId,
  })
);
</script>

<template>
  <div class="page">
    <h1 class="page-title">영구 성적조회</h1>

    <AcademicFilterBar
      :departments="departments"
      :years="years"
      @search="handleSearch"
    />

    <GradeTable
      :courseList="courseList"
      maxHeight="800px"
      :show="{
        professorName: true,
        remStd: true,
        enroll: false,
        cancel: false,
        deptName: true,
        setting: false,
        modify: false,
        approve: false,
        check: false,
      }"
    />
  </div>
</template>

<style scoped>
.page {
  padding: 16px 24px 48px;
}
.page-title {
  font-size: 22px;
  font-weight: 600;
  margin: 8px 0 16px;
}
</style>
