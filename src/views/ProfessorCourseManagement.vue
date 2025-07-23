<<<<<<< HEAD
<!-- 개설 완료된 강의 관리 -->
=======
>>>>>>> d0c30aedebe1a8fe2851f55727eb6bf9d95334e9
<script setup>
import SearchFilterBar from "@/components/SearchFilterBar.vue";
import WhiteBox from "@/components/WhiteBox.vue";
import CourseTable from "@/components/CourseTable.vue";
import { reactive } from "vue";
import { findMyCourse } from "@/services/professorService";
<<<<<<< HEAD
=======

>>>>>>> d0c30aedebe1a8fe2851f55727eb6bf9d95334e9
const state = reactive({
  item: [],
  resultItem: [],
});
<<<<<<< HEAD
=======

>>>>>>> d0c30aedebe1a8fe2851f55727eb6bf9d95334e9
const myCourse = async (filters) => {
  const json = {
    year: filters.year,
    semester: filters.semester,
  };
  console.log(json);
  const res = await findMyCourse(json);
  console.log("알이에스데이타:", res.data);
  state.item = res.data;
<<<<<<< HEAD
=======

>>>>>>> d0c30aedebe1a8fe2851f55727eb6bf9d95334e9
  const result = state.item.filter((item) => {
    return item.status === "승인";
  });
  state.resultItem = result;
<<<<<<< HEAD
  console.log("dkr", state.resultItem);
};
</script>
<template>
  <WhiteBox :title="'강의관리'">
    <SearchFilterBar @search="myCourse" />
=======

  console.log("dkr", state.resultItem);
};
</script>

<template>
  <WhiteBox :title="'강의관리'">
    <SearchFilterBar @search="myCourse" />

>>>>>>> d0c30aedebe1a8fe2851f55727eb6bf9d95334e9
    <CourseTable :course-list="state.resultItem" :show="{ setting: true }" />
    <router-link to="/professor/course/students">
      <button class="btn btn-primary">클릭시 이동합니다.</button>
    </router-link>
  </WhiteBox>
</template>
<<<<<<< HEAD
<style scoped>
</style>
=======

<style scoped></style>
>>>>>>> d0c30aedebe1a8fe2851f55727eb6bf9d95334e9
