<script setup>
import { useAccountStore } from "@/stores/account";
import { ref, onMounted } from "vue";
import { getGrades, getProfile } from "@/services/GradeService.js";
import StudentRecordTab from "@/components/StudentRecordTab.vue";
import Profile from "@/components/Profile.vue";

const account = useAccountStore();

console.log("로그인 상태:", account.state.checked);
console.log("로그인 아이디:", account.state.loggedIn);

const profile = ref({});
const grades = ref([]);
onMounted(async () => {
  try {
    const gradeResponse = await getGrades();
    grades.value = gradeResponse.data;

    if (account.state.loggedIn) {
      const response = await getProfile(); // withCredentials 포함된 getProfile 호출

      console.log("프로필 API 응답 전체:", response);
      console.log("프로필 데이터:", response.data);

      if (response.data && typeof response.data === "object") {
        profile.value = response.data;
      } else {
        profile.value = {};
      }
    }

    document.body.style.backgroundColor = "#dee2e5";
  } catch (error) {
    console.error("프로필 조회 중 에러:", error);
  }
});
</script>
<template>
  <div class="content">
    <Profile :profile="profile" />
    <StudentRecordTab :grades="grades" :profile="profile" />
  </div>
</template>
<style scoped lang="scss">
.content {
  position: relative;
  top: 0px;
  left: 0px;
}
</style>