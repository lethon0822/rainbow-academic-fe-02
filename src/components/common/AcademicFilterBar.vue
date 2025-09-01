<script setup>
import { reactive } from "vue";
const emit = defineEmits(["search"]);

const props = defineProps({
  state: Boolean,
  departments: Array,
  semester: String,
  enrollment: Boolean,
});

let today = new Date();
let year = today.getFullYear();
let enroll = props.enrollment;

const filters = reactive({
  year: "",
  grade: "",
});

filters.year = year;

const gradeOptions = [
  { value: "", label: "전체" },
  { value: "1", label: "1학년" },
  { value: "2", label: "2학년" },
  { value: "3", label: "3학년" },
  { value: "4", label: "4학년" },
];

const selectGrade = (grade) => {
  filters.grade = grade;
  emit("search", { year: filters.year, grade: filters.grade });
};

const onSearch = () => {
  if (filters.year < year - 5) {
    filters.year = year - 5;
  }
  emit("search", { year: filters.year, grade: filters.grade });
};
</script>

<template>
  <div class="filter-bar">
    <!-- 연도 -->
    <div class="filter-group">
      <label>연도</label>
      <template v-if="enroll">
        <div class="number-input-wrapper">
          <input
            type="number"
            v-model="filters.year"
            class="number-input"
            disabled
            readonly
          />
        </div>
      </template>

      <template v-else>
        <div class="number-input-wrapper">
          <input
            type="number"
            :min="year - 5"
            :max="year"
            step="1"
            v-model="filters.year"
            class="number-input"
            readonly
          />
          <div class="spinner-buttons">
            <button
              type="button"
              class="spinner-btn spinner-up"
              @click="filters.year = Math.min(filters.year + 1, year)"
            >
              ▲
            </button>
            <button
              type="button"
              class="spinner-btn spinner-down"
              @click="filters.year = Math.max(filters.year - 1, year - 5)"
            >
              ▼
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- 학년 버튼들 -->
    <div class="grade-buttons">
      <button
        v-for="option in gradeOptions"
        :key="option.value"
        @click="selectGrade(option.value)"
        :class="['grade-btn', { active: filters.grade === option.value }]"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- 조회 버튼 -->
    <button @click="onSearch" class="btn btn-success">조회</button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 6px 29px;
  background-color: #fff;
  border-radius: 8px;
  border: 0.2px solid #74747480;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  margin-left: 75px;
  margin-right: 73px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.filter-bar label {
  font-size: 15px;
  font-weight: bold;
  color: #2d3748;
  min-width: max-content;
}

.number-input-wrapper {
  position: relative;
  display: inline-block;
}

.number-input {
  width: 90px;
  height: 36px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #2d3748;
  outline: none;
  transition: all 0.2s ease;
  appearance: none;
  text-align: center;
  padding-right: 30px;
}

.number-input:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.1);
}

.number-input:hover {
  border-color: #cbd5e1;
}

.number-input:disabled {
  background-color: #f7fafc;
  color: #a0aec0;
  cursor: not-allowed;
  border-color: #e2e8f0;
}

.spinner-buttons {
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  height: 30px;
}

.spinner-btn {
  width: 18px;
  height: 15px;
  border: none;
  background-color: #fff;
  color: #718096;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  line-height: 1;
  padding: 0;
  margin: 0;
  border-radius: 3px;
  transition: all 0.15s ease;
}

.spinner-btn:hover {
  background-color: #edf2f7;
  color: #4a5568;
}

.spinner-btn:active {
  background-color: #e2e8f0;
}

.spinner-up {
  border-bottom: 1px solid #e2e8f0;
  border-radius: 3px 3px 0 0;
}

.spinner-down {
  border-radius: 0 0 3px 3px;
}

/* 기본 스피너 숨기기 */
.number-input::-webkit-inner-spin-button,
.number-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-input[type="number"] {
  -moz-appearance: textfield;
}

.grade-buttons {
  display: flex;
  gap: 8px;
}

.grade-btn {
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.grade-btn:hover {
  border-color: #22c55e;
  background-color: #f0fdf4;
}

.grade-btn.active {
  background-color: #22c55e;
  border-color: #22c55e;
  color: white;
  font-weight: 500;
}

.grade-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

.btn {
  height: 36px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-success {
  background-color: #22c55e;
  color: white;
}

.btn-success:hover {
  background-color: #16a34a;
}

.btn-success:active {
  background-color: #15803d;
}
</style>
