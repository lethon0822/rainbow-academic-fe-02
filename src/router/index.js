import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/main",
      component: () => import("@/views/Home.vue"),
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
      component: () => import("@/views/RenewalPwd.vue"),
    },
    {
      path: "/enrollment",
      component: () => import("@/views/Enrollment.vue"),
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
      path: "/course/detail/:id",
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

    // 교수 탭
    {
      path: "/professor/course/registration",
      name: "RegistrationCourse",
      component: () => import("@/components/RegistrationCourse.vue"),
    },
    {
      path: "/professor/course/registration/:id",
      name: "ModifyCourse",
      component: () => import("@/components/RegistrationCourse.vue"),
      props: true,
    },
    {
      path: "/enrollment",
      component: () => import("@/views/Enrollment.vue"),
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
      component: () => import("@/views/ProfessorCourseStatus.vue"),
    },
    {
      path: "/professor/course/management",
      component: () => import("@/views/ProfessorCourseManagement.vue"),
    },
    {
      path: "/professor/course/:id/students",
      component: () => import("@/components/CourseStudentsList.vue"),
    },
    {
      path: "/course/survey",
      component: () => import("@/views/CourseEvaluation.vue"),
    },
    {
      path: "/course/history",

      component: () => import("@/views/CourseList.vue"),
    },

    {
      path: "/renewal/privacy",
      component: () => import("@/views/RenewalPrivacy.vue"),
    },

    //테스트 중 지워도 됩니다
    {
      path: "/test",
      component: () => import("@/views/TestMain.vue"),
    },
  ],
});
export default router;
