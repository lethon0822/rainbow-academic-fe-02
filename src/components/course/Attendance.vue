<!-- AttendanceView.vue -->
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import WhiteBox from "@/components/common/WhiteBox.vue";

const router = useRouter();

/* 상단 컨트롤 */
const attendDate = ref(new Date().toISOString().slice(0, 10));
const search = ref("");
const filter = ref("전체");            // 전체/출석/결석/지각/병가/경조사
const allChecked = ref(false);
const isLoading = ref(false);

/* 전달 데이터 */
const state = reactive({
  data: [],        // [{ enrollmentId, loginId, userName, gradeYear, departmentName, semester, status, note, checked }]
  courseId: ""
});

/* 상태 옵션 */
const statusOptions = [
  { value: "출석", label: "출석" },
  { value: "지각", label: "지각" },
  { value: "결석", label: "결석" },
  { value: "병가", label: "병가" },
  { value: "경조사", label: "경조사" }
];

/* 상태 → 배지 메타 */
const statusMeta = (st) => {
  switch (st) {
    case "출석":   return { label: "출석",   cls: "success", icon: "✅" };
    case "결석":   return { label: "결석",   cls: "danger",  icon: "⛔" };
    case "지각":   return { label: "지각",   cls: "warning", icon: "⚠️" };
    case "병가":   return { label: "병가",   cls: "info",    icon: "🩺" };
    case "경조사": return { label: "경조사", cls: "neutral", icon: "🎗️" };
    default:       return { label: st || "미지정", cls: "neutral", icon: "•" };
  }
};

/* 초기화 */
onMounted(() => {
  const passJson = history.state?.data;
  const passid = history.state?.id;

  if (passJson) {
    const nana = JSON.parse(passJson);
    state.data = nana.map((s) => ({
      ...s,
      status: s.status ?? "결석",
      note: s.note ?? "",
      checked: false
    }));
  }
  if (passid) state.courseId = JSON.parse(passid);
});

/* 필터/검색 */
const filtered = computed(() => {
  const kw = search.value.trim();
  return state.data.filter((s) => {
    const okSearch =
      !kw ||
      String(s.userName ?? "").includes(kw) ||
      String(s.loginId ?? "").includes(kw);
    const okFilter = filter.value === "전체" || s.status === filter.value;
    return okSearch && okFilter;
  });
});

/* 전체선택 토글 */
const toggleAll = () => filtered.value.forEach((s) => (s.checked = allChecked.value));

/* 저장 */
const saveAttendance = async () => {
  if (!attendDate.value) {
    alert("출결일자를 선택해주세요.");
    return;
  }
  isLoading.value = true;
  try {
    for (const s of state.data) {
      const payload = {
        attendDate: attendDate.value,
        enrollmentId: s.enrollmentId,
        status: s.status,
        note: s.note
      };
      const { data: exists } = await axios.post("/professor/course/check/exist", payload);
      if (exists === 0) await axios.post("/professor/course/check", payload);
      else await axios.put("/professor/course/check", payload);
    }
    alert("출결 저장 완료!");
    await router.push("/professor/attendance");
  } catch (e) {
    console.error("출결 저장 중 오류:", e);
    alert("출결 저장 중 오류가 발생했습니다.");
  } finally {
    isLoading.value = false;
  }
};

