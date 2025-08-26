<script setup>
import { ref, watch, computed } from 'vue';
import { getSchedulesByMonth } from '@/services/scheduleService';
import { ymd } from '@/services/date';

const props = defineProps({
  date: { type: Date, required: true },        // 현재 달 기준
  selectedYmd: { type: String, default: '' },  // 달력에서 클릭한 날짜(필터)
});

const emit = defineEmits(['add-click', 'edit-click']);

const items = ref([]);

const monthKey = computed(() => ({
  year: props.date.getFullYear(),
  month: props.date.getMonth() + 1,
}));

const fetchMonth = async () => {
  const { data } = await getSchedulesByMonth(monthKey.value.year, monthKey.value.month);
  items.value = data;
};

watch(monthKey, fetchMonth, { immediate: true });

const filtered = computed(() => {
  if (!props.selectedYmd) return items.value;
  const d = new Date(props.selectedYmd);
  return items.value.filter(it => new Date(it.startDate) <= d && d <= new Date(it.endDate));
});

</script>

<template>
  <div class="panel">
    <div class="hdr">
      <div class="title">학사일정 목록</div>
      <button class="add" @click="$emit('add-click')">+ 일정 추가</button>
    </div>
    <ul class="list" v-if="filtered.length">
      <li v-for="it in filtered" :key="it.id" class="card" @click="$emit('edit-click', it)">
        <div class="row1">
          <span class="badge" :class="'t-'+it.scheduleType">{{ it.scheduleType }}</span>
          <span class="semester">학기 ID: {{ it.semesterId }}</span>
        </div>
        <div class="row2">{{ it.startDate }} ~ {{ it.endDate }}</div>
      </li>
    </ul>
    <div class="empty" v-else>선택한 날짜에 등록된 일정이 없어요.</div>
  </div>
</template>

<style scoped>
.panel{border-radius:20px;background:#fff;width:360px;min-height:480px;box-shadow:0 0 10px rgba(0,0,0,.08)}
.hdr{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid #f1f1f1}
.title{font-weight:700}
.add{background:#3BBEFF;border:none;color:#fff;border-radius:20px;padding:8px 12px;cursor:pointer;font-weight:700}
.list{list-style:none;margin:0;padding:12px 16px 20px;display:flex;flex-direction:column;gap:10px;max-height:420px;overflow:auto}
.card{background:#f9f9ff;border:1px solid #eef0ff;border-radius:14px;padding:12px 14px;cursor:pointer}
.card:hover{background:#f2f8ff}
.row1{display:flex;gap:8px;align-items:center;margin-bottom:6px}
.badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#e7f6ff;color:#248ad8;font-weight:700;font-size:12px}
.semester{color:#888;font-size:12px}
.row2{color:#555;font-size:13px}
.empty{padding:40px 18px;color:#777}
</style>