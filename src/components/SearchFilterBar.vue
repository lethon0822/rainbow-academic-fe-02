<script setup>
import { reactive } from "vue";
const emit = defineEmits(["search"]);

const props = defineProps({
  //학과와 연도만 받아오고 나머지는 하드코딩임.
  state: Boolean,
  departments: Array,
  years: Array,
  semester: String,
});


const filters = reactive({
  year: '',
  type: '',
  departmentName: '',
  grade: '',
  semester: '',
  keyword: '',
});

const onSearch =()=>{
  emit('search', { ...filters });
}
</script>
<template>
  <div class="filter-bar">
    <label>연도:</label>
    <select v-model="filters.year">
      <option value="">전체</option>
      <option v-for="y in props.years" :key="y.year" :value="y.year">
        {{ y.year }}
      </option>
    </select>
    <label>학기:</label>
    <select v-model="filters.semester">
      <option value="">전체</option>

      <!-- props.semester가 있으면 (수강신청시 지정학기만 떠야되므로) 그 값만 보여줌 -->
      <template v-if="props.semester">
        <option :value="props.semester">{{ props.semester }}학기</option>
      </template>

      <!-- 없으면 기본 1학기/2학기 보여줌 -->
      <template v-else>
        <option value="1">1학기</option>
        <option value="2">2학기</option>
      </template>
    </select>
    <div v-if="props.state">
      <label>이수구분:</label>
      <select v-model="filters.type">
        <option value="">전체</option>
        <option value="전공">전공</option>
        <option value="교양">교양</option>
      </select>
      <label>학과:</label>
      <select v-model="filters.departmentName">
        <option value="">전체</option>
        <option
          v-for="d in props.departments"
          :key="d.departmentName"
          :value="d.departmentName"
        >
          {{ d.departmentName }}
        </option>
      </select>
      <label>학년:</label>
      <select v-model="filters.grade">
        <option value="">전체</option>
        <option value="1">1학년</option>
        <option value="2">2학년</option>
        <option value="3">3학년</option>
        <option value="4">4학년</option>
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
<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid #ccc;
  padding: 2px 10px;
  border-radius: 6px;
  min-width: 1350px;
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
  background-color: #2962FF;
  color: white;
  border: none;
  border-radius: 4px;
}
button {
  margin-left: auto;
}
</style>









