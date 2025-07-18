import { createRouter, createWebHashHistory } from "vue-router";
import StudentRecord from "@/views/StudentRecord.vue";
import Home from "@/views/Home.vue"; // 메인
import CourseEvaluation from "@/views/CourseEvaluation.vue";

const router = createRouter({
  history: createWebHashHistory(),
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
      path: "/course/survey",
      component: CourseEvaluation,
    },
  ],
});

export default router;
