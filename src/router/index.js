import { createRouter, createWebHashHistory } from "vue-router";
import StudentRecord from "@/views/StudentRecord.vue";
import Home from "@/views/Home.vue"; // 메인
import CourseEvaluation from "@/views/CourseEvaluation.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/rank",
      component: StudentRecord,
    },
    {
      path: "/grade/all",
      component: () => import("@/views/GetAllGrades.vue"),
    },
    {
      path: "/",
      component: Home,
    },
    {
      path: "/course/survey",
      component: CourseEvaluation,
    },
    {
      path: "/login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/id",
      component: () => import("@/views/Id.vue"),
    },
    {
      path: "/renewal",
      component: () => import("@/views/Renewal.vue"),
    },
    {
      path: "/enrollment",
      component: () => import("@/views/Enrollment.vue"),
    },
  ],
});

export default router;
