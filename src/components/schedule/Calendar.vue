<script setup>
import { ref, watch, onMounted } from 'vue';
import { fmt2 } from '@/services/date';
import { getSchedulesByMonth } from '@/services/scheduleService';
import { expandDates } from '@/services/date';
import { TYPE_META } from '@/constants/scheduleTypes';

// 아이콘(좌/우 동일 이미지면 하나만 가져다 rotate)
import Icon from '@/assets/free-icon-arrow.png';

const props = defineProps({
  selectedTypes: { type: Array, default: () => [] }, // ✅ 타입 필터
});
const model = defineModel('selectedDate', { type: Date, default: () => new Date() });
const emit = defineEmits(['month-loaded', 'date-click']);

const dayNames = ['일','월','화','수','목','금','토'];
const year = ref(model.value.getFullYear());
const month = ref(model.value.getMonth() + 1);
const matrix = ref([]);

// ✅ 날짜별 타입 Set 저장 (YYYY-MM-DD => Set(types))
const marksByDate = ref(new Map());

const build = () => {
  const first = new Date(year.value, month.value - 1, 1);
  const startIdx = first.getDay();
  const lastDay = new Date(year.value, month.value, 0).getDate();

  const rows = [];
  let day = 1;
  for (let r=0;r<6;r++){
    const row = [];
    for(let c=0;c<7;c++){
      if (r===0 && c<startIdx) row.push('');
      else if (day<=lastDay) row.push(day++);
      else row.push('');
    }
    rows.push(row);
    if (day>lastDay) break;
  }
  matrix.value = rows;
};

const fetchMonthMarks = async () => {
  const { data } = await getSchedulesByMonth(year.value, month.value);
  const map = new Map();
  data.forEach(it => {
    // ✅ 타입 필터 반영
    if (props.selectedTypes.length && !props.selectedTypes.includes(it.scheduleType)) return;
    expandDates(it.startDate, it.endDate).forEach(d => {
      if (!map.has(d)) map.set(d, new Set());
      map.get(d).add(it.scheduleType);
    });
  });
  marksByDate.value = map;
  emit('month-loaded', data);
};

const prev = () => { month.value===1 ? (month.value=12, year.value--) : month.value--; sync(); };
const next = () => { month.value===12 ? (month.value=1, year.value++) : month.value++; sync(); };
const sync = () => { build(); fetchMonthMarks(); };

const isToday = (d) => {
  const t = new Date();
  return d && t.getFullYear()===year.value && t.getMonth()+1===month.value && t.getDate()===d;
};

// 해당 날짜의 타입 배열
const typesFor = (d) => {
  if (!d) return [];
  const key = `${year.value}-${fmt2(month.value)}-${fmt2(d)}`;
  return Array.from(marksByDate.value.get(key) || []);
};

const pick = (d) => {
  if (!d) return;
  const sel = new Date(`${year.value}-${fmt2(month.value)}-${fmt2(d)}`);
  model.value = sel;
  emit('date-click', sel);
};

onMounted(sync);
// 년/월은 달력 그리드만 다시 구성
watch([year, month], build);
// 타입 필터는 마킹만 다시 산출
watch(() => props.selectedTypes.slice(), fetchMonthMarks);
</script>

<template>
  <div class="calendar">
    <h3 class="cal-title">
      <a href="#" @click.prevent="prev"><img :src="Icon" alt="prev" class="rot" /></a>
      <b>{{ year }}</b>년 <b>{{ month }}</b>월
      <a href="#" @click.prevent="next"><img :src="Icon" alt="next" /></a>
    </h3>

    <table class="tbl">
      <thead><tr><td v-for="d in dayNames" :key="d"><b>{{ d }}</b></td></tr></thead>
      <tbody>
        <tr v-for="(row,ri) in matrix" :key="ri">
          <td v-for="(d,ci) in row" :key="ci"
              class="day" :class="{sun:ci===0, today:isToday(d)}"
              @click="pick(d)">
            <div class="num">{{ d }}</div>

            <!-- ✅ 타입 색 점 (최대 3개 표시 + 더보기 카운터) -->
            <div class="dots" v-if="typesFor(d).length">
              <i v-for="t in typesFor(d).slice(0,3)" :key="t" class="dot"
                 :style="{ background: (TYPE_META[t]?.color || '#bbb') }"/>
              <span v-if="typesFor(d).length>3" class="more">+{{ typesFor(d).length-3 }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 범례 -->
    <div class="legend">
      <span v-for="(meta,t) in TYPE_META" :key="t" class="leg">
        <i class="dot" :style="{background: meta.color}"></i>{{ t }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.calendar{border-radius:20px;border:#dedede 1px solid;margin-top:10px;width:640px;background:#fff;padding:35px 45px 25px;box-shadow:0 0 10px rgba(0,0,0,.1)}
.cal-title{display:flex;align-items:center;justify-content:center;color:#000;gap:6px}
.cal-title img{width:25px}
.rot{transform:rotate(180deg)}

.tbl{width:100%;font-size:20px;border-collapse:collapse;margin-top:10px}
.tbl td{height:70px;text-align:center;vertical-align:top}
.day{cursor:pointer;padding-top:8px}
.num{font-weight:700}
.today{color:steelblue}
.sun{color:tomato}

/* 타입 점 표시 */
.dots{margin-top:6px;display:flex;gap:4px;justify-content:center;align-items:center}
.dot{width:8px;height:8px;border-radius:50%}
.more{font-size:11px;color:#666}

/* 범례 */
.legend{margin-top:10px;font-size:12px;color:#666;display:flex;gap:12px;flex-wrap:wrap}
.leg{display:inline-flex;align-items:center;gap:6px}
</style>