import { createRouter, createWebHistory } from "vue-router";
import StudentRecord from "@/views/StudentRecord.vue";
import Home from "@/views/Home.vue"; // 새로 만듦

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
  ],
});

export default router;
