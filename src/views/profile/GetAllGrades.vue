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
    <div class="content-wrapper">
      <h1 class="page-title">영구 성적조회</h1>
      <AcademicFilterBar @search="handleSearch" />
      <GradeTable :courseList="courseList" />
    </div>
  </div>
</template>

<style scoped>
.page {
  /* 페이지 전체의 좌우 여백을 담당하는 컨테이너 */
  padding: 0;
  margin: 0 auto;
}

.content-wrapper {
  /* 모든 콘텐츠를 감싸는 핵심 컨테이너 */
  /* 여기에 최대 너비와 패딩을 설정합니다. */
  max-width: 1400px; /* 원하는 만큼 더 넓게 설정 (예: 1400px, 1600px 등) */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 20px 50px; /* 제목과 콘텐츠의 좌우 여백을 통일 */
}

/* 제목 스타일 */
.page-title {
  font-size: 22px;
  font-weight: 600;
  /* 부모인 .content-wrapper의 패딩을 따르기 위해 좌우 마진은 0으로 설정 */
  margin: 25px -25px 16px;
}

/* 모바일 */
@media (max-width: 1023px) {
  .page {
    padding: 15px 10px 0px 10px;
  }

  .page-title {
    font-size: 18px;
    margin: 8px 0 12px 0px;
  }
}

/* 태블릿 */
@media (min-width: 768px) and (max-width: 1023px) {
  .page {
    padding: 18px 15px 0px 15px;
  }

  .page-title {
    font-size: 20px;
    margin: 8px 0 14px 15px;
  }
}

/* PC (1024px 이상) */
@media (min-width: 1024px) {
  .content-wrapper {
    padding: 20px 50px;
    /* max-width는 위에서 이미 정의했으므로 중복해서 작성할 필요 없음 */
  }
}
</style>
