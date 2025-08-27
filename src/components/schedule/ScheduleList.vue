<script setup>
import { ref, watch, computed } from 'vue';
import { getSchedulesByMonth } from '@/services/scheduleService';
import { TYPE_ORDER, TYPE_META } from '@/constants/scheduleTypes';

const props = defineProps({
  date: { type: Date, required: true },        // 현재 달 기준
  selectedYmd: { type: String, default: '' },  // 달력에서 클릭한 날짜(필터)
  selectedTypes: { type: Array, default: () => [] }, // ✅ 타입 필터
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

// 날짜 + 타입 필터 적용
const baseFiltered = computed(() => {
  let arr = items.value;
  if (props.selectedYmd) {
    const d = new Date(props.selectedYmd);
    arr = arr.filter(it => new Date(it.startDate) <= d && d <= new Date(it.endDate));
  }
  if (props.selectedTypes.length) {
    arr = arr.filter(it => props.selectedTypes.includes(it.scheduleType));
  }
  return arr;
});

// 타입별 그룹핑
const groups = computed(() => {
  const map = {};
  TYPE_ORDER.forEach(t => (map[t] = []));
  baseFiltered.value.forEach(it => {
    (map[it.scheduleType] ||= []).push(it);
  });
  return map;
});
</script>

<template>
  <div class="panel">
    <div class="hdr">
      <div class="title">학사일정 목록</div>
      <button class="add" @click="$emit('add-click')">+ 일정 추가</button>
    </div>

    <div class="groups">
      <template v-for="t in TYPE_ORDER" :key="t">
        <div v-if="groups[t] && groups[t].length" class="group">
          <div class="g-title">
            <i class="g-dot" :style="{ background: TYPE_META[t]?.color }"></i>{{ t }}
          </div>
          <ul class="list">
            <li v-for="it in groups[t]" :key="it.id" class="card" @click="$emit('edit-click', it)">
              <div class="row1">
                <span
                  class="badge"
                  :style="{ background: TYPE_META[it.scheduleType]?.color || '#e7f6ff', color: '#fff' }"
                >{{ it.scheduleType }}</span>
                <!-- 학기 ID 노출 제거 -->
              </div>
              <div class="row2">{{ it.startDate }} ~ {{ it.endDate }}</div>
            </li>
          </ul>
        </div>
      </template>

      <div v-if="!baseFiltered.length" class="empty">선택한 조건에 해당하는 일정이 없습니다.</div>
    </div>
  </div>
</template>

<style scoped>
.panel{border-radius:20px;background:#fff;width:380px;min-height:480px;box-shadow:0 0 10px rgba(0,0,0,.08)}
.hdr{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid #f1f1f1}
.title{font-weight:700}
.add{background:#3BBEFF;border:none;color:#fff;border-radius:20px;padding:8px 12px;cursor:pointer;font-weight:700}

.groups{max-height:520px;overflow:auto;padding:12px 16px 18px}
.group{margin-bottom:12px}
.g-title{display:flex;align-items:center;gap:8px;font-weight:700;margin:6px 0}
.g-dot{width:10px;height:10px;border-radius:50%}

.list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.card{background:#f9f9ff;border:1px solid #eef0ff;border-radius:14px;padding:12px 14px;cursor:pointer}
.card:hover{background:#f2f8ff}
.row1{display:flex;gap:8px;align-items:center;margin-bottom:6px}
.badge{display:inline-block;padding:4px 10px;border-radius:999px;font-weight:700;font-size:12px}
.row2{color:#555;font-size:13px}
.empty{padding:30px 12px;color:#777}
</style>