<script setup>
import CourseTable from '@/components/course/CourseTable.vue';
import SearchFilterBar from '@/components/common/SearchFilterBar.vue';
import WhiteBox from '@/components/common/WhiteBox.vue';
import { reactive, ref } from "vue";
import { findMyCourse } from "@/services/professorService";


const state = reactive({
  resultItem: [],
  visable: false
});

const courseList = ref([]); // 현재 유저의 전체 강의 목록



const myCourse = async (filters) => {
  const json = {
    year: filters.year,
    semester: filters.semester,
  };

  const res = await findMyCourse(json);
  

  if(res.data.length > 0){
    courseList.value = res.data;
    const result = courseList.value.filter((item) => {
      return item.status === "승인";
    });
    state.resultItem = result;
    state.visable = false;
    return;
  }
    state.resultItem = [];
    state.visable = true;
  
  console.log(state.visable)
};

const check = async (id) =>{

}


</script>

<template>
  <WhiteBox :title="'강의평가조회'">
    <SearchFilterBar @search="myCourse" />
    <CourseTable :course-list="state.resultItem" :show="{ check: true }" />
    <div class="comment-container">
      <h3><b>총평</b></h3>
      <hr>
      <div class="comment">
        어쩌구
      </div>
    </div>
</WhiteBox>
</template>

<style scoped lang="scss">
.comment-container {
  margin: 70px 0;
  margin-left: 15px;
  border-radius: 5px;
  width: 100%;
  max-height: 1000px;
  max-width: 1430px;
  min-width: 1350px;
  overflow-y: auto; // 세로 스크롤
  scrollbar-gutter: stable; //스크롤바로 인해 테이블 컬럼 정렬 깨짐 방지
}

hr{
  margin-top: 5px;
  margin-bottom: 20px;
}
.comment{
  margin:3px;
  min-height: 100px;
  max-width: 1346px;
  min-width: 1346px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

</style>