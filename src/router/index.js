
import { createRouter, createWebHistory } from 'vue-router';
import StudentRecord from "@/views/StudentRecord.vue";
import Home from "@/views/Home.vue"; // 메인

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/",
      component: () => import("@/views/Home.vue"),
      children:[
        {
      path: "/enrollment",
      component: () => import("@/views/enrollment/Enrollment.vue"),
    },
    {
      path: "/attendance",
      component: () => import("@/components/Attendance.vue"),
    },
    {
      path: "/gradeinput",
      component: () => import("@/components/EnrollmentGrade.vue"),
    },
    {
      path: "/grade/all",
      component: () => import("@/views/profile/GetAllGrades.vue"),
    },
    {
      path: "/profile",
      component: () => import("@/views/profile/StudentRecord.vue"),
    },
    {
      path: "/rank",
      component: () => import("@/components/profile/StudentRecordTab.vue"),
    },

    // 교수 탭
    {
      path: "/professor/course/registration",
      name: "RegistrationCourse",
      component: () => import("@/components/course/RegistrationCourse.vue"),
    },
    {
      path: "/professor/course/registration/:id",
      name: "ModifyCourse",
      component: () => import("@/components/course/RegistrationCourse.vue"),
      props: true,
    },
    {
      path: "/enrollment",
      component: () => import("@/views/enrollment/Enrollment.vue"),
    },
    {
      path: "/attendance",
      component: () => import("@/components/Attendance.vue"),
    },
    {
      path: "/enrollmentgrade",
      component: () => import("@/components/EnrollmentGrade.vue"),
    },
    {
      path: "/professor/course/status",
      component: () => import("@/views/course/ProfessorCourseStatus.vue"),
    },
    {
      path: "/professor/course/management",
      component: () => import("@/views/course/ProfessorCourseManagement.vue"),
    },
    {
      path: "/professor/course/:id/students",
      component: () => import("@/components/course/CourseStudentsList.vue"),
    },
    {
      path: "/course/survey",
      component: () => import("@/views/profile/CourseEvaluation.vue"),
    },
    {
      path: "/course/history",

      component: () => import("@/views/course/CourseList.vue"),
    },

    {
      path: "/renewal/privacy",
      component: () => import("@/views/profile/RenewalPrivacy.vue"),
    },


      ]
    },
    {
      path: "/id",
      component: () => import("@/views/Id.vue"),
    },
    {
      path: "/renewal",
      component: () => import("@/views/RenewalPwd.vue"),
    },
    
    //테스트 중 지워도 됩니다
    {
      path: "/test",
      component: () => import("@/views/TestMain.vue"),
    },
  ],
});
export default router;
