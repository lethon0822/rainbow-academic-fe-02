import { createRouter, createWebHistory } from "vue-router";
import StudentRecord from "@/views/StudentRecord.vue";
import Home from "@/views/Home.vue"; // 메인

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
      path: "/registration/course",
      component: () => import('@/views/RegistrationCourse.vue')
    },
    
  ],
});

export default router;
