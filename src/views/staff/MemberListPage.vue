<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import WhiteBox from '@/components/common/WhiteBox.vue'
import { getMemberList } from '@/services/memberService'
import { deptGet } from '@/services/DeptManageService'

const depts = ref([
  { id: '', name: '전체' },
  // { id: 10, name: '컴퓨터공학과' } ... 실제 옵션으로 교체
])
const deptLoading = ref(false)

async function loadDepts() {
  deptLoading.value = true
  try {
    const raw = await deptGet()
    // ① 배열이 직접 오나? ② data가 배열? ③ list가 배열?
    const arr =
      Array.isArray(raw)      ? raw
      : Array.isArray(raw?.data) ? raw.data
      : Array.isArray(raw?.list) ? raw.list
      : []

    if (!Array.isArray(arr)) throw new Error('Invalid department response')

    const mapped = arr.map(d => ({
      id: d.deptId ?? d.id,
      name: d.deptName ?? d.name
    }))

    depts.value = [{ id: '', name: '전체' }].concat(
      mapped
        .filter(d => d.id != null && d.name)
        .sort((a, b) => String(a.name).localeCompare(String(b.name), 'ko'))
    )
  } catch (e) {
    console.error('학과 로딩 실패', e, '(응답=', await Promise.resolve(deptGet()).catch(() => 'N/A'), ')')
  } finally {
    deptLoading.value = false
  }
}
const STUDENT_STATUS = [
  { value: '', label: '상태: 전체' },
  { value: '재학', label: '재학' },
  { value: '휴학', label: '휴학' },
  { value: '졸업', label: '졸업' },
  // 필요 시 { value: '제적', label: '제적' } 등 추가
]
const PROFESSOR_STATUS = [
  { value: '', label: '상태: 전체' },
  { value: '재직', label: '재직' },
  { value: '휴직', label: '휴직' },
  { value: '퇴직', label: '퇴직' },
]

const role = ref('student')
const loading = ref(false)
const error = ref('')
const rows = ref([])

/* ✅ 필터 상태 */
const filters = reactive({
  deptId: '',
  status: '',      // 재학/휴학/졸업 등
  grade: '',       // 학생 전용: 1~4
  keyword: '',
  searchBy: 'all', // all | name | loginId | email
  gender:'',
})

const isStudent = computed(() => role.value === 'student')
const roleLabel = computed(() => (isStudent.value ? '학생' : '교수'))
const statusOptions = computed(() => (isStudent.value ? STUDENT_STATUS : PROFESSOR_STATUS))

