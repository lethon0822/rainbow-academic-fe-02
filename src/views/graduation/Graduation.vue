<script setup>
import { reactive, ref } from "vue";
import { graduationDiagnoses } from "@/services/graduationService";

const isLoading = ref(false); // 로딩 상태
const isDone = ref(false); // 분석 완료 여부

const state = reactive({
  graduation: {
    majorRequiredCredits: 0,
    majorElectiveCredits: 0,
    generalRequiredCredits: 0,
    generalElectiveCredits: 0,
    shortageMajorRequiredCredits: 0,
    shortageMajorElectiveCredits: 0,
    shortageGeneralRequiredCredits: 0,
    shortageGeneralElectiveCredits: 0,
    totalCompletedCredits: 0,
    totalShortageCredits: 0,
    graduationResult: "",

    details:
      "본 자가진단은 시뮬레이션 이수 학점을 기준으로 졸업 요건 충족 여부를 판단합니다.\n" +
      "전공필수, 전공선택, 교양필수, 교양선택, 총이수학점을 기준으로 자동 계산됩니다.\n" +
      "※ 실제 졸업 승인 여부는 소속 학과 및 행정실 확인을 통해 최종 결정됩니다.",
  },
});

async function startSimulation() {
  isLoading.value = true;
  try {
    // 실제 호출 대신 2초 대기
    await new Promise(resolve => setTimeout(resolve, 700));
    const res = await graduationDiagnoses();
    console.log("res.data:", res.data);
    state.graduation = res.data;
    isDone.value = true;
  } catch (err) {
    console.error("시뮬레이션 오류:", err);
  } finally {
    isLoading.value = false;
  }
  
}
</script>

<template>
  <div class="graduation-check">
    <!-- 버튼 -->
    <div class="section-box header-box">
      <h2>졸업 자가진단</h2>
      <p class="desc">
        본인이 취득한 학점·교과목, 현재 학기 수강신청 현황 학점·교과목,
        부족학점 등 영역별 이수기준 및 졸업여부를 자가진단하여 졸업가능 여부를
        확인할 수 있는 프로그램입니다.
      </p>
      <button class="btn-green" @click="startSimulation" :disabled="isLoading">
  <span v-if="isLoading" class="loader"></span>
  {{ isLoading ? "분석중..." : isDone ? "분석완료" : "시뮬레이션 시작" }}
