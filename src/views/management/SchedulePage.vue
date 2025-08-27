<script setup>
import { ref } from 'vue';
import Calendar from '@/components/schedule/Calendar.vue';
import ScheduleList from '@/components/schedule/ScheduleList.vue';
import ScheduleModal from '@/components/schedule/ScheduleModal.vue';
import { ymd } from '@/services/date';
import { TYPE_ORDER, TYPE_META } from '@/constants/scheduleTypes';

const selectedDate = ref(new Date());
const selectedYmd = ref(ymd(selectedDate.value));
const modalOpen = ref(false);
const editItem = ref(null);
const DEFAULT_SEMESTER_ID = 12;

// ✅ 타입 필터(초기값: 전체 선택)
const selectedTypes = ref([...TYPE_ORDER]);

const onDateClick = (d) => {
  selectedDate.value = d;
  selectedYmd.value = ymd(d);
};

const openCreate = () => {
  editItem.value = null;
  modalOpen.value = true;
};

const openEdit = (item) => {
  editItem.value = item;
  modalOpen.value = true;
};

const handleSaved = () => {
  // 필요한 경우 재조회 트리거
  onDateClick(selectedDate.value);
};

// 필터 칩 토글
const toggleType = (t) => {
  const i = selectedTypes.value.indexOf(t);
  if (i >= 0) selectedTypes.value.splice(i, 1);
  else selectedTypes.value.push(t);
};
const selectAll = () => { selectedTypes.value = [...TYPE_ORDER]; };
</script>

<template>
  <div class="wrap">
    <div class="left">
      <Calendar
        v-model:selectedDate="selectedDate"
        :selected-types="selectedTypes"
        @date-click="onDateClick"
      />
    </div>

    <div class="right">
      <!-- 타입 필터 칩 -->
      <div class="filters">
        <button
          v-for="t in TYPE_ORDER" :key="t"
          class="chip" :class="{ on: selectedTypes.includes(t) }"
          @click="toggleType(t)"
        >
          <i class="dot" :style="{ background: TYPE_META[t]?.color }"></i>{{ t }}
        </button>
        <button class="chip ghost" @click="selectAll">전체</button>
      </div>

      <ScheduleList
        :date="selectedDate"
        :selected-ymd="selectedYmd"
        :selected-types="selectedTypes"
        @add-click="openCreate"
        @edit-click="openEdit"
      />
    </div>

    <ScheduleModal
      v-model="modalOpen"
      :edit-item="editItem"
      :picked-date="selectedYmd"
      :default-semester-id="DEFAULT_SEMESTER_ID"
      @saved="handleSaved"
    />
  </div>
</template>

<style scoped>
/* 달력 640 + 목록 380 두 칼럼 */
.wrap{
  display:grid;
  grid-template-columns: 640px 380px;
  gap:32px; align-items:start; width:100%;
}

.filters{display:flex;gap:8px;justify-content:flex-end;margin-bottom:10px}
.chip{
  border:1px solid #ddd; background:#fff; padding:6px 10px; border-radius:999px;
  cursor:pointer; font-size:13px; display:inline-flex; align-items:center; gap:6px;
}
.chip.on{ border-color:#3BBEFF; background:#E7F6FF }
.chip.ghost{ background:#f5f5f5 }
.dot{ width:8px; height:8px; border-radius:50% }
</style>