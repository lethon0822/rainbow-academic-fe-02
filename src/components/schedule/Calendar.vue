<script setup>
import { ref, watch, onMounted } from "vue";
import { fmt2, ymd } from "@/services/date";
import { getSchedulesByMonth } from "@/services/scheduleService";
import { expandDates } from "@/services/date";

// ✅ 아이콘: src/assets 에 있다면 이렇게 import 해서 사용
import Icon from "@/assets/free-icon-arrow.png";

const model = defineModel("selectedDate", {
  type: Date,
  default: () => new Date(),
});
const emit = defineEmits(["month-loaded", "date-click"]);

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
const year = ref(model.value.getFullYear());
const month = ref(model.value.getMonth() + 1);
const matrix = ref([]);
const markedSet = ref(new Set()); // 일정이 있는 날짜들(YYYY-MM-DD)

const build = () => {
  const first = new Date(year.value, month.value - 1, 1);
  const startIdx = first.getDay();
  const lastDay = new Date(year.value, month.value, 0).getDate();

  const rows = [];
  let day = 1;
  for (let r = 0; r < 6; r++) {
    const row = [];
    for (let c = 0; c < 7; c++) {
      if (r === 0 && c < startIdx) row.push("");
      else if (day <= lastDay) row.push(day++);
      else row.push("");
    }
    rows.push(row);
    if (day > lastDay) break;
  }
  matrix.value = rows;
};

const fetchMonthMarks = async () => {
  const { data } = await getSchedulesByMonth(year.value, month.value);
  const set = new Set();
  data.forEach((it) =>
    expandDates(it.startDate, it.endDate).forEach((d) => set.add(d))
  );
  markedSet.value = set;
  emit("month-loaded", data);
};

const prev = () => {
  month.value === 1 ? ((month.value = 12), year.value--) : month.value--;
  sync();
};
const next = () => {
  month.value === 12 ? ((month.value = 1), year.value++) : month.value++;
  sync();
};
const sync = () => {
  build();
  fetchMonthMarks();
};

const isToday = (d) => {
  const t = new Date();
  return (
    d &&
    t.getFullYear() === year.value &&
    t.getMonth() + 1 === month.value &&
    t.getDate() === d
  );
};
const isMarked = (d) =>
  d && markedSet.value.has(`${year.value}-${fmt2(month.value)}-${fmt2(d)}`);

const pick = (d) => {
  if (!d) return;
  const sel = new Date(`${year.value}-${fmt2(month.value)}-${fmt2(d)}`);
  model.value = sel;
  emit("date-click", sel);
};

onMounted(() => {
  sync();
});
watch([year, month], build);
</script>

<template>
  <div class="calendar">
    <h3 class="cal-title">
      <a href="#" @click.prevent="prev"
        ><img :src="Icon" alt="prev" class="rot"
      /></a>
      <b>{{ year }}</b
      >년 <b>{{ month }}</b
      >월
      <a href="#" @click.prevent="next"><img :src="Icon" alt="next" /></a>
    </h3>
    <table class="tbl">
      <thead>
        <tr>
          <td v-for="d in dayNames" :key="d">
            <b>{{ d }}</b>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, ri) in matrix" :key="ri">
          <td
            v-for="(d, ci) in row"
            :key="ci"
            class="day"
            :class="{ sun: ci === 0, today: isToday(d) }"
            @click="pick(d)"
          >
            <span class="num" :class="{ mark: isMarked(d) }">{{ d }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="legend"><span class="dot"></span> 오늘</div>
  </div>
</template>

<style scoped>
.calendar {
  border-radius: 20px;
  border: #dedede 1px solid;
  margin-top: 10px;
  width: 640px;
  background: #fff;
  padding: 35px 45px 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.cal-title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  gap: 6px;
}
.cal-title img {
  width: 25px;
}
.rot {
  transform: rotate(180deg);
}
.tbl {
  width: 100%;
  font-size: 20px;
  border-collapse: collapse;
  margin-top: 10px;
}
.tbl td {
  height: 70px;
  text-align: center;
}
.day {
  cursor: pointer;
}
.num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  margin: auto;
  font-weight: 700;
}
.mark {
  background: #bfeaff;
}
.today {
  color: steelblue;
}
.sun {
  color: tomato;
}
.legend {
  margin-top: 6px;
  font-size: 12px;
  color: #777;
  display: flex;
  gap: 6px;
  align-items: center;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: green;
  display: inline-block;
}
</style>

<script setup></script>

<template></template>

<style scoped></style>
