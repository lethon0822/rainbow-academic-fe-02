import { createRouter, createWebHistory } from "vue-router";
import StudentRecord from "@/views/StudentRecord.vue";
import Home from "@/views/Home.vue"; // 메인
import UserInfo from "@/views/UserInfo.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/grade/all",
      component: StudentRecord,
    },
    {
      path: "/",
      component: Home,
    },
    {
      path: "/user/info", // 개인정보 확인 경로 추가
      component: UserInfo,
    },
    
  ],
});

export default router;
