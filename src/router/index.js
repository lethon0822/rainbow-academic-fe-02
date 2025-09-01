import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 로그인
    {
      path: "/login",
      component: () => import("@/views/login/LoginPage.vue"),
    },
    //아이디 찾기(views-login)
    {
      path: "/id",
      component: () => import("@/views/login/Id.vue"),
    },
    //비밀번호 변경(views-login)
    {
      path: "/renewal",
      component: () => import("@/views/login/RenewalPwd.vue"),
    },

    //홈
    {
      path: "/",
      component: () => import("@/views/Home.vue"),
      children: [
        //components
        //common
        {
          path: "/notice",
          component: () => import("@/components/common/Notices.vue"),
        },

        //course
        {
          path: "/professor/attendance",
          component: () => import("@/components/course/Attendance.vue"),
        },
        {
          path: "/professor/course/:id/students",
          component: () =>
            import("@/views/course/ProfessorCourseManagement.vue"),
        },
        {
          path: "/enrollmentgrade",
          component: () => import("@/components/course/EnrollmentGrade.vue"),
        },
        {
          //강의계획서 등록
          path: "/professor/course/registration",
          name: "RegistrationCourse",
          component: () => import("@/components/course/RegistrationCourse.vue"),
        },
        {
          //강의계획서 수정
          path: "/professor/course/registration/:id",
          name: "ModifyCourse",
          component: () => import("@/components/course/RegistrationCourse.vue"),
          props: true,
        },

        //profile
        {
          path: "/rank",
          component: () => import("@/components/profile/Profile.vue"),
        },

        //views
        //application
        {
          path: "/application",
          component: () => import("@/views/Application.vue"),
        },
        //course
        {
          path: "/course/history",
          component: () => import("@/views/course/CourseList.vue"),
        },
        {
          path: "/professor/course/management",
          component: () =>
            import("@/views/course/ProfessorCourseManagement.vue"),
        },
        {
          path: "/professor/course/status",
          component: () => import("@/views/course/ProfessorCourseStatus.vue"),
        },
        {
          path: "/professor/survey/check",
          component: () => import("@/views/course/SurveyResultCheck.vue"),
        },

        //enrollment

        {
          path: "/enrollment",
          component: () => import("@/views/enrollment/Enrollment.vue"),
        },

        //management
        {
          path: "/schedule",
          component: () => import("@/views/management/SchedulePage.vue"),
        },
        {
          path: "/deptmanage",
          component: () => import("@/views/management/DepartmentManage.vue"),
        },
        //staff
        {
          path: "/staff",
          component: () => import("@/views/staff/MemberListPage.vue"),
        },
        {
          path: "/staff/approval",
          component: () => import("@/views/staff/ManageApproval.vue"),
        },

        //profile
        {
          path: "/course/survey",
          component: () => import("@/views/profile/CourseEvaluation.vue"),
          name: "CourseEvaluation",
        },
        {
          path: "/grade/permanent",
          component: () => import("@/views/profile/GetAllGrades.vue"),
        },
        {
          path: "/renewal/privacy",
          component: () => import("@/views/profile/RenewalPrivacy.vue"),
        },
        {
          path: "/profile",
          component: () => import("@/views/profile/StudentRecord.vue"),
        },
        {
          path: '/profile/test',
          component: () => import('@/views/profile/StudentRecord.vue'),
        },
        {
          path: "/grade/current",
          component: () =>
            import("@/views/profile/StudentTranscriptHistory.vue"),
        },
      ],
    },
  ],
});
export default router;
