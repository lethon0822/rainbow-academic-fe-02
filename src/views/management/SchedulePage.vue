<script setup>
import { ref } from 'vue';
import Calendar from '@/components/schedule/Calendar.vue';
import ScheduleList from '@/components/schedule/ScheduleList.vue';
import ScheduleModal from '@/components/schedule/ScheduleModal.vue';
import { ymd } from '@/utils/date';

const selectedDate = ref(new Date());
const selectedYmd = ref(ymd(selectedDate.value));
const modalOpen = ref(false);
const editItem = ref(null);

// 백엔드 정책상 semesterId가 필요 → 로그인/설정에서 가져오거나, 임시 고정
const DEFAULT_SEMESTER_ID = 12;

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

// 목록/달력 재조회는 자식 컴포넌트들이 각각 처리(모달 saved 이벤트 시 강제 리프레시가 필요하면
// 간단히 key 바꿔 재마운트하거나, Pinia로 공통 reload flag를 둬도 됩니다)
</script>

<template>
  <div class="wrap">
    <div class="left">
      <Calendar v-model:selectedDate="selectedDate"
                @date-click="onDateClick" />
    </div>
    <div class="right">
      <ScheduleList :date="selectedDate"
                    :selected-ymd="selectedYmd"
                    @add-click="openCreate"
                    @edit-click="openEdit" />
    </div>

    <ScheduleModal v-model="modalOpen"
                   :edit-item="editItem"
                   :picked-date="selectedYmd"
                   :default-semester-id="DEFAULT_SEMESTER_ID"
                   @saved="onDateClick(selectedDate)" />
  </div>
</template>

<style scoped>
.wrap{display:flex;gap:40px;margin:20px 0}
.left{margin-left:20px}
.right{margin-top:10px;display:flex;flex-direction:column;align-items:flex-end}
</style>