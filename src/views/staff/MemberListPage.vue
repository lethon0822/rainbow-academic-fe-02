<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { fetchMemberList } from '@/services/memberService';

// 필수 필터: role (백엔드 쿼리에서 AND u.user_role = #{userRole})
const role = ref('student');       // 기본값: 학생
const deptId = ref('');            // 선택 필터 (빈 값이면 미전송)
const loading = ref(false);
const error = ref('');
const rows = ref([]);

// 선택한 역할에 맞춰 표시할 컬럼 라벨
const roleLabel = computed(() => (role.value === 'student' ? '학생' : '교수'));

async function load() {
  loading.value = true;
  error.value = '';
  try {
    rows.value = await fetchMemberList({ role: role.value, deptId: deptId.value });
  } catch (e) {
    console.error(e);
    error.value = '목록을 불러오지 못했습니다.';
  } finally {
    loading.value = false;
  }
}

// 필터 변경 시 자동 조회
watch([role, deptId], load);

// 최초 1회
onMounted(load);

// UI 핸들러
function setRole(r) {
  if (role.value !== r) {
    role.value = r;
  }
}
function clearDept() {
  deptId.value = '';
}
</script>

<template>
  <div class="wrap">
    <!-- 필터 바 -->
    <div class="filters">
      <div class="chips">
        <button class="chip" :class="{ on: role === 'student' }" @click="setRole('student')">학생</button>
        <button class="chip" :class="{ on: role === 'professor' }" @click="setRole('professor')">교수</button>
      </div>

      <div class="right">
        <div class="dept-input">
          <input
            v-model="deptId"
            type="text"
            inputmode="numeric"
            placeholder="학과 ID (선택)"
            @keyup.enter="load"
          />
          <button class="ghost" v-if="deptId !== ''" @click="clearDept">지움</button>
        </div>
        <button class="primary" @click="load">조회</button>
      </div>
    </div>

    <!-- 카드 -->
    <div class="card">
      <div v-if="loading" class="center dim">불러오는 중…</div>
      <div v-else-if="error" class="center err">{{ error }}</div>
      <template v-else>
        <table class="tbl">
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

              <!-- 역할별 표시 -->
              <td v-if="role === 'student'">
                <span v-if="r.grade">{{ r.grade }}학년</span>
                <span v-if="r.status" class="muted"> / {{ r.status }}</span>
              </td>
              <td v-else>
                <span>{{ r.status || '-' }}</span>
              </td>

              <td class="muted">{{ r.email }}</td>
              <td class="muted">{{ r.phone }}</td>
              <td class="muted">{{ r.address }}</td>
            </tr>
            <tr v-if="!rows.length">
              <td colspan="7" class="center dim">결과가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<style scoped>
.wrap{ display:flex; flex-direction:column; gap:12px; }
.filters{ display:flex; justify-content:space-between; align-items:center; gap:12px; }
.chips{ display:flex; gap:8px; }
.chip{
  all:unset; box-sizing:border-box; height:34px; min-width:76px; padding:0 14px;
  border:1px solid #E5E7EB; border-radius:999px; cursor:pointer;
  display:inline-flex; align-items:center; justify-content:center; font-weight:700; color:#111;
}
.chip.on{ background:#EAF6FF; border-color:#BFE7FF; }
.right{ display:flex; gap:8px; align-items:center; }
.dept-input{ display:flex; gap:6px; align-items:center; }
.dept-input input{
  height:34px; width:160px; border:1px solid #E5E7EB; border-radius:8px; padding:0 10px; outline:none;
}
.primary{ background:#3BBEFF; color:#fff; border:none; border-radius:8px; height:34px; padding:0 12px; cursor:pointer; font-weight:700; }
.ghost{ background:#f5f5f5; border:none; border-radius:8px; height:34px; padding:0 10px; cursor:pointer; }

.card{ background:#fff; border:1px solid #eee; border-radius:14px; padding:10px; }
.tbl{ width:100%; border-collapse:separate; border-spacing:0; }
.tbl thead th{ background:#f9fafb; text-align:left; padding:10px; border-top:1px solid #eee; border-bottom:1px solid #eee; }
.tbl tbody td{ padding:10px; border-bottom:1px solid #f1f1f1; }
.center{ text-align:center; padding:28px 0; }
.dim{ color:#666; }
.err{ color:#e53935; }
.muted{ color:#777; }
</style>