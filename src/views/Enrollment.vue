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
    <SearchFilterBar :state="true" :departments="departments" :years="[{ year: 2025 }]"   @search="handleSearch"></SearchFilterBar>

    <h5 class="fw-bold mt-3">개설 과목 목록</h5>
    <CourseTable
      :courseList="courseList"
      maxHeight="500px"
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
