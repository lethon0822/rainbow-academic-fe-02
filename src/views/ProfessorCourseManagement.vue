<script setup>
import SearchFilterBar from "@/components/SearchFilterBar.vue";
import WhiteBox from "@/components/WhiteBox.vue";
import CourseTable from "@/components/CourseTable.vue";
import { reactive, onMounted, ref } from "vue";
import { findMyCourse } from "@/services/professorService";
import { getYears } from '@/services/CourseService';


const state = reactive({
  resultItem: [],
  visable: false
});
const years = ref([]);
const courseList = ref([]); // 현재 유저의 전체 강의 목록


onMounted(async ()=>{

  const yearRes = await getYears();
  years.value = yearRes.data;

});

const myCourse = async (filters) => {
  const json = {
    year: filters.year,
    semester: filters.semester,
  };

  const res = await findMyCourse(json);
  console.log("알이에수:",res)

  if(res.data.length > 0){
    courseList.value = res.data;
    const result = courseList.value.filter((item) => {
      return item.status === "승인";
    });
    state.resultItem = result;
    return;
  }
    state.resultItem = [];
    state.visable = true;
  
    
    
  
  console.log(state.visable)
};
</script>
<template>
  <WhiteBox :title="'강의관리'">
    <SearchFilterBar @search="myCourse" :years="years" />
    <CourseTable :course-list="state.resultItem" :show="{ setting: true }" />
      <template v-if="state.visable">
        <div>개설된 강의가 없습니다.</div>
      </template>
  </WhiteBox>
</template>

<style scoped>
div{
  justify-content: center;
  text-align: center;
}
</style>














