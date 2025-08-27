<!-- EnrollmentGradeView.vue -->
<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import axios from "axios";

/** 가중치 (필요 시 조정) */
const W = { att: 0.10, mid: 0.30, fin: 0.40, etc: 0.20 };

const st = reactive({
  q: "",
  allChecked: false,
  courseId: "",
  rows: [],
  loading: true,
  error: ""
});


const isSaving = ref(false);

/** 숫자 보정 */
const toNum = v => Number.isFinite(+v) ? +v : 0;
const clip100 = v => Math.min(100, Math.max(0, toNum(v)));

/** 자동계산: 출결평가·중간·기말·기타 → 총점/등급/평점 */
const calc = (r) => {
  r.attendanceEval = clip100(r.attendanceEval);
  r.midterm        = clip100(r.midterm);
  r.finalExam      = clip100(r.finalExam);
  r.etcScore       = clip100(r.etcScore);

  const total =
    r.attendanceEval * W.att +
    r.midterm        * W.mid +
    r.finalExam      * W.fin +
    r.etcScore       * W.etc;

  r.total = total; // 0~100
  r.grade = total >= 95 ? "A+" :
            total >= 90 ? "A"  :
            total >= 85 ? "B+" :
            total >= 80 ? "B"  :
            total >= 75 ? "C+" :
            total >= 70 ? "C"  :
            total >= 60 ? "D"  : "F";
  r.gpa   = { "A+":4.5, A:4.0, "B+":3.5, B:3.0, "C+":2.5, C:2.0, D:1.0, F:0 }[r.grade];
};

onMounted(async () => {
  try {
    const passId   = history.state?.id;
    const passJson = history.state?.data;
    if (passId) st.courseId = JSON.parse(passId);

    // 1) history.state.data 우선
    if (passJson) {
      const base = JSON.parse(passJson);
      st.rows = base.map(x => ({
        ...x,
        attendanceDays: x.attendanceDays ?? 0,
        absence:        x.absence ?? 0,
        attendanceEval: x.attendanceEval ?? 0,
        midterm:        x.midterm ?? 0,
        finalExam:      x.finalExam ?? 0,
        etcScore:       x.etcScore ?? x.assignment ?? 0,
        total: 0, grade: "", gpa: 0,
        checked: false
      }));
    }

    // 2) API 조회
    if (st.courseId) {
      try {
        const { data } = await axios.get(`/api/professor/course/grade/students?courseId=${st.courseId}`);
        if (Array.isArray(data)) {
          st.rows = data.map(x => ({
            ...x,
            attendanceDays: x.attendanceDays ?? 0,
            absence:        x.absence ?? 0,
            attendanceEval: x.attendanceEval ?? 0,
            midterm:        x.midterm ?? 0,
            finalExam:      x.finalExam ?? 0,
            etcScore:       x.etcScore ?? x.assignment ?? 0,
            total: 0, grade: "", gpa: 0,
            checked: false
          }));
          console.log("학생 데이터 로드됨:", st.rows); 
        }
      } catch (err) {
        console.error("학생 목록 API 오류:", err);
      }
    }

    // 초기 계산
    st.rows.forEach(calc);
  } catch (e) {
    st.error = "학생 목록을 불러오지 못했습니다.";
    console.error(e);
  } finally {
    st.loading = false;
  }
});

/** 검색 */
const filtered = computed(() => {
  const kw = st.q.trim();
  if (!kw) return st.rows;
  return st.rows.filter(r =>
    String(r.loginId ?? "").includes(kw) ||
    String(r.userName ?? "").includes(kw)
  );
});

/** 전체선택 */
const toggleAll = () => filtered.value.forEach(r => (r.checked = st.allChecked));

/* =========================================
    성적 저장 (선택된 학생만)
   ========================================= */
