<script setup>
import { reactive, onMounted } from "vue";
import { courseStudentList } from "@/services/professorService";
import { useUserStore } from "@/stores/account";
import { useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const passJson = history.state.data;
  if (passJson) {
    const nana = JSON.parse(passJson);
    state.course = nana;

    const id = state.course.courseId;
    console.log("아이디", id);
    const res = await courseStudentList(id);
    console.log("냐냐", res);

    if (res.data.length > 0) {
      state.data = res.data;
      console.log("스테이트", state.data);
      return;
    }
  }
});

const attendance = () => {
  console.log("넘겨줄 데이터", state.data);
  const jsonBody = JSON.stringify(state.data);

  router.push({
    path: "/professor/attendance",
    state: {
      data: jsonBody,
      id: route.params.id,
    },
  });
};

const enrollmentGrade = () => {
  console.log("넘겨줄 데이터", state.data);
  const jsonBody = JSON.stringify(state.data);

  router.push({
    path: "/enrollmentgrade",
    state: {
      data: jsonBody,
      id: route.params.id,
    },
  });
};

const state = reactive({
  courses: [
    {
      id: 1,
      title: "컴퓨터 과학개론",
      courseCode: "CS101",
      score: 60,
      grade: "A+",
      attendance: 20,
      attendanceRate: 20,
      lateCount: 20,
      assignments: 0,
      isCompleted: true,
    },
    {
      id: 2,
      title: "컴퓨터 네트워크",
      courseCode: "CS101",
      isCompleted: false,
    },
  ],
});

const handleStudentManagement = (courseId) => {
  console.log(`학생 관리: ${courseId}`);
};

const handleAttendanceManagement = (courseId) => {
  console.log(`출결관리 및 성적: ${courseId}`);
};
</script>

<template>
  <div class="container">
    <div class="header-card">
      <h1>금학기 성적조회</h1>
      <p>
        금학기 성적을 조회할 수 있으며, 상세 확인은 강의 평가 완료 후
        가능합니다.
      </p>

      <div class="search-bar">
        <div class="search-input">
          <i class="bi bi-search search-icon"></i>
          <input type="text" placeholder="강의이름 검색" />
        </div>
      </div>
    </div>

    <div class="course-list">
      <div v-for="course in state.courses" :key="course.id" class="course-card">
        <div class="course-header">
          <div class="course-info">
            <span class="course-number">{{
              String(course.id).padStart(2, "0")
            }}</span>
            <span class="course-title">{{ course.title }}</span>
            <span class="course-divider">|</span>
            <span class="course-code">{{ course.courseCode }}</span>
          </div>
          <div class="course-actions">
            <button v-if="course.isCompleted" class="btn btn-secondary">
              <i class="bi bi-pen me-1"></i>
              강의 평가 완료
            </button>
            <button v-else class="btn btn-danger">
              <i class="bi bi-pen me-1"></i>
              강의 평가
            </button>
          </div>
        </div>

        <div v-if="course.isCompleted" class="grade-stats">
          <div class="stat-item">
            <span class="stat-label">점수</span>
            <span class="stat-value">{{ course.score }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">평점</span>
            <span class="stat-value grade">{{ course.grade }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">출석</span>
            <span class="stat-value">{{ course.attendance }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">출석률</span>
            <span class="stat-value">{{ course.attendanceRate }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">지각+결석</span>
            <span class="stat-value">{{ course.lateCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">과제</span>
            <span class="stat-value">{{ course.assignments }}</span>
          </div>
        </div>

        <div v-else class="warning-message">
          <i class="bi bi-exclamation-triangle text-danger me-2"></i>
          <span class="text-danger"
            >강의 평가 미완료로 성적 조회가 제한됩니다. 평가를 먼저 완료해
            주세요.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e8e8;
}

.header-card h1 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.header-card p {
  color: #666;
  font-size: 13px;
  margin: 0 0 16px 0;
}

.search-bar {
  margin-top: 16px;
}

.search-input {
  position: relative;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 14px;
  z-index: 1;
}

.search-input input {
  width: 100%;
  padding: 10px 12px 10px 35px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  outline: none;
  background: white;
  box-sizing: border-box;
}

.search-input input::placeholder {
  color: #999;
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.course-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 8px 8px 0 0;
}

.course-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.course-number {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.course-title {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.course-divider {
  color: #999;
  font-size: 14px;
}

.course-code {
  color: #666;
  font-size: 14px;
}

.btn {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.grade-stats {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: #f8f9fa;
  gap: 40px;
  border-radius: 0 0 8px 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.stat-value.grade {
  color: #007bff;
}

.warning-message {
  padding: 16px 20px;
  background: #fff3cd;
  display: flex;
  align-items: center;
  font-size: 13px;
}

.text-danger {
  color: #dc3545 !important;
}

.me-1 {
  margin-right: 0.25rem;
}

.me-2 {
  margin-right: 0.5rem;
}
</style>
