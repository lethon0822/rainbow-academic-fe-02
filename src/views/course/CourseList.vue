<script setup>
import WhiteBox from '@/components/common/WhiteBox.vue';
import SearchFilterBar from '@/components/common/SearchFilterBar.vue';
import CourseTable from '@/components/course/CourseTable.vue';
import { getDepartments, getYears } from '@/services/CourseService';
import { ref, onMounted } from 'vue';
import { getCourseListByFilter } from '@/services/CourseService';

const departments = ref([]);
const years = ref([]);
const courseList = ref([]); // 전체 강의 목록

onMounted(async () => {
  const departmentRes = await getDepartments();
  console.log(departmentRes.data);
  departments.value = departmentRes.data;

  const yearRes = await getYears();
  console.log(yearRes.data);
  years.value = yearRes.data;
});

const handleSearch = async (filters) => {
  console.log('필터: ', filters);
  const courseListRes = await getCourseListByFilter(filters);
  console.log('강의조회: ', courseListRes.data);
  console.log("courseListRes:", courseListRes);
console.log("courseListRes.data:", courseListRes.data);
  courseList.value = courseListRes.data.filter(
    (course) => course.status === '승인'
  );
};
</script>

<template>
  <!-- 페이지 -->
  <div class="page">
    <h1 class="page-title">강의조회</h1>
  </div>

  <SearchFilterBar
    :state="true"
    :departments="departments"
    :years="years"
    @search="handleSearch"
  ></SearchFilterBar>

  <CourseTable
    :courseList="courseList"
    maxHeight="800px"
    :show="{
      professorName: true,
      semester: true,
    }"
    @enroll="handleEnroll"
    @cancel="handleCancel"
  ></CourseTable>
</template>

<style scoped>
/* 페이지 */
.page {
  padding: 16px 24px 48px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0 -100px;
}

.profile-wrapper {
  display: flex;
  gap: 180px;
  align-items: flex-start;
}
</style>
