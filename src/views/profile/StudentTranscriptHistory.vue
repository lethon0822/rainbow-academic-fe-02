<script setup>
import WhiteBox from '@/components/common/WhiteBox.vue';
import SearchFilterBar from '@/components/common/SearchFilterBar.vue';
import GradeTable from '@/components/profile/GradeTable.vue';
import { getDepartments, getYears } from '@/services/CourseService';
import { ref, onMounted } from 'vue';
import { getCourseListByFilter } from '@/services/CourseService';

const departments = ref([]);
const years = ref([]);
const courseList = ref([]);

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
  console.log('금학기 성적조회: ', courseListRes.data);
  courseList.value = courseListRes.data.filter(
    (course) => course.status === '승인'
  );
};
</script>

<template>
  <!-- 페이지 -->
  <div class="page">
    <h1 class="page-title">금학기 성적조회</h1>
  </div>

  <SearchFilterBar
    :state="true"
    :departments="departments"
    :years="years"
    @search="handleSearch"
  ></SearchFilterBar>

  <GradeTable
    :courseList="courseList"
    maxHeight="800px"
    :show="{
      professorName: true,
      semester: true,
    }"
    @enroll="handleEnroll"
    @cancel="handleCancel"
  ></GradeTable>
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
