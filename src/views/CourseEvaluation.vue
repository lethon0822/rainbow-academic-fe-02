<script setup>
import axios from "axios";
import { ref, defineComponent, onMounted, computed } from "vue";

const SurveyItem = defineComponent({
  name: "SurveyItem",
  props: {
    number: { type: [String, Number], required: true },
    question: { type: String, required: true },
    modelValue: [String, Number, null],
    submitted: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      ratings: [
        { label: "매우 그렇지 않다", value: 1 },
        { label: "그렇지 않다", value: 2 },
        { label: "보통이다", value: 3 },
        { label: "그렇다", value: 4 },
        { label: "매우 그렇다", value: 5 },
      ],
    };
  },
  methods: {
    onChange(value) {
      this.$emit("update:modelValue", value);
      this.$emit("change");
    },
  },
  template: `
    <div class="survey-item">
      <div class="question-text">
        <span class="question-number">{{ number }}</span>
        {{ question }}
      </div>
      <div class="rating-scale">
        <div
          v-for="item in ratings"
          :key="item.value"
          class="rating-item"
          :class="{ selected: modelValue == item.value }"
        >
          <div class="rating-label">{{ item.label }}</div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              :name="'q' + number"
              :id="'q' + number + '_' + item.value"
              :value="item.value"
              :checked="modelValue == item.value"
              @change="() => onChange(item.value)"
              :disabled="submitted"
            />
            <label class="form-check-label" :for="'q' + number + '_' + item.value">{{ item.value }}</label>
          </div>
        </div>
      </div>
    </div>
  `,
});

const totalQuestions = 5;
const answers = ref({
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
});
const progress = ref(0);
const submitted = ref(false);
const additionalOpinion = ref("");

const currentStep = ref(1); // 현재 페이지 (1~5+추가 의견)

const questions = [
  { number: 1, question: "수업내용이 체계적으로 구성되었다." },
  { number: 2, question: "교수의 강의 진행 속도가 적절하다." },
  {
    number: 3,
    question: "수업 자료(PPT, 교재 등)가 이해하기 쉽게 준비되었다.",
  },
  { number: 4, question: "교수가 학생들의 질문에 성실히 답변해준다." },
  { number: 5, question: "이 강의를 다른 학생들에게 추천하고 싶다." },
];

function updateProgress() {
  const answeredCount = Object.values(answers.value).filter(
    (v) => v !== null
  ).length;
  progress.value = Math.round((answeredCount / totalQuestions) * 100);
}

function onRadioChange() {
  updateProgress();
}

