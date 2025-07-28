<script setup>
import { reactive, watch } from "vue";
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
  type: "",
  departmentName: "",
  grade: "",
  semester: "",
  keyword: "",
});

filters.year = year;

const onSearch = () => {
  if (filters.year < year - 5) {
    filters.year = year - 5;
  }
  emit("search", { ...filters });
};

watch(() => filters.type, (newVal) => {
  filters.departmentName = newVal === "교양" ? "교양학부" : "";
});
</script>

<template>
  <div class="filter-bar">
    <label>연도:</label>
    <template v-if="enroll">
      <input type="number" v-model="filters.year" class="year" disabled />
    </template>
    <template v-else>
      <input type="number" :min="year - 5" :max="year" step="1" v-model="filters.year" />
    </template>

    <label>학기:</label>
    <select v-model="filters.semester" class="short">
      <option value="">전체</option>
      <template v-if="props.semester">
        <option :value="props.semester">{{ props.semester }}학기</option>
      </template>
      <template v-else>
        <option value="1">1학기</option>
        <option value="2">2학기</option>
      </template>
    </select>

    <div v-if="props.state">
      <label>이수구분:</label>
      <select v-model="filters.type" class="short">
        <option value="">전체</option>
        <option value="전공">전공</option>
        <option value="교양">교양</option>
      </select>

      <label>학과:</label>
      <select v-model="filters.departmentName" :disabled="filters.type === '교양'" class="department">
        <option value="">전체</option>
        <option v-for="d in props.departments" :key="d.departmentName" :value="d.departmentName">
          {{ d.departmentName }}
        </option>
      </select>

      <label>학년:</label>
      <select v-model="filters.grade" class="short">
        <option value="">전체</option>
        <option value="1">1학년</option>
        <option value="2">2학년</option>
        <option value="3">3학년</option>
        <option value="4">4학년</option>
      </select>

      <label>교과목명:</label>
      <input type="text" v-model="filters.keyword" placeholder="교과목명을 입력하세요." />
    </div>

    <button @click="onSearch">조회</button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: 8px;
  border: 2px solid #ccc;
  padding: 8px 12px;
  border-radius: 6px;
}

.filter-bar label {
  display: inline-block;
  text-align: right;
  font-size: 20px;
  white-space: nowrap;
  min-width: max-content;
  margin-right: 5px;
}

.filter-bar select,
.filter-bar input {
  width: 130px;
  margin-right: 10px;
  padding: 4px 8px;
  font-size: 18px;
  box-sizing: border-box;
}

.filter-bar input[type="text"] {
  width: 300px;
}

.filter-bar select.short {
  width: 80px;
}

.filter-bar select.department {
  width: 190px !important;
}

.year {
  width: 80px !important;
  background-color: white;
  border: 1px solid #333;
}

.filter-bar button {
  margin-left: auto;
  padding: 10px 16px;
  background-color: #2962ff;
  color: white;
  border: none;
  border-radius: 4px;
  white-space: nowrap;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  opacity: 1;
  background-color: #e2e2e2;
}

select:disabled {
  color: #000;
  background-color: #fff;
  border: 1px solid #333;
}
</style>
