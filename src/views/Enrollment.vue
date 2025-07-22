<script setup>
import WhiteBox from '@/components/WhiteBox.vue';
import SearchFilterBar from '@/components/SearchFilterBar.vue';
import CourseTable from '@/components/CourseTable.vue';
import { getDepartments, getYears } from '@/services/CourseService';
import { ref, onMounted } from 'vue';
import { getCourseListByFilter } from '@/services/CourseService';
import { postEnrollCourse } from '@/services/SugangService';

const departments = ref([]);
const years = ref([]);

onMounted(async () => {
  const departmentRes = await getDepartments();
  console.log(departmentRes.data);
  departments.value = departmentRes.data;

  const yearRes = await getYears();
  console.log(yearRes.data);
  years.value = yearRes.data;
});

const handleSearch = async (filters) => {
  console.log(' 받은 필터:', filters);

  const courseListRes = await getCourseListByFilter(filters);
  console.log('courseListRes: ', courseListRes);
  courseList.value = courseListRes.data;
};

const handleEnroll = async (course) => {
  const sugangReq = {
    courseId: course.courseId,
  };

  console.log('수강신청할 강의: ', sugangReq);

  try{
    const sugangRes = await postEnrollCourse(sugangReq);
    console.log('sugangRes: ', sugangRes);
    sugang.value = sugangRes.data;

    if(sugangRes.status === 200){
      alert('수강신청 완료!');
    }

  } catch(error){
      const err = error.response.data;
      console.log(err);
      switch (err.code){
        case 4002: 
          alert('정원 초과! 수강신청에 실패하였습니다.');
          break;

        case 5001: 
          alert('서버 오류! 수강신청에 실패하였습니다.');
          break;
        
        default:
          alert('알 수 없는 오류 발생! 수강신청에 실패하였습니다.');
      }

  }




};

const courseList = ref([]);
const sugang = ref({});
</script>

<template>
  <WhiteBox title="수강 신청">
    <SearchFilterBar
      :state="true"
      :departments="departments"
      :years="[{ year: 2025 }]"
      @search="handleSearch"
    ></SearchFilterBar>

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
