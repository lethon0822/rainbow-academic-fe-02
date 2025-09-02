<script setup>
import { ref, onMounted } from "vue";
import WhiteBox from "@/components/common/WhiteBox.vue";
import AcademicFilterBar from "@/components/common/AcademicFilterBar.vue";
import GradeTable from "@/components/profile/GradeTable.vue";

import { GradesbyCourse } from "@/services/GradeService";
import { useUserStore } from "@/stores/account";

const courseList = ref([]);
const userStore = useUserStore();

const filters = ref({
  semester: "",
  grade: "",
  semesterId: 0, // userStore에서 가져올 기본값
});

onMounted(async () => {
  try {
    // userStore에서 현재 semesterId 가져오기
    filters.value.semesterId = userStore.semesterId || 0;

    // 초기 데이터 로드
    await handleSearch(filters.value);
  } catch (e) {
    console.error("초기 데이터 로드 실패", e);
  }
});

const handleSearch = async (searchFilters) => {
  console.log("handleSearch 호출됨:", searchFilters);

  // 필터 업데이트 - semesterId는 userStore 값 유지
  filters.value = {
    semester: searchFilters.semester || null,
    grade: searchFilters.grade || null,
    semesterId: userStore.semesterId || 0,
  };

  console.log("최종 검색 필터:", filters.value);

  try {
    const apiParams = {
      semesterId: filters.value.semesterId,
    };

    // null이 아닌 값만 API 파라미터에 추가
    if (filters.value.semester) {
      apiParams.semester = parseInt(filters.value.semester);
    }
    if (filters.value.grade) {
      apiParams.grade = parseInt(filters.value.grade);
    }

    console.log("API 호출 파라미터:", apiParams);

    const res = await GradesbyCourse(apiParams);
    console.log("API 응답:", res.data);
    courseList.value = res.data;
  } catch (error) {
    console.error("강의 목록 조회 실패", error);
    courseList.value = [];
  }
};
</script>

<template>
  <div class="page">
    <h1 class="page-title">영구 성적조회</h1>

    <AcademicFilterBar @search="handleSearch" />

    <GradeTable :courseList="courseList" />
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