/* CSV 내보내기 (UTF-8 BOM) */
const exportCsv = () => {
  const header = ["학번","이름","학년","학과","출결상태","비고","학기","일자"];
  const rows = state.data.map((s) => [
    s.loginId ?? "",
    s.userName ?? "",
    s.gradeYear ?? s.grade ?? "",
    s.departmentName ?? "",
    s.status ?? "",
    s.note ?? "",
    s.semester ?? "",
    attendDate.value
  ]);

  const csvContent = "\uFEFF" + [header, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `attendance_${state.courseId}_${attendDate.value}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<template>
  <WhiteBox title="출결 관리" class="full-width">
    <div class="att-wrap">
      <h3 class="page-subtitle">컴퓨터 과학개론 출석부</h3>

      <!-- 툴바 -->
      <div class="toolbar">
        <div class="left">
          <label class="chk-all">
            <input type="checkbox" v-model="allChecked" @change="toggleAll" />
            <span>전체선택</span>
          </label>
          <button class="btn btn-light" @click="exportCsv">내보내기</button>
          <div class="date">
            <input type="date" v-model="attendDate" />
          </div>
        </div>

        <div class="right">
          <input
            v-model="search"
            class="search"
            type="text"
            placeholder="이름 또는 학번 검색"
            aria-label="검색"
          />
          <select v-model="filter" class="filter">
            <option value="전체">상태/전체</option>
            <option value="출석">출석</option>
            <option value="결석">결석</option>
            <option value="지각">지각</option>
            <option value="병가">병가</option>
            <option value="경조사">경조사</option>
          </select>
          <button class="btn btn-primary" :disabled="isLoading" @click="saveAttendance">
            {{ isLoading ? "저장 중..." : "저장" }}
          </button>
        </div>
      </div>

      <!-- 표 -->
      <div class="table-scroll">
        <table class="tbl">
          <thead>
            <tr>
              <th style="width:40px">
                <input type="checkbox" v-model="allChecked" @change="toggleAll" />
              </th>
              <th style="width:30px">학번</th>
              <th style="width:30px">이름</th>
              <th style="width:30px">학년</th>
              <th style="width:50px">학과</th>
              <th style="width:50px">출결상태</th>
              <th style="width:90px">비고(사유)</th>
              <th style="width:100px">학기</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="s in filtered" :key="s.enrollmentId">
              <td><input type="checkbox" v-model="s.checked" /></td>
              <td>{{ s.loginId }}</td>
              <td>{{ s.userName }}</td>
              <td>{{ s.gradeYear ?? s.grade }}</td>
              <td class="left-cell">{{ s.departmentName }}</td>

              <!-- 배지 -->
              <td>
                <span :class="['att-badge', statusMeta(s.status).cls]">
                  <span class="i">{{ statusMeta(s.status).icon }}</span>
                  {{ statusMeta(s.status).label }}
                </span>
              </td>

              <!-- 비고(사유) -->
              <td>
                <input
                  v-model="s.note"
                  class="note"
                  :placeholder="['결석','지각','병가','경조사'].includes(s.status) ? '사유 입력' : ''"
                  :disabled="!['결석','지각','병가','경조사'].includes(s.status)"
                />
              </td>

              <!-- 학기(라디오 버튼: 출석/지각/결석/병가/경조사) -->
              <td>
                <div class="radio-group">
                  <label v-for="o in statusOptions" :key="o.value" class="radio-label">
                    <input
                      type="radio"
                      :name="`status-${s.enrollmentId}`"
                      :value="o.value"
                      v-model="s.status"
                    />
                    {{ o.label }}
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </WhiteBox>
</template>

<style scoped lang="scss">
.full-width { width: 100%; max-width: none; }

.att-wrap { padding-top: 6px; }
.page-subtitle { color:#0d5c3e; font-weight:800; margin-bottom: 12px; }

/* 툴바 */
.toolbar {
  display:flex; align-items:center; justify-content:space-between;
  gap:12px; margin-bottom:12px;
}
.left, .right { display:flex; align-items:center; gap:8px; }
.chk-all { display:flex; align-items:center; gap:6px; font-weight:600; }
.date input { height:34px; padding:0 10px; border:1px solid #cbd5e1; border-radius:6px; }
.search {
  width:240px; height:34px; padding:0 12px; border:1px solid #cbd5e1; border-radius:6px;
}
.filter {
  height:34px; padding:0 10px; border:1px solid #cbd5e1; border-radius:6px;
}
.btn { height:34px; padding:0 12px; border-radius:6px; border:0; cursor:pointer; font-weight:600; }
.btn-light { background:#eaf2ee; color:#0d5c3e; }
.btn-primary { background:#1e90ff; color:#fff; }

/* 표 */
.table-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; }
.tbl {
  min-width: 1100px; width:100%;
  border-collapse: separate; border-spacing: 0;
  border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;
}
.tbl thead th {
  background:#0d5c3e; color:#fff; font-weight:700; height:40px; padding:0 8px; text-align:center;
  box-shadow: inset 0 -1px #0b4b32, inset -1px 0 #0b4b32;
}
.tbl thead th:last-child { box-shadow: inset 0 -1px #0b4b32; }
.tbl tbody td {
  background:#fff; padding:6px 8px; text-align:center; color:#111827;
  box-shadow: inset 0 1px #e5e7eb, inset -1px 0 #e5e7eb;
}
.tbl tbody td.left-cell { text-align:left; }

/* 입력 */
.status, .note {
  width:100%; height:30px; border:1px solid #cbd5e1; border-radius:6px; padding:0 8px;
}
.note:disabled { background:#f8fafc; color:#94a3b8; }
.status:focus, .note:focus, .search:focus, .filter:focus, .date input:focus {
  outline:none; border-color:#1e90ff; box-shadow:0 0 0 3px rgba(30,144,255,.12);
}

/* 라디오 그룹(학기) */
.radio-group {
  display:flex; 
  align-items:center;  
  justify-content:flex-start;
  gap: 16px;
  width: fit-content;
  margin: 0 auto;
}
.radio-label {
  display:flex; 
  align-items:center; 
  gap:4px; 
  font-size:13px; 
  white-space:nowrap;
}
.radio-label input { 
  width:14px; 
  height:14px; 
  cursor:pointer; 
}

/* 배지 — Bootstrap .badge 와 충돌 안 나게 격리 */
.att-badge {
  display:inline-flex; align-items:center; gap:8px;

  /* ▶ 크기 조절 포인트 */
  height: 32px;          /* 원하면 36/40 등으로 변경 */
  padding: 0 16px;       /* 좌우 여백 */
  border-radius: 999px;
  font-size: 14px;       /* 텍스트 크기 */
  font-weight: 700;
  line-height: 32px;     /* height와 동일 */

  border:1px solid transparent; user-select:none;
}
.att-badge .i { font-size:16px; line-height:1; }

/* 상태별 색상 */
.att-badge.success { background:#ecfdf5; color:#065f46; border-color:#a7f3d0; }
.att-badge.danger  { background:#fef2f2; color:#991b1b; border-color:#fecaca; }
.att-badge.warning { background:#fff7ed; color:#9a3412; border-color:#fed7aa; }
.att-badge.info    { background:#304868; color:#1e3a8a; border-color:#bfdbfe; }
.att-badge.neutral { background:#f3f4f6; color:#374151; border-color:#e5e7eb; }

/* 반응형 */
@media (max-width: 1280px) { .search { width:200px; } }
</style>
