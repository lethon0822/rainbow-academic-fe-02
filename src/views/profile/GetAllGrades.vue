<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/account";
import { GradesbyCourse } from "@/services/GradeService";

import AcademicFilterBar from "@/components/common/AcademicFilterBar.vue";
import GradeTable from "@/components/profile/GradeTable.vue";

const courseList = ref([]);
const userStore = useUserStore();

// 필터 상태
const filters = ref({
  semesterId: userStore.semesterId || null,
  grade: null,
  semester: null,
});

// 성적 조회
async function fetchGrades() {
  try {
    const params = {};
    if (filters.value.semesterId) params.semesterId = filters.value.semesterId;
    if (filters.value.grade) params.grade = parseInt(filters.value.grade);
    if (filters.value.semester)
      params.semester = parseInt(filters.value.semester);

    console.log("API 호출 파라미터:", params);
    const res = await GradesbyCourse(params);
    console.log("API 응답:", res.data);
    courseList.value = res.data;
  } catch (e) {
    console.error("성적 조회 실패", e);
    courseList.value = [];
  }
}

// AcademicFilterBar에서 필터 변경 시 호출
function handleSearch(searchParams) {
  console.log("handleSearch 호출됨:", searchParams);

  const req = searchParams.req || {};
  filters.value = {
    semesterId: userStore.semesterId || null,
    grade: req.grade || null,
    semester: req.semester || null,
  };

  fetchGrades();
}

// 최초 로드시 데이터 불러오기
fetchGrades();
</script>

<template>
  <div class="page">
    <h1 class="page-title">영구 성적조회</h1>
<<<<<<< HEAD

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
=======
    <AcademicFilterBar @search="handleSearch" />
    <GradeTable :courseList="courseList" />
>>>>>>> 0a8567768c210cbb1e4c5741064386325173447c
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
