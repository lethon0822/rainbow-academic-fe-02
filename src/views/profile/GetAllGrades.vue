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

// 검색 필터 상태 (필요하다면 AcademicFilterBar에 바인딩)
const filters = ref({
  year: null,
  semester: null,
  grade: null,
  semesterId: 0,
});

onMounted(async () => {
  try {
    const departmentRes = await getDepartments();
    departments.value = departmentRes.data;

    const yearRes = await getYears();
    years.value = yearRes.data;

    // 초기 데이터 로드 시 기본 필터 값으로 조회
    await handleSearch(filters.value);
  } catch (e) {
    console.error("초기 데이터 로드 실패", e);
  }
});

const handleSearch = async (searchFilters) => {
  filters.value = searchFilters; // 필터 상태 업데이트
  console.log("검색 필터:", searchFilters);
  try {
    const res = await GradesbyCourse({
      semester: searchFilters.semester,
      grade: searchFilters.grade,
      semesterId: searchFilters.semesterId,
    });
    console.log("API 응답:", res.data);
    courseList.value = res.data; // status 필터 제거
  } catch (error) {
    console.error("강의 목록 조회 실패", error);
  }
};
</script>

<template>
  <div class="page">
    <h1 class="page-title">영구 성적조회</h1>

    <AcademicFilterBar
      :state="true"
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
