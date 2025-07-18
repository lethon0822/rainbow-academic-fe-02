import { createRouter, createWebHistory } from "vue-router";
import GradeAll from "@/views/GradeAll.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/grade/all",
      component: GradeAll,
    },
  ],
});

export default router;
