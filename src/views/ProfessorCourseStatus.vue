
<!-- 강의 신청 현황  -->
<script setup>
import WhiteBox from "@/components/WhiteBox.vue";
import SearchFilterBar from "@/components/SearchFilterBar.vue";
import CourseTable from "@/components/CourseTable.vue";
import { findMyCourse } from "@/services/professorService";
import { reactive } from "vue";
import { useUserStore } from "@/stores/account";

const state = reactive({
  item: [],
});

const userStore = useUserStore();
const myCourse = async (filters) => {
  console.log("야:",userStore.userId);
  const json = {
    year: filters.year,
    semester: filters.semester,
  };
  const res = await findMyCourse(json);
  state.item = res.data;
  console.log(state.item);
};
</script>

<template>
  <WhiteBox :title="'강의신청현황조회'">
    <SearchFilterBar @search="myCourse" />
    <CourseTable
      :course-list="state.item"
      :show="{ modify: true }"
      class="some"
    />
    <div>
      <button class="enroll-btn">
        <router-link to="/professor/course/registration" class="move">개설신청</router-link>
      </button>
    </div>
  </WhiteBox>
</template>

<style lang="scss" scoped>
button {
  display: flex;
  margin-right: 40px;
  color: white;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease; // 버튼 클릭시 툭 바뀌는 게 아닌 0.2초 동안 천천히 바뀜
}
button.enroll-btn {
  background-color: #364157;
  color: #fff;
  margin-left: auto;
}
.move {
  padding-top: 2px;
  text-decoration: none;
  color: #fff;
  justify-content: flex-end;
}
</style>