async function saveSelected() {
  const selected = st.rows.filter(r => r.checked);
  if (selected.length === 0) {
    alert("수정할 학생을 선택하세요.");
    return;
  }

  isSaving.value = true;

  try {
    const toPost = [];
    const toPut = [];

    for (const r of selected) {
      const midScore = Math.round(Number(r.midterm) ?? 0);
      const finScore = Math.round(Number(r.finalExam) ?? 0);
      const rank     = r.grade ?? "F";

      if (r.scoreId) {
        toPut.push({ scoreId: r.scoreId, midScore, finScore, rank });
      } else {
        toPost.push({ enrollmentId: r.enrollmentId, midScore, finScore, rank });
      }
    }

    if (toPost.length) {
      await axios.post("/api/professor/course/grade", toPost);
    }
    if (toPut.length) {
      await axios.put("/api/professor/course/grade", toPut);
    }

    alert("선택한 학생 성적이 저장되었습니다!");
  } catch (err) {
    console.error("[성적 저장 실패]", err?.response?.status, err?.response?.data);
    alert(`성적 저장 중 오류: ${err?.response?.data?.message ?? ""}`);
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="wrap">
    <div class="box">
      <h1 class="page-title">성적 관리</h1>
      <h3 class="subtitle">컴퓨터 과학개론 성적 입력 및 정정</h3>

      <!-- 툴바 -->
      <div class="toolbar">
        <div class="left">
          <button class="btn btn-light"
                  @click="st.allChecked=!st.allChecked; toggleAll()">
            전체선택
          </button>
        </div>
        <div class="right">
          <div class="search">
            <span class="icon">🔍</span>
            <input v-model="st.q" placeholder="이름 또는 학번 검색" />
          </div>
          <button class="btn btn-primary" :disabled="isSaving" @click="saveSelected">
            {{ isSaving ? "저장 중..." : "선택 저장" }}
          </button>
        </div>
      </div>

      <!-- 상태 -->
      <div v-if="st.loading" class="state">불러오는 중…</div>
      <div v-else-if="st.error" class="state error">{{ st.error }}</div>

      <!-- 테이블 -->
      <div v-else class="table-scroll">
        <table class="tbl" v-if="filtered.length">
          <thead>
            <tr>
              <th style="width:44px">
                <input type="checkbox" v-model="st.allChecked" @change="toggleAll" />
              </th>
              <th style="width:100px">학번</th>
              <th style="width:90px">이름</th>
              <th style="width:80px">학년</th>
              <th style="width:160px">학과</th>
              <th style="width:92px">출석일수</th>
              <th style="width:92px">결석일수</th>
              <th style="width:92px">출결평가</th>
              <th style="width:92px">중간평가</th>
              <th style="width:92px">기말평가</th>
              <th style="width:92px">기타평가</th>
              <th style="width:80px">원점수</th>
              <th style="width:86px">환산점수</th>
              <th style="width:70px">등급</th>
              <th style="width:70px">평점</th>
              <th style="width:76px">수정</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="r in filtered" :key="r.enrollmentId">
              <td><input type="checkbox" v-model="r.checked" /></td>
              <td>{{ r.loginId }}</td>
              <td>{{ r.userName }}</td>
              <td>{{ r.gradeYear }}</td> <!-- 학년 -->
              <td class="left-cell">{{ r.departmentName }}</td>
              <td><input class="num" type="number" min="0" v-model.number="r.attendanceDays" /></td>
              <td><input class="num" type="number" min="0" v-model.number="r.absence" /></td>
              <td><input class="num" type="number" min="0" max="100" v-model.number="r.attendanceEval" @input="calc(r)" /></td>
              <td><input class="num" type="number" min="0" max="100" v-model.number="r.midterm" @input="calc(r)" /></td>
              <td><input class="num" type="number" min="0" max="100" v-model.number="r.finalExam" @input="calc(r)" /></td>
              <td><input class="num" type="number" min="0" max="100" v-model.number="r.etcScore" @input="calc(r)" /></td>
              <td>{{ r.total.toFixed(1) }}</td>
              <td>{{ r.total.toFixed(1) }}</td>
              <td>{{ r.grade }}</td> <!-- 성적 등급 -->
              <td>{{ r.gpa.toFixed(1) }}</td>
              <td><button class="btn btn-gray w-full">수정</button></td>
            </tr>
          </tbody>
        </table>
        <div v-else class="state">표시할 학생이 없습니다.</div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* 레이아웃/타이틀 */
.wrap { background:#f6f7f8; min-height:100vh; padding:20px; }
.box  { background:#fff; border:1px solid #e5e7eb; border-radius:10px; padding:24px; width:100%; max-width:none; margin:0 auto; }
.page-title { font-size:28px; font-weight:800; color:#1f2937; margin:0 0 20px; }
.subtitle   { color:#0d5c3e;  font-weight:800; margin:0 0 12px; }

/* 툴바 */
.toolbar { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:10px; }
.left, .right { display:flex; align-items:center; gap:8px; }
.search { position:relative; height:34px; }
.search .icon { position:absolute; left:10px; top:50%; transform:translateY(-50%); font-size:14px; opacity:.6; pointer-events:none; }
.search input { width:260px; height:34px; padding:0 12px 0 30px; border:1px solid #cbd5e1; border-radius:6px; }

/* 버튼 */
.btn { height:34px; padding:0 12px; border-radius:6px; border:0; cursor:pointer; font-weight:600; }
.btn-light  { background:#eaf2ee; color:#0d5c3e; }
.btn-primary{ background:#1e90ff; color:#fff; }
.btn-green  { background:#0d5c3e; color:#fff; }
.btn-gray   { background:#e5e7eb; color:#111827; }
.w-full { width:100%; }

/* 테이블 */
.table-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; }
.tbl {
  min-width: 1400px;
  width:100%;
  border-collapse:collapse; table-layout:fixed;
  border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;
}
.tbl thead th {
  background:#0d5c3e; color:#fff; font-weight:700; height:40px;
  padding:0 8px; border-right:1px solid #0b4b32; text-align:center;
}
.tbl thead th:last-child { border-right:0; }
.tbl tbody td { border-top:1px solid #e5e7eb; padding:6px 8px; text-align:center; color:#111827; }
.tbl tbody td.left-cell { text-align:left; }

/* 숫자 입력 */
.num {
  width:72px; height:30px; text-align:center;
  border:1px solid #cbd5e1; border-radius:6px; outline:none;
}
.num:focus { border-color:#1e90ff; box-shadow:0 0 0 3px rgba(30,144,255,.12); }

/* 상태/보더 */
.tbl { border-collapse: separate !important; border-spacing: 0 !important; }
.tbl thead th, .tbl tbody td { border: 0 !important; }
.tbl thead th {
  background: #0d5c3e;
  color: #fff;
  box-shadow: inset 0 -1px #0b4b32, inset -1px 0 #0b4b32;
}
.tbl thead th:last-child { box-shadow: inset 0 -1px #0b4b32; }
.tbl tbody td {
  background: #fff;
  box-shadow: inset 0 1px #e5e7eb, inset -1px 0 #e5e7eb;
}
.tbl tbody td:last-child { box-shadow: inset 0 1px #e5e7eb; }

/* 포커스 outline 제거 */
.tbl thead input[type="checkbox"]:focus,
.tbl thead button:focus { outline: none !important; box-shadow: none !important; }
.state { padding:18px; color:#475569; }
.state.error { color:#b91c1c; }
</style>
