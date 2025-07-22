<script setup>
import WhiteBox from '@/components/WhiteBox.vue';
import SearchFilterBar from '@/components/SearchFilterBar.vue';
import CourseTable from '@/components/CourseTable.vue';
import { getDepartments, getYears } from '@/services/CourseService';
import { ref, onMounted } from 'vue';
import { getCourseListByFilter } from '@/services/CourseService';

const departments = ref([]);
const years = ref([]);

onMounted(async () => {
  const departmentRes = await getDepartments();
  console.log(departmentRes.data);
  departments.value = departmentRes.data;

  const yearRes = await getYears();
  console.log(yearRes.data);
  years.value = yearRes.data;
})

const handleSearch = async(filters) => {
  console.log(' 받은 필터:', filters);

  const courseListRes = await getCourseListByFilter(filters);
  console.log('courseListRes: ', courseListRes);
  courseList.value = courseListRes.data;

}

const courseList = ref([]);

</script>

<template>
  <WhiteBox title="수강 신청">
    <SearchFilterBar :state="true" :departments="departments" :years="[{ year: 2025 }]"   @search="handleSearch"></SearchFilterBar>

    <h5 class="fw-bold mt-3">개설 과목 목록</h5>
    <CourseTable
      :courseList="courseList"
      maxHeight="400px"
      :show="{
        professorName: true,
        remStd: true,
        enroll: true,
        cancel: false,
      }"
      @enroll="handleEnroll"
      @cancel="handleCancel"
    ></CourseTable>

    <h5 class="fw-bold mt-3">신청 내역</h5>
    <CourseTable
      :courseList="mySugangList"
      maxHeight="500px"
      :show="{
        professorName: true,
        remStd: true,
        enroll: false,
        cancel: true,
      }"
    >
    </CourseTable>
  </WhiteBox>
</template>

<style lang="scss"></style>
