<script>
import { gradeService } from "../services/HttpService";
import GradeTable from "./GradeTable.vue";

export default {
  name: "GradeInquiry",
  components: {
    GradeTable,
  },
  data() {
    return {
      studentId: "20241234", // 실제로는 로그인 정보에서 가져옴
      selectedSemester: "",
      allGrades: {},
      currentGrades: [],
      semesters: [],
    };
  },
  async mounted() {
    await this.loadAllGrades();
  },
  methods: {
    async loadAllGrades() {
      try {
        const response = await gradeService.getAllGrades(this.studentId);
        this.allGrades = response.data;
        this.semesters = Object.keys(this.allGrades).sort().reverse();
      } catch (error) {
        console.error("성적 조회 실패:", error);
      }
    },

    async loadGrades() {
      if (this.selectedSemester === "") {
        return;
      }

      try {
        const response = await gradeService.getGradesBySemester(
          this.studentId,
          this.selectedSemester
        );
        this.currentGrades = response.data;
      } catch (error) {
        console.error("학기별 성적 조회 실패:", error);
      }
    },
  },
};
</script>

<template>
  <div class="grade-inquiry">
    <h2>성적 조회</h2>

    <div class="semester-selector">
      <select v-model="selectedSemester" @change="loadGrades">
        <option value="">전체 학기</option>
        <option v-for="semester in semesters" :key="semester" :value="semester">
          {{ semester }}
        </option>
      </select>
    </div>

    <div v-if="selectedSemester === ''" class="all-grades">
      <div
        v-for="(grades, semester) in allGrades"
        :key="semester"
        class="semester-group"
      >
        <h3>{{ semester }}</h3>
        <grade-table :grades="grades" />
      </div>
    </div>

    <div v-else class="semester-grades">
      <grade-table :grades="currentGrades" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
