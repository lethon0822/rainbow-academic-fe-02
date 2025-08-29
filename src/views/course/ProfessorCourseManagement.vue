<script setup>
import SearchFilterBar from '@/components/common/SearchFilterBar.vue';
import WhiteBox from '@/components/common/WhiteBox.vue';
import CourseTable from '@/components/course/CourseTable.vue';
import { reactive, ref } from 'vue';
import { findMyCourse } from '@/services/professorService';

const state = reactive({
  resultItem: [],
  visable: false,
});

const courseList = ref([]); // 현재 유저의 전체 강의 목록

const myCourse = async (filters) => {
  const json = {
    year: filters.year,
    semester: filters.semester,
  };

  const res = await findMyCourse(json);
  if (res.data.length > 0) {
    courseList.value = res.data;
    const result = courseList.value.filter((item) => {
      return item.status === '승인';
    });
    state.resultItem = result;
    state.resultItem.sort((a, b) => a.title.localeCompare(b.title));
    console.log(state.resultItem);
    state.visable = false;
    return;
  }
  state.resultItem = [];
  state.visable = true;
};
</script>
<template>
  <WhiteBox :title="'강의관리'">
    <SearchFilterBar @search="myCourse" />
    <CourseTable :course-list="state.resultItem" :show="{ setting: true }" />
    <template v-if="state.visable">
      <div>개설된 강의가 없습니다.</div>
    </template>
  </WhiteBox>
</template>

<style scoped>
div {
  justify-content: center;
  text-align: center;
}
</style>