function nextStep() {
  if (currentStep.value < totalQuestions + 1) {
    // 마지막 페이지는 추가 의견 페이지
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

async function submitSurvey() {
  if (Object.values(answers.value).every((v) => v !== null)) {
    await axios.post("/api/student/course/survey", {
      courseId: 1,
      userId: 2,
      review: additionalOpinion.value,
      score: 5,
    });
    submitted.value = true;
    alert("설문이 성공적으로 제출되었습니다!\n소중한 의견 감사합니다.");
    console.log("설문 결과:", answers.value);
    console.log("추가 의견:", additionalOpinion.value);
  } else {
    alert("모든 필수 항목에 답변해주세요.");
  }
}

function resetForm() {
  if (confirm("작성한 내용이 모두 삭제됩니다. 계속하시겠습니까?")) {
    Object.keys(answers.value).forEach((key) => (answers.value[key] = null));
    additionalOpinion.value = "";
    submitted.value = false;
    updateProgress();
    currentStep.value = 1; // 초기화 시 첫 질문으로 돌아감
  }
}

onMounted(() => {
  updateProgress();
});
</script>

<template>
  <div class="survey-container">
    <!-- 설문 헤더 -->
    <div class="survey-header">
      <h1>📋 중간강의평가 설문지</h1>
      <p class="mb-0">강의 개선을 위한 중간점검 설문조사</p>
    </div>

    <!-- 강의 정보 -->
    <div class="course-info">
      <h5>📚 강의 정보</h5>
      <div class="row">
        <div class="col-md-6">
          <p><strong>과목명:</strong> 전공1자료구조13</p>
          <p><strong>담당교수:</strong> 홍길동 교수</p>
        </div>
        <div class="col-md-6">
          <p><strong>학점:</strong> 3학점</p>
          <p><strong>평가일:</strong> 2025년 3월 1일</p>
        </div>
      </div>
    </div>

    <!-- 진행률 표시 -->
    <div class="progress" style="height: 8px">
      <div
        class="progress-bar bg-warning"
        role="progressbar"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <p class="text-center text-muted mb-4">진행률: {{ progress }}%</p>

    <!-- 단일 질문 렌더링 -->
    <form
      @submit.prevent="submitSurvey"
      :style="{
        opacity: submitted ? 0.5 : 1,
        pointerEvents: submitted ? 'none' : 'auto',
      }"
    >
      <SurveyItem
        v-if="currentStep <= totalQuestions"
        :number="questions[currentStep - 1].number"
        :question="questions[currentStep - 1].question"
        v-model="answers['q' + currentStep]"
        @change="onRadioChange"
        :submitted="submitted"
      />

      <!-- 추가 의견 페이지 -->
      <div v-if="currentStep === totalQuestions + 1" class="survey-item">
        <div class="question-text">
          <span class="question-number">💬</span>
          강의에 대한 추가 의견이나 개선사항이 있다면 자유롭게 작성해주세요.
        </div>
        <textarea
          class="form-control"
          rows="6"
          placeholder="강의 개선을 위한 의견을 자유롭게 작성해주세요..."
          v-model="additionalOpinion"
          :disabled="submitted"
        ></textarea>
      </div>

      <!-- 페이지 네비게이션 -->
      <div class="survey-footer">
        <button
          type="button"
          class="btn btn-outline-secondary btn-lg me-3"
          @click="prevStep"
          :disabled="currentStep === 1 || submitted"
        >
          ← 이전
        </button>

        <button
          v-if="currentStep <= totalQuestions"
          type="button"
          class="btn btn-warning btn-lg"
          @click="nextStep"
          :disabled="answers['q' + currentStep] === null || submitted"
        >
          다음 →
        </button>

        <button
          v-if="currentStep === totalQuestions + 1"
          type="submit"
          class="btn btn-success btn-lg"
          :disabled="
            submitted || !Object.values(answers).every((v) => v !== null)
          "
        >
          📝 설문 제출
        </button>

        <button
          type="button"
          class="btn btn-outline-secondary btn-lg ms-3"
          @click="resetForm"
          :disabled="submitted"
        >
          🔄 다시 작성
        </button>

        <p class="text-muted mt-3 mb-0">
          익명으로 제출되며, 강의 개선에 소중한 자료로 활용됩니다.
        </p>
      </div>

      <div v-if="submitted" class="alert alert-success mt-4">
        <h4>🎉 제출 완료!</h4>
        <p>
          설문에 참여해주셔서 감사합니다. 더 나은 강의를 위해 소중한 의견을
          반영하겠습니다.
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css";

.survey-container {
  max-width: 720px;
  margin: 40px auto;
  padding: 30px 40px;
  background: #f9fbfc;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.survey-header {
  text-align: left;
  color: #253858;
  margin-bottom: 30px;

  h1 {
    font-weight: 700;
    font-size: 28px;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: #64748b;
  }
}

.course-info {
  background: white;
  border-radius: 12px;
  padding: 20px 28px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  color: #475569;

  h5 {
    font-weight: 600;
    margin-bottom: 18px;
  }

  p {
    font-size: 14px;
    margin-bottom: 8px;

    strong {
      color: #344154;
    }
  }
}

.progress {
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 6px;
  margin-bottom: 18px;

  .progress-bar {
    background-color: #3b82f6;
    border-radius: 6px;
  }
}

.text-center.text-muted {
  color: #94a3b8 !important;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 28px;
}

.survey-item {
  background: white;
  border-radius: 14px;
  padding: 26px 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.05);
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
    transform: translateY(-4px);
  }
}

.question-number {
  background: #2563eb;
  color: white;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 14px;
  font-size: 16px;
  user-select: none;
}

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 18px;
}

.rating-scale {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  flex-wrap: nowrap;
}

.rating-item {
  flex: 1 1 0;
  min-width: 90px;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;

  &.selected {
    background-color: #bfdbfe;
  }

  .rating-label {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 6px;
    text-align: center;
    line-height: 1.2;
  }

  .form-check {
    margin: 0;

    .form-check-input {
      width: 22px;
      height: 22px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .form-check-input:checked {
      background-color: #2563eb;
      border-color: #2563eb;
      transform: scale(1.2);
    }
  }
}

@media (max-width: 768px) {
  .rating-scale {
    flex-wrap: wrap;
  }
}

textarea.form-control {
  border-radius: 14px;
  border: 1.5px solid #cbd5e1;
  font-size: 14px;
  color: #475569;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: none;
  }
}

.survey-footer {
  margin-top: 32px;
  text-align: center;
  background: #f9fafb;
  padding: 20px 0;
  border-radius: 14px;

  button {
    font-weight: 600;
    border-radius: 10px;
    padding: 12px 26px;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .btn-warning {
    background-color: #2563eb;
    border: none;
    color: white;

    &:hover:not(:disabled) {
      background-color: #1d4ed8;
    }
  }

  .btn-outline-secondary {
    color: #64748b;
    border-color: #64748b;

    &:hover:not(:disabled) {
      background-color: #e2e8f0;
    }
  }

  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 14px;
  }
}

.alert-success {
  background-color: #d1fae5;
  color: #065f46;
  border-radius: 14px;
  padding: 20px 25px;
  margin-top: 32px;

  h4 {
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 15px;
    margin: 0;
  }
}
</style>
