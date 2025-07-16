<script>
import { evaluationService, gradeService } from "../services/HttpService";

export default {
  name: "CourseEvaluation",
  data() {
    return {
      studentId: "20241234",
      currentSemester: "2024-2",
      selectedCourse: "",
      currentCourses: [],
      evaluation: {
        contentRating: 0,
        teachingRating: 0,
        difficultyRating: 0,
        comment: "",
      },
    };
  },
  computed: {
    isFormValid() {
      return (
        this.selectedCourse &&
        this.evaluation.contentRating > 0 &&
        this.evaluation.teachingRating > 0 &&
        this.evaluation.difficultyRating > 0
      );
    },
  },
  async mounted() {
    await this.loadCurrentCourses();
  },
  methods: {
    async loadCurrentCourses() {
      try {
        const response = await gradeService.getGradesBySemester(
          this.studentId,
          this.currentSemester
        );
        this.currentCourses = response.data;
      } catch (error) {
        console.error("현재 수강 과목 조회 실패:", error);
      }
    },

    async submitEvaluation() {
      try {
        const evaluationData = {
          courseId: this.selectedCourse.courseId,
          semester: this.currentSemester,
          contentRating: this.evaluation.contentRating,
          teachingRating: this.evaluation.teachingRating,
          difficultyRating: this.evaluation.difficultyRating,
          comment: this.evaluation.comment,
        };

        await evaluationService.submitEvaluation(
          this.studentId,
          evaluationData
        );
        alert("평가가 성공적으로 제출되었습니다.");
        this.resetForm();
      } catch (error) {
        alert(
          "평가 제출에 실패했습니다: " + error.response?.data || error.message
        );
      }
    },

    resetForm() {
      this.selectedCourse = "";
      this.evaluation = {
        contentRating: 0,
        teachingRating: 0,
        difficultyRating: 0,
        comment: "",
      };
    },
  },
};
</script>
<template>
  <div class="course-evaluation">
    <h2>강의 평가</h2>

    <form @submit.prevent="submitEvaluation">
      <div class="course-selector">
        <label>과목 선택:</label>
        <select v-model="selectedCourse" required>
          <option value="">과목을 선택하세요</option>
          <option
            v-for="course in currentCourses"
            :key="course.courseId"
            :value="course"
          >
            {{ course.courseName }} ({{ course.professor }})
          </option>
        </select>
      </div>

      <div v-if="selectedCourse" class="evaluation-form">
        <div class="rating-group">
          <label>강의 내용:</label>
          <div class="rating-buttons">
            <button
              v-for="n in 5"
              :key="n"
              type="button"
              :class="{ active: evaluation.contentRating === n }"
              @click="evaluation.contentRating = n"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <div class="rating-group">
          <label>강의 방식:</label>
          <div class="rating-buttons">
            <button
              v-for="n in 5"
              :key="n"
              type="button"
              :class="{ active: evaluation.teachingRating === n }"
              @click="evaluation.teachingRating = n"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <div class="rating-group">
          <label>난이도:</label>
          <div class="rating-buttons">
            <button
              v-for="n in 5"
              :key="n"
              type="button"
              :class="{ active: evaluation.difficultyRating === n }"
              @click="evaluation.difficultyRating = n"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <div class="comment-group">
          <label>추가 의견:</label>
          <textarea
            v-model="evaluation.comment"
            placeholder="강의에 대한 의견을 자유롭게 작성해주세요"
            maxlength="500"
          ></textarea>
        </div>

        <button type="submit" :disabled="!isFormValid">평가 제출</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
