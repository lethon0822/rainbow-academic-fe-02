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
    courseList.value = courseListRes.data.filter(course => course.status === '승인');

}
</script>

<template>
    <WhiteBox title="강의 조회">
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
    </WhiteBox>
</template>

<style scoped lang="scss">

</style>