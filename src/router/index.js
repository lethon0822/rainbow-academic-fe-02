import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"; // 메인

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/professor/course/registration",
      component: () => import("@/views/RegistrationCourse.vue"),
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
    {
      path: "/attendance",
      component: () => import("@/components/AttendanceInput.vue"),
    },
    {
      path: "/gradeinput",
      component: () => import("@/components/GradeInput.vue"),
    },
    {
      path: "/professor/course/management",
      component: () => import("@/views/CourseManagement.vue"),
    },
    {
      path: "/professor/course/students",
      component: () => import("@/components/CourseStudents.vue"),
    },
    {
      path: "/course/detail",
      component: () => import("@/components/CourseDetail.vue"),
    },
    {
      path: "/grade/all",
      component: () => import("@/views/GetAllGrades.vue"),
    },
    {
      path: "/profile",
      component: () => import("@/views/StudentRecord.vue"),
    },
    {
      path: "/rank",
      component: () => import("@/components/StudentRecordTab.vue"),
    },
    {
      path: "/course/survey",
      component: () => import("@/views/CourseEvaluation.vue"),
    },
  ],
});

export default router;