</button>

    </div>

    <!-- 졸업 요건 현황 -->
    <div class="section-box">
      <h3 class="section-title">졸업 요건 현황</h3>

      <!-- 카드 4개 -->
      <div class="grid-4">
        <!-- 전공필수 -->
        <div class="stat-card">
          <p class="stat-label">전공필수</p>
          <div class="progress">
            <div
              class="progress-bar"
              :style="{
                width: isDone
                  ? (state.graduation.majorRequiredCredits / 36) * 100 + '%'
                  : '0%',
              }"
            ></div>
          </div>
          <div class="stat-row">
            <p class="stat-desc">
              {{ isDone ? state.graduation.majorRequiredCredits : "ㅡ" }} /
              {{ isDone ? 36 : "ㅡ" }}
            </p>
            <p
              class="status"
              :class="{
                ok: isDone && state.graduation.shortageMajorRequiredCredits === 0,
                danger: isDone && state.graduation.shortageMajorRequiredCredits > 0,
                pending: !isDone,
              }"
            >
              {{
                isDone
                  ? state.graduation.shortageMajorRequiredCredits > 0
                    ? state.graduation.shortageMajorRequiredCredits + "학점 부족"
                    : "달성 완료"
                  : "분석 전"
              }}
            </p>
          </div>
        </div>

        <!-- 전공선택 -->
        <div class="stat-card">
          <p class="stat-label">전공선택</p>
          <div class="progress">
            <div
              class="progress-bar"
              :style="{
                width: isDone
                  ? (state.graduation.majorElectiveCredits / 34) * 100 + '%'
                  : '0%',
              }"
            ></div>
          </div>
          <div class="stat-row">
            <p class="stat-desc">
              {{ isDone ? state.graduation.majorElectiveCredits : "ㅡ" }} /
              {{ isDone ? 34 : "ㅡ" }}
            </p>
            <p
              class="status"
              :class="{
                ok: isDone && state.graduation.shortageMajorElectiveCredits === 0,
                danger: isDone && state.graduation.shortageMajorElectiveCredits > 0,
                pending: !isDone,
              }"
            >
              {{
                isDone
                  ? state.graduation.shortageMajorElectiveCredits > 0
                    ? state.graduation.shortageMajorElectiveCredits + "학점 부족"
                    : "달성 완료"
                  : "분석 전"
              }}
            </p>
          </div>
        </div>

        <!-- 교양필수 -->
        <div class="stat-card">
          <p class="stat-label">교양필수</p>
          <div class="progress">
            <div
              class="progress-bar"
              :style="{
                width: isDone
                  ? (state.graduation.generalRequiredCredits / 15) * 100 + '%'
                  : '0%',
              }"
            ></div>
          </div>
          <div class="stat-row">
            <p class="stat-desc">
              {{ isDone ? state.graduation.generalRequiredCredits : "ㅡ" }} /
              {{ isDone ? 15 : "ㅡ" }}
            </p>
            <p
              class="status"
              :class="{
                ok: isDone && state.graduation.shortageGeneralRequiredCredits === 0,
                danger: isDone && state.graduation.shortageGeneralRequiredCredits > 0,
                pending: !isDone,
              }"
            >
              {{
                isDone
                  ? state.graduation.shortageGeneralRequiredCredits > 0
                    ? state.graduation.shortageGeneralRequiredCredits + "학점 부족"
                    : "달성 완료"
                  : "분석 전"
              }}
            </p>
          </div>
        </div>

        <!-- 교양선택 -->
        <div class="stat-card">
          <p class="stat-label">교양선택</p>
          <div class="progress">
            <div
              class="progress-bar"
              :style="{
                width: isDone
                  ? (state.graduation.generalElectiveCredits / 15) * 100 + '%'
                  : '0%',
              }"
            ></div>
          </div>
          <div class="stat-row">
            <p class="stat-desc">
              {{ isDone ? state.graduation.generalElectiveCredits : "ㅡ" }} /
              {{ isDone ? 15 : "ㅡ" }}
            </p>
            <p
              class="status"
              :class="{
                ok: isDone && state.graduation.shortageGeneralElectiveCredits === 0,
                danger: isDone && state.graduation.shortageGeneralElectiveCredits > 0,
                pending: !isDone,
              }"
            >
              {{
                isDone
                  ? state.graduation.shortageGeneralElectiveCredits > 0
                    ? state.graduation.shortageGeneralElectiveCredits + "학점 부족"
                    : "달성 완료"
                  : "분석 전"
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- 전체 졸업요건 달성률 -->
      <div class="progress-container">
        <h4 class="progress-title">전체 졸업요건 달성률</h4>
        <div class="progress total-progress">
          <div
            class="progress-bar total-progress-bar"
            :style="{
              width:
                (state.graduation.totalCompletedCredits / 140) * 100 + '%',
            }"
          ></div>
        </div>
        <div class="progress-text" v-if="isDone">
          {{ state.graduation.totalCompletedCredits }}학점 취득 / 140학점 졸업 ({{
            ((state.graduation.totalCompletedCredits / 140) * 100).toFixed(1)
          }}% 달성)
        </div>
        <div class="progress-text" v-else>분석 전</div>
      </div>

      <!-- 결과 메시지 -->
<div v-if="isDone">
  <!-- 졸업 가능 -->
  <div v-if="state.graduation.graduationResult === '졸업 요건 달성'" class="alert-success">
    <div class="ad-result">{{ state.graduation.graduationResult }}</div>
    {{ state.graduation.details }}
  </div>

  <!-- 졸업 불가 -->
  <div v-else class="alert-danger">
    <div class="ad-result">{{ state.graduation.graduationResult }}</div>
    {{ state.graduation.details }}
  </div>
</div>
    </div>
  </div>
</template>

<style scoped>
.graduation-check {
  margin: 0 73px 0 75px;
  padding: 20px;
}
.section-box {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.06);
}
.header-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.desc {
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  margin: 0;
}

.loader {
  border: 2px solid #f3f3f3; /* 옅은 회색 */
  border-top: 2px solid #198754; /* 초록색 */
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 6px; /* 글자랑 간격 */
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.btn-green {
  background: #198754;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
}
.btn-green:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.section-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 16px;
}
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.stat-card {
  background: #f9fafb;
  border-radius: 8px;
  padding: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 160px;
}
.stat-label {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 15px;
}
.progress {
  background: #e5e7eb;
  border-radius: 6px;
  height: 10px;
  margin: 8px 0;
  overflow: hidden;
}
.progress-bar {
  background: #38a169;
  height: 100%;
  transition: width 0.5s ease;
}
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
.stat-desc {
  font-size: 13px;
  color: #374151;
  font-weight: 500;
}
.status {
  font-size: 13px;
  font-weight: 600;
}
.status.ok {
  color: #198754;
}
.status.danger {
  color: #DC3545;

}
.status.pending {
  color: #6C757D;

}
.progress-container {
  margin: 30px 0 20px;
  text-align: center;
}
.progress-title {
  font-size: 17px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
  text-align: left;
}
.progress.total-progress {
  height: 14px;
  border-radius: 7px;
  background-color: #e5e7eb;
  overflow: hidden;
}
.total-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #febe3a, #ff8c00);
  transition: width 0.6s ease;
}
.progress-text {
  margin-top: 6px;
  font-size: 12px;
  color: #374151;
  text-align: center;
}

.alert-success {
  margin-top: 20px;
  padding: 12px;
  background: #dcfce7;       
  color: #166534;           
  border: 1px solid #16a34a;
  border-radius: 6px;
  font-size: 15px;
  text-align: center;
  white-space: pre-line;
}

.alert-danger {
  margin-top: 20px;
  padding: 12px;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 6px;
  font-size: 15px;
  text-align: center;
  white-space: pre-line;
}
.ad-result {
  margin: 10px;
  font-size: 30px;
  font-weight: 700;
}


</style>
