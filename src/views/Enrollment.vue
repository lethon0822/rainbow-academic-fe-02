<script setup>
import WhiteBox from "@/components/WhiteBox.vue";
import SearchFilterBar from "@/components/SearchFilterBar.vue";
import CourseTable from "@/components/CourseTable.vue";
import { ref } from "vue";

const courseList = ref([
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },

  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
  {
    id: "SUB101",
    title: "자료구조",
    classroom: "IT101",
    type: "전공",
    professor: "김성배",
    grade: 1,
    time: "화3수3",
    credit: 3,
    maxStd: 50,
    remSeats: 47,
  },
]);
</script>

<template>
  <WhiteBox title="수강 신청">
    <SearchFilterBar @search="handleSearch"></SearchFilterBar>
    <CourseTable
      :courseList="courseList"
      maxHeight="500px"
      :show="{
        professor: true,
        remSeats: true,
        enroll: true,
        cancel: false,
      }"
      @enroll="handleEnroll"
      @cancel="handleCancel"
    ></CourseTable>
  </WhiteBox>
</template>

<style lang="scss"></style>
