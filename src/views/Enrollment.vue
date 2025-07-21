<script setup>
import WhiteBox from '@/components/WhiteBox.vue';
import SearchFilterBar from '@/components/SearchFilterBar.vue';
import CourseTable from '@/components/CourseTable.vue';
import { getDepartments, getYears } from '@/services/SearchFilterService';
import { ref, onMounted } from 'vue';

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

const handleSearch = (filters) => {
  console.log(' 받은 필터:', filters)
  // 여기에 강의 조회용 API 요청 넣을 예정
}

const courseList = [{
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },]

const mySugangList = [
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: 'SUB101',
    title: '자료구조',
    classroom: 'IT101',
    type: '전공',
    professor: '김성배',
    grade: 1,
    time: '화3수3',
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
];
</script>

<template>
  <WhiteBox title="수강 신청">
    <SearchFilterBar :state="true" :departments="departments" :years="[{ year: 2025 }]"   @search="handleSearch"></SearchFilterBar>


    <CourseTable
      :courseList="courseList"
      maxHeight="400px"
      :show="{
        professor: true,
        remSeats: true,
        enroll: true,
        cancel: false,
      }"
      @enroll="handleEnroll"
      @cancel="handleCancel"
    ></CourseTable>


    <CourseTable
      :courseList="mySugangList"
      maxHeight="500px"
      :show="{
        professor: true,
        remSeats: true,
        enroll: false,
        cancel: true,
      }"
    >
    </CourseTable>
  </WhiteBox>
</template>

<style lang="scss"></style>
