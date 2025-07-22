<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['search']);

const props = defineProps({ //학과와 연도만 받아오고 나머지는 하드코딩임. 
  state: Boolean,
  departments: Array,
  years: Array});

const filters = reactive({ 
  year: '',
  type: '',
  departmentName: '',
  grade: '',
  semester: '',
  keyword: '',
});

function onSearch() {
  emit('search', { ...filters });
}
</script>

<template>
  <div class="filter-bar">
    <label>연도:</label>
    <select v-model="filters.type">
      <option value="">전체</option>
      <option>2025</option>
      <option>교양</option>
    </select>

    <label>학기:</label>
    <select v-model="filters.semester">
      <option value="">전체</option>
      <option value="1">1학기</option>
      <option value="2">2학기</option>
    </select>

    <div v-if="props.state">
      <label>이수구분:</label>
      <select v-model="filters.type">
        <option value="">전체</option>
        <option value="전공">전공</option>
        <option value="교양">교양</option>

      </select>

      <label>학과:</label>
      <select v-model="filters.department">
        <option value="">전체</option>
        <option value="컴퓨터공학과">컴퓨터공학과</option>
        <option value="경영학과">경영학과</option>
      </select>

      <label>학년:</label>
      <select v-model="filters.grade">
        <option value="">전체</option>
        <option value="1">1학년</option>
        <option value="2">2학년</option>
        <option value="2">3학년</option>
        <option value="2">4학년</option>
      </select>

      <label>교과목명:</label>
      <input
        type="text"
        v-model="filters.keyword"
        placeholder="교과목명을 입력하세요."
      />
    </div>

    <button @click="onSearch">조회</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["search"]);

const props = defineProps({
  state: Boolean,
});

const filters = reactive({
  type: "",
  department: "",
  grade: "",
  semester: "",
  keyword: "",
});

function onSearch() {
  emit("search", { ...filters });
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid #ccc;
  padding: 2px 10px;
  border-radius: 6px;
}
.filter-bar label {
  font-size: 20px;
}
.filter-bar select,
.filter-bar input {
  padding: 4px 8px;
  font-size: 16px;
}
.filter-bar button {
  padding: 12px 18px;
  background-color: #2962ff;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
