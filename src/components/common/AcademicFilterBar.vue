<script setup>
import { reactive, watch } from "vue";

const emit = defineEmits(["search"]);

const filters = reactive({
  semester: "",
  grade: "",
});

const gradeOptions = [
  { value: "", label: "전체" },
  { value: "1", label: "1학년" },
  { value: "2", label: "2학년" },
  { value: "3", label: "3학년" },
  { value: "4", label: "4학년" },
];

const semesterOptions = [
  { semester: "", label: "전체" },
  { semester: "1", label: "1학기" },
  { semester: "2", label: "2학기" },
];

watch(
  () => filters.semester,
  () => {
    emitSearch();
  }
);

const selectGrade = (grade) => {
  filters.grade = grade;
  emitSearch();
};

const emitSearch = () => {
  const searchData = {
    semester: filters.semester === "" ? null : filters.semester,
    grade: filters.grade === "" ? null : filters.grade,
  };

  console.log("AcademicFilterBar에서 emit하는 데이터:", searchData);
  emit("search", searchData);
};
</script>

<template>
  <div class="filter-bar">
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

    <div class="filter-group">
      <label>학기</label>
      <select v-model="filters.semester" class="select-input">
        <option
          v-for="option in semesterOptions"
          :key="option.semester"
          :value="option.semester"
        >
          {{ option.label }}
        </option>
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

.select-input {
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
  min-width: 80px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  padding-right: 32px;
}

.select-input:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.1);
}

.select-input:hover {
  border-color: #cbd5e1;
}
</style>
