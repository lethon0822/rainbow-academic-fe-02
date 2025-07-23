import { createRouter, createWebHistory } from 'vue-router';
import StudentRecord from '@/views/StudentRecord.vue';
import Home from '@/views/Home.vue'; // 메인

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/grade/all',
      component: StudentRecord,
    },
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/id',
      component: () => import('@/views/Id.vue'),
    },
    {
      path: '/renewal',
      component: () => import('@/views/RenewalPwd.vue'),
    },
    {
      path: '/enrollment',
      component: () => import('@/views/Enrollment.vue'),
    },
    {
      path: '/attendance',
      component: () => import('@/components/AttendanceInput.vue'),
    },
    {
      path: '/gradeinput',
      component: () => import('@/components/GradeInput.vue'),
    },
    {
      path: '/professor/course/registration',
      name: 'RegistrationCourse',
      component: () => import('@/components/RegistrationCourse.vue'),
    },
    {
      path: '/professor/course/registration/:id',
      name: 'ModifyCourse',
      component: () => import('@/components/RegistrationCourse.vue'),
      props: true
    },
    {
      path: '/professor/course/status',
      component: () => import('@/views/ProfessorCourseStatus.vue'),
    },
    {
      path: '/professor/course/management',
      component: () => import('@/views/ProfessorCourseManagement.vue'),
    },
    {
      path: '/professor/course/students',
      component: () => import('@/components/CourseStudentsList.vue'),
    },
    {
      path: '/course/detail',
      component: () => import('@/components/CourseDetail.vue'),
    },
  ],
});

export default router;
