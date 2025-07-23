import { createRouter, createWebHashHistory } from "vue-router";
import StudentRecord from "@/views/StudentRecord.vue";
import Home from "@/views/Home.vue"; // 메인
import CourseEvaluation from "@/views/CourseEvaluation.vue";

const router = createRouter({
  history: createWebHashHistory(),
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
      path: "/rank",
      component: StudentRecord,
    },
    {
      path: "/course/survey",
      component: () => import("@/views/CourseEvaluation.vue"),
    },
  ],
});

export default router;
