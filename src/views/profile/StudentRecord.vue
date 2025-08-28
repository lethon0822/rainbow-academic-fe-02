<script setup>
//학생 프로필 사진
import { useAccountStore } from "@/stores/account";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { getGrades, getProfile } from "@/services/GradeService.js";
import Profile from "@/components/profile/Profile.vue";

const account = useAccountStore();
const user = useUserStore();

console.log("로그인 상태:", account.state.checked);
console.log("로그인 아이디:", account.state.loggedIn);

const profile = ref({});
const grades = ref([]);

onMounted(async () => {
  try {
    const gradeResponse = await getGrades();
    grades.value = gradeResponse.data || [];

    // 세션에서 자동으로 loginId 가져와서 프로필 조회
    const response = await getProfile();
    profile.value = response.data || {};

    console.log("프로필 데이터:", profile.value);
  } catch (error) {
    console.error("에러:", error);
    if (error.response?.status === 401) {
      console.log("로그인이 필요합니다");
    }
  }
});
</script>

<template>
  <div class="content">
    <Profile :profile="profile" />
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  top: 0px;
  left: 0px;
}
</style>
