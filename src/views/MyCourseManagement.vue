<script setup>
import SearchFilterBar from '@/components/SearchFilterBar.vue';
import WhiteBox from '@/components/WhiteBox.vue';
import CourseTable from '@/components/CourseTable.vue';
import { reactive } from 'vue';
import { findMyCourse } from '@/services/professor';

const state = reactive({
  item:[]
})

const myCourse = async (filters) =>{
  const json = {
    year: filters.year,
    semester: filters.semester
  }
  console.log(json)
  const res = await findMyCourse(json);
  console.log('알이에스데이타:', res.data)
  state.item = res.data;
}
</script>


<template>
  <WhiteBox :title="'강의관리'">
    
    <SearchFilterBar @search="myCourse" />
    
    <CourseTable :course-list="state.item" :show="{setting:true}"/>
    <router-link to="/professor/course/students">
      <button class="btn btn-primary">클릭시 이동합니다.</button>
    </router-link>
  </WhiteBox>
</template>

<style scoped>

</style>