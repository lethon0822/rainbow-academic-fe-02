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
      path: '/login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/id',
      component: () => import('@/views/Id.vue')
    },
    {
      path: '/renewal',
      component: () => import('@/views/Renewal.vue')
    }
  ],
});

export default router;
