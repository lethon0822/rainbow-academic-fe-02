<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/account'
// API
import { getNextSemesterId } from '@/services/semesterService'
import { getScheduleFor } from '@/services/scheduleService'
import { createApplication, fetchMyApplications, cancelApplication } from '@/services/Application'

// ===== Pinia =====
const userStore = useUserStore()
const { semesterId } = storeToRefs(userStore)

// (있다면 사용, 없으면 하이픈 표시)
const studentNumber = computed(() => userStore.studentNumber ?? userStore.loginId ?? '-')
const deptName = computed(() => userStore.deptName ?? userStore.state.deptName ?? '-')

// ===== 상단 폼 상태 =====
const appType = ref('LEAVE')                 // 'LEAVE' | 'RETURN'  (휴/복학 토글)
const reason = ref('')                       // 간단 사유
const nextSemId = ref(null)
const schedule = ref(null)                   // { scheduleId, startDate, endDate }
const loadingSchedule = ref(false)
const submitting = ref(false)

// 영어→DB 한글 타입 맵핑 (DB: '휴학신청' | '복학신청')
const typeKo = (t) => (t === 'LEAVE' ? '휴학신청' : '복학신청')

// schedule에서 날짜 필드 이름이 다를 수 있으니 안전하게 꺼내는 헬퍼
const getDate = (obj, key) => {
  if (!obj) return ''
  return (obj[key] ?? obj[`${key}_datetime`] ?? obj[`${key}Date`] ?? '')
    ?.toString()
    ?.slice(0, 10)
}

// 다음 학기의 해당 스케줄 조회
async function resolveNextSchedule() {
  if (!semesterId.value) return
  loadingSchedule.value = true
  try {
    nextSemId.value = await getNextSemesterId(Number(semesterId.value))
    if (!nextSemId.value) {
      schedule.value = null
      return
    }
    // 백엔드가 '휴학신청/복학신청'을 기대하므로 변환해서 전달
    schedule.value = await getScheduleFor({ semesterId: nextSemId.value, type: typeKo(appType.value) })
  } finally {
    loadingSchedule.value = false
  }
}

watch([semesterId, appType], resolveNextSchedule, { immediate: true })

const canSubmit = computed(() => !!(schedule.value && schedule.value.scheduleId) && !submitting.value)

// 신청
async function submit() {
  if (!canSubmit.value) return
  submitting.value = true
  try {
    await createApplication({
      scheduleId: schedule.value.scheduleId,
      reason: reason.value?.trim() || null
    })
    alert('신청이 접수되었습니다.')
    reason.value = ''
    await loadList()
  } catch (e) {
    alert(e?.response?.data?.message ?? '신청 중 오류가 발생했습니다.')
  } finally {
    submitting.value = false
  }
}

// ===== 하단 목록 =====
const rows = ref([])
const statusFilter = ref('') // '' | '처리중' | '승인' | '거부'
const listLoading = ref(false)

async function loadList() {
  listLoading.value = true
  try {
    const { data } = await fetchMyApplications(statusFilter.value ? { status: statusFilter.value } : undefined)
    rows.value = data ?? []
  } finally {
    listLoading.value = false
  }
}
onMounted(loadList)

async function onCancel(appId) {
  if (!confirm('신청을 취소하시겠습니까?')) return
  try {
    await cancelApplication(appId)
    await loadList()
  } catch (e) {
    alert(e?.response?.data?.message ?? '취소 중 오류가 발생했습니다.')
  }
}

// 라벨/뱃지/날짜 포맷
const shortType = (scheduleType) => (scheduleType === '휴학신청' ? '휴학' : scheduleType === '복학신청' ? '복학' : scheduleType)
const formatDate = (v) => (v ? v.toString().slice(0, 10) : '-')
const statusClass = (s) => ({
  'badge pending': s === '처리중',
  'badge ok': s === '승인',
  'badge reject': s === '거부'
})
</script>

