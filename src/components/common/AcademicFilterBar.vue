<script setup>
import { reactive } from "vue";
const emit = defineEmits(["search"]);

const props = defineProps({
  semester: String,
  enrollment: Boolean,
});

let today = new Date();
let year = today.getFullYear();

const filters = reactive({
  year: year,
  grade: "",
  semester: props.semester || "",
});

const gradeOptions = [
  { value: "", label: "전체" },
  { value: "1", label: "1학년" },
  { value: "2", label: "2학년" },
  { value: "3", label: "3학년" },
  { value: "4", label: "4학년" },
];

const emitSearch = () => {
  emit("search", {
    year: filters.year,
    grade: filters.grade,
    semester: filters.semester,
  });
};

const selectGrade = (grade) => {
  filters.grade = grade;
  emitSearch();
};

const onSemesterChange = () => {
  emitSearch();
};

const onSearch = () => {
  if (filters.year < year - 5) {
    filters.year = year - 5;
  }
  emitSearch();
};
</script>

<template>
  <div class="filter-bar">
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

    <!-- 학기 선택 -->
    <div class="filter-group">
      <label>학기</label>
      <select
        v-model="filters.semester"
        class="select-input"
        :disabled="props.semester"
        @change="onSemesterChange"
      >
        <template v-if="props.semester">
          <option :value="props.semester">{{ props.semester }}학기</option>
        </template>
        <template v-else>
          <option value="">전체</option>
          <option value="1">1학기</option>
          <option value="2">2학기</option>
        </template>
      </select>
    </div>
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
  margin-left: 50px;
  margin-right: 50px;
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

.select-input,
.number-input,
.text-input {
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
}

.select-input:focus,
.number-input:focus,
.text-input:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.1);
}

.select-input:hover,
.number-input:hover,
.text-input:hover {
  border-color: #cbd5e1;
}

.select-input {
  min-width: 80px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
}

.select-input.wide {
  min-width: 120px;
}
</style>