async function load() {
  loading.value = true
  error.value = ''
  try {
    const roleParam = role.value === 'student' ? 'student' : 'professor'

    const params = {
      userRole: roleParam,
      deptId: filters.deptId !== '' ? Number(filters.deptId) : undefined,
      status: filters.status || undefined,
      grade: isStudent.value && filters.grade ? Number(filters.grade) : undefined,
      gender: filters.gender || undefined,
      q: filters.keyword || undefined,
      searchBy: filters.searchBy !== 'all' ? filters.searchBy : undefined,
    }

    const res = await getMemberList(params)
    rows.value = Array.isArray(res) ? res : []
  } catch (e) {
    console.error(e)
    error.value = '목록을 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
}
function setRole(r) {
  if (role.value === r) return
  role.value = r
  // 역할 바뀌면 서로 다른 필터 초기화
  filters.gender = ''
  filters.grade = ''
  filters.status = ''
}
function clearQ(){ filters.keyword = '' }

watch([role, () => filters.deptId, () => filters.status, () => filters.gender, () => filters.grade], load)
onMounted(async () => {
  await loadDepts()
  await load()
})
</script>

<template>
  <WhiteBox title="구성원 관리" :bodyPadding="'0'">
    <template #header>
      <div class="filters">
        <!-- 상단 탭 -->
        <div class="chips">
          <button class="chip" :class="{ on: role === 'student' }" @click="setRole('student')">학생</button>
          <button class="chip" :class="{ on: role === 'professor' }" @click="setRole('professor')">교수</button>
        </div>

        <div class="right">
          <!-- 학과 -->
          <select v-model="filters.deptId" class="inp w150">
            <option :value="d.id" v-for="d in depts" :key="d.id">{{ d.name }}</option>
          </select>

          <!-- 상태(공통) -->
          <select v-model="filters.status" class="inp w120">
          <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
            </option>
            <!-- 필요 시 :disabled="opt.disabled" 같은 속성도 쓸 수 있어요 -->
          </select>

          <!-- ✅ 역할에 따라 토글되는 드롭다운 -->
          <select v-if="isStudent" v-model="filters.grade" class="inp w120">
            <option value="">학년: 전체</option>
            <option v-for="n in 4" :key="n" :value="n">{{ n }}학년</option>
          </select>
          <!-- 성별은 학생/교수 공통으로 노출 -->
          <select v-model="filters.gender" class="inp w100">
            <option value="">성별: 전체</option>
            <option value="M">남</option>
            <option value="F">여</option>
          </select>

          <!-- 검색 대상 + 검색어 -->
          <div class="search-group">
            <select v-model="filters.searchBy" class="inp w120">
              <option value="all">전체</option>
              <option value="name">이름</option>
              <option value="loginId">아이디</option>
              <option value="email">이메일</option>
            </select>
            <input
              v-model="filters.keyword"
              type="text"
              class="inp w240"
              :placeholder="isStudent ? '이름 또는 학번 검색' : '이름 또는 아이디 검색'"
              @keyup.enter="load"
            />
            <button class="ghost" v-if="filters.keyword" @click="clearQ">지움</button>
          </div>

          <button class="primary" @click="load">조회</button>
        </div>
      </div>
    </template>

    <!-- 본문 표 (기존과 동일) -->
    <div class="table-wrap">
      <div v-if="loading" class="center dim">불러오는 중…</div>
      <div v-else-if="error" class="center err">{{ error }}</div>

      <table v-else class="tbl">
        <thead>
          <tr>
            <th style="width:140px">아이디</th>
            <th style="width:140px">이름</th>
            <th>학과</th>
            <th style="width:140px">{{ roleLabel }} 정보</th>
            <th style="width:240px">이메일</th>
            <th style="width:140px">전화</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="`${r.loginId}-${r.username}`">
            <td>{{ r.loginId }}</td>
            <td>{{ r.username }}</td>
            <td>{{ r.deptName }}</td>
            <td v-if="isStudent">
              <span v-if="r.grade">{{ r.grade }}학년</span>
              <span v-if="r.status" class="muted"> / {{ r.status }}</span>
            </td>
            <td v-else>
              <span>{{ r.status || '-' }}</span>
            </td>
            <td class="muted ellipsis">{{ r.email }}</td>
            <td class="muted">{{ r.phone }}</td>
            <td class="muted ellipsis">{{ r.address }}</td>
          </tr>
          <tr v-if="!rows.length">
            <td colspan="7" class="center dim">결과가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </WhiteBox>
</template>

<style scoped>
.table-wrap{
  /* ✅ 화이트박스 안에서만 스크롤 */
  overflow: auto;

  /* 화면 높이에서 상단 필터/여백을 뺀 나머지 만큼만 높이 부여
     필요하면 220px 값을 화면에 맞게 조절하세요 */
  max-height: calc(100vh - 220px);

  /* 스크롤 영역이 줄어들 때 테이블이 깨지지 않도록 */
  min-height: 0;
}

/* thead는 이미 sticky라서 스크롤해도 상단에 고정됨 */
.filters{ display:flex; justify-content:space-between; align-items:center; gap:12px; }
.chips{ display:flex; gap:8px; }
.chip{
  all:unset; box-sizing:border-box; height:34px; min-width:76px; padding:0 14px;
  border:1px solid #E5E7EB; border-radius:999px; cursor:pointer;
  display:inline-flex; align-items:center; justify-content:center; font-weight:700; color:#111;
}
.chip.on{ background:#EAF6FF; border-color:#BFE7FF; }
.right{ display:flex; gap:8px; align-items:center; }
.inp{ height:34px; padding:0 10px; border:1px solid #E5E7EB; border-radius:8px; }
.w150{ width:150px } .w120{ width:120px } .w240{ width:240px }
.search-group{ display:flex; gap:6px; align-items:center; }
.primary{ background:#3BBEFF; color:#fff; border:none; border-radius:8px; height:34px; padding:0 12px; cursor:pointer; font-weight:700; }
.ghost{ background:#f5f5f5; border:none; border-radius:8px; height:34px; padding:0 10px; cursor:pointer; }
.table-wrap{ min-height:200px; padding-bottom: 16px; }
.tbl{ width:100%; border-collapse:separate; border-spacing:0; }
.tbl thead th{ text-align: center; vertical-align: middle; position: sticky; top: 0; z-index: 1; background:#f9fafb; padding:10px; border-top:1px solid #eee; border-bottom:1px solid #eee; }
.tbl tbody td{ text-align: center; vertical-align: middle; padding:10px; border-bottom:1px solid #f1f1f1; }
.center{ text-align:center; padding:28px 0; } .dim{ color:#666 } .err{ color:#e53935 } .muted{ color:#777 }
.ellipsis{ max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
</style>