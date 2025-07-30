<script setup>
import WhiteBox from '@/components/common/WhiteBox.vue';
import SearchFilterBar from '@/components/common/SearchFilterBar.vue';
import CourseTable from '@/components/course/CourseTable.vue';
import { getDepartments, getYears } from '@/services/CourseService';
import {
  getCourseListByFilter,
  getMySugangList,
} from '@/services/CourseService';
import { postEnrollCourse, deleteSugangCancel } from '@/services/SugangService';

import { ref, onMounted, computed } from 'vue';

const departments = ref([]);
const years = ref([]);
const courseList = ref([]); // 이번학기 개설 강의 목록
const mySugangList = ref([]); // 수강신청한 강의 목록

// 신청 학점 계산
const totalCredit = computed(() =>
  mySugangList.value.reduce((sum, course) => sum + course.credit, 0)
);

// 신청 과목 수 계산
const courseCount = computed(() => mySugangList.value.length);

onMounted(async () => {
  // 학과, 연도 불러오기
  const departmentRes = await getDepartments();
  departments.value = departmentRes.data;

  const yearRes = await getYears();
  years.value = yearRes.data;

  // 수강 신청한 강의 목록 불러오기
  const mySugangListRes = await getMySugangList();
  mySugangList.value = mySugangListRes.data;
});

// 필터에 따른 개설 강의 목록 조회
const handleSearch = async (filters) => {
  const courseListRes = await getCourseListByFilter(filters);

  courseList.value = courseListRes.data.map((course) => {
    course.enrolled = mySugangList.value.some(
      (c) => c.courseId === course.courseId
    );
    return course;
  });
};

// 수강 신청 처리 함수
const handleEnroll = async (course) => {
  const sugangReq = { courseId: course.courseId };

  if (!confirm('수강신청을 하시겠습니까?')) return;

  try {
    const sugangRes = await postEnrollCourse(sugangReq);

    if (sugangRes.status === 200) {
      const updatedCourse = sugangRes.data;

      const idx = courseList.value.findIndex(
        (c) => c.courseId === updatedCourse.courseId
      );

      if (idx !== -1) {
        courseList.value[idx].remStd = updatedCourse.remStd;
        courseList.value[idx].enrolled = true;
      }

      mySugangList.value.push(updatedCourse);
      alert('수강신청이 완료되었습니다.');
    }
  } catch (error) {
    const err = error.response.data;
    switch (err.code) {
      case 4002:
        alert('정원 초과! 수강신청에 실패하였습니다.');
        break;
      case 5001:
        alert('서버 오류! 수강신청에 실패하였습니다.');
        break;
      default:
        alert(
          '오류가 발생하였습니다.'
        );
    }
  }
};

// 수강 취소 처리 함수
const handleCancel = async (courseId) => {
  if (!confirm('수강신청을 취소하시겠습니까?')) return;

  try {
    await deleteSugangCancel(courseId);

    // mySugangList에서 제거
    mySugangList.value = mySugangList.value.filter(
      (course) => course.courseId !== courseId
    );

    // courseList에서도 enrolled = false, 잔여 인원 +1
    const idx = courseList.value.findIndex(
      (course) => course.courseId === courseId
    );
    if (idx !== -1) {
      courseList.value[idx].enrolled = false;
      courseList.value[idx].remStd += 1;
    }

    alert('수강신청이 취소되었습니다.');
  } catch (error) {
    alert('오류가 발생하였습니다. 현재 이 강의는 출석테이블이랑 연동되어 있어서 수강취소가 안 됨. db 수정필요');
    console.error(error);
  }
};
</script>

<template>
  <WhiteBox title="수강 신청">
    <SearchFilterBar
      :state="true"
      :departments="departments"
      :enrollment="true"
      :semester="1"
      @search="handleSearch"
    />

    <!-- 개설 과목 목록 -->
    <h5 class="fw-bold mt-3 ms-3">개설 과목 목록</h5>
    <CourseTable
      :courseList="courseList"
      maxHeight="500px"
      :show="{
        professorName: true,
        remStd: true,
        enroll: true,
        cancel: false,
        deptName: true,
      }"
      @enroll="handleEnroll"
    />

    <!-- 나의 수강신청 내역 -->
    <div class="creditInfo d-flex  mt-5 mb-0.3rem ms-3">
      <h5 class="fw-bold ">신청 내역</h5>
      <div class="credit-box">
        <span>최대 학점: 18학점</span>
        <span>신청 학점: {{ totalCredit }}학점</span>
        <span>신청 과목 수: {{ courseCount }}개</span>
      </div>
    </div>

    <CourseTable
      :courseList="mySugangList"
      maxHeight="500px"
      :show="{
        professorName: true,
        remStd: true,
        enroll: false,
        cancel: true,
        deptName: false,
      }"
      @cancel="handleCancel"
    />
  </WhiteBox>
</template>

<style lang="scss" scoped>
.creditInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.credit-box {
  display: flex;
  gap: 20px;
  font-size: 17px;
  color: #333;
  font-weight: 500;
}

.table-container{
  margin-top: 2px;
}
</style>