<template>
  <div class="white-box">
    <h2 class="page-title">휴·복학 신청</h2>
    <p class="desc">신청서를 작성한 후, [제출] 버튼을 눌러주세요. 제출이 완료되면 아래에 신청 내역이 조회 됩니다.</p>

    <div class="form-grid">
      <label>학번</label>
      <input :value="studentNumber" readonly>

      <label>학과</label>
      <input :value="deptName" readonly>

      <label>신청 구분</label>
      <div class="toggle">
        <button type="button" :class="{ on: appType === 'LEAVE' }" @click="appType = 'LEAVE'">휴학</button>
        <button type="button" :class="{ on: appType === 'RETURN' }" @click="appType = 'RETURN'">복학</button>
      </div>

      <label>시작일</label>
      <div class="inline">
        <input :value="getDate(schedule, 'startDate')" readonly>
        <span class="muted" v-if="loadingSchedule">불러오는 중…</span>
      </div>

      <label>종료일 (휴학인 경우)</label>
      <div class="inline">
        <input :value="getDate(schedule, 'endDate')" readonly>
      </div>

      <label>상세 사유</label>
      <textarea v-model="reason" rows="3" placeholder="구체적인 사유를 입력하세요"></textarea>
    </div>

    <div class="actions">
      <button class="primary" :disabled="!canSubmit" @click="submit">신청 제출</button>
    </div>
  </div>

  <!-- 목록 -->
  <div class="white-box">
    <div class="list-head">
      <div class="filter">
        <select v-model="statusFilter" @change="loadList">
          <option value="">상태/전체</option>
          <option value="처리중">처리중</option>
          <option value="승인">승인</option>
          <option value="거부">거부</option>
        </select>
      </div>
      <button class="ghost" @click="loadList">조회</button>
    </div>

    <div class="table-wrap" :class="{ loading: listLoading }">
      <table class="grid">
        <thead>
          <tr>
            <th>학년도</th>
            <th>학기</th>
            <th>신청구분</th>
            <th>변동 사유</th>
            <th>학과</th>
            <th>신청일자</th>
            <th>접수일자</th>
            <th>접수여부</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td colspan="9" class="empty">조회된 내역이 없습니다.</td>
          </tr>
          <tr v-for="r in rows" :key="r.appId">
            <td>{{ r.year }}</td>
            <td>{{ r.semester === '1' ? '1학기' : '2학기' }}</td>
            <td>{{ shortType(r.scheduleType) }}</td>
            <td>{{ r.reason || '-' }}</td>
            <!-- 변경: 행에서 내려온 학과명 사용 -->
            <td>{{ r.deptName || '-' }}</td>
            <td>{{ formatDate(r.submittedAt) }}</td>
            <!-- 현재 스키마에 received_at이 없으므로 submittedAt 재사용 -->
            <td>{{ formatDate(r.submittedAt) }}</td>
            <td><span :class="statusClass(r.status)">{{ r.status }}</span></td>
            <td>
              <button v-if="r.status === '처리중'" class="danger ghost" @click="onCancel(r.appId)">취소하기</button>
              <span v-else class="muted">처리완료</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.page-title{font-size:22px;font-weight:800;margin:4px 0 8px}
.desc{color:#666;margin:0 0 18px}

.white-box{
  background:#fff; padding:24px; margin:16px 0; border-radius:12px;
  box-shadow:0 2px 12px rgba(0,0,0,.06)
}

/* ===== 폼 ===== */
.form-grid{
  display:grid;
  grid-template-columns: 100px minmax(200px, 1fr);
  gap:12px 16px;
  align-items:center;
}
.form-grid input, .form-grid textarea, .form-grid select{
  width:100%; box-sizing:border-box;
  border:1px solid #e5e7eb; border-radius:10px; padding:10px 12px; font-size:14px;
  background:#fff; outline:none;
}
.form-grid input:read-only{background:#f9fafb}
.form-grid textarea{resize:vertical}
.inline{display:flex; align-items:center; gap:8px}
.muted{color:#9ca3af; font-size:12px}

.toggle{display:flex; gap:8px}
.toggle button{
  border:1px solid #e5e7eb; background:#f3f4f6; padding:8px 14px; border-radius:10px; cursor:pointer
}
.toggle button.on{background:#3BBEFF; border-color:#3BBEFF; color:#fff}

/* ===== 액션 ===== */
.actions{display:flex; justify-content:center; margin-top:16px}
button.primary{background:#3BBEFF; border:none; color:#fff; padding:10px 18px; border-radius:10px; cursor:pointer; font-weight:700}
button.primary:disabled{opacity:.6; cursor:not-allowed}
button.ghost{background:#f3f4f6; border:none; padding:8px 14px; border-radius:10px; cursor:pointer}
button.danger{border:1px solid #ef4444; color:#ef4444; background:#fff; border-radius:10px; padding:6px 10px}

/* ===== 목록 ===== */
.list-head{display:flex; justify-content:flex-end; gap:10px; margin-bottom:12px}
.table-wrap.loading{opacity:.6; pointer-events:none}
table.grid{width:100%; border-collapse:collapse}
.grid th, .grid td{border-top:1px solid #eee; padding:10px 8px; text-align:center; font-size:14px}
.grid thead th{background:#fafafa; font-weight:700}
.grid .empty{padding:28px 0; color:#888}

/* 상태 뱃지 */
.badge{display:inline-block; padding:4px 8px; border-radius:999px; font-size:12px; font-weight:700}
.badge.pending{background:#f3f4f6; color:#6b7280}
.badge.ok{background:#e7f7ec; color:#15803d}
.badge.reject{background:#fee2e2; color:#b91c1c}
</style>
