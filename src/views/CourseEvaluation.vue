<script setup>
import { ref, computed, onMounted } from "vue";

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
const currentStep = ref(1);

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

const ratings = [
  { label: "매우 그렇지 않다", value: 1 },
  { label: "그렇지 않다", value: 2 },
  { label: "보통이다", value: 3 },
  { label: "그렇다", value: 4 },
  { label: "매우 그렇다", value: 5 },
];

const updateProgress = () => {
  const answeredCount = Object.values(answers.value).filter(
    (v) => v !== null
  ).length;
  progress.value = Math.round((answeredCount / totalQuestions) * 100);
};

const updateAnswer = (value) => {
  answers.value["q" + currentStep.value] = value;
  updateProgress();
};

const nextStep = () => {
  if (currentStep.value < totalQuestions + 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitSurvey = () => {
  if (Object.values(answers.value).every((v) => v !== null)) {
    submitted.value = true;
    alert("설문이 성공적으로 제출되었습니다!\n소중한 의견 감사합니다.");
    console.log("설문 결과:", answers.value);
    console.log("추가 의견:", additionalOpinion.value);
  } else {
    alert("모든 필수 항목에 답변해주세요.");
  }
};

const resetForm = () => {
  if (confirm("작성한 내용이 모두 삭제됩니다. 계속하시겠습니까?")) {
    Object.keys(answers.value).forEach((key) => (answers.value[key] = null));
    additionalOpinion.value = "";
    submitted.value = false;
    updateProgress();
    currentStep.value = 1;
  }
};

const canProceedToNext = computed(() => {
  return answers.value["q" + currentStep.value] !== null;
});

const allQuestionsAnswered = computed(() => {
  return Object.values(answers.value).every((v) => v !== null);
});

onMounted(() => {
  updateProgress();
});
</script>
<template>
  <div class="survey-container">
    <!-- 설문 헤더 -->
    <div class="survey-header">
      <h1>중간강의평가 설문지</h1>
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
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <p class="text-center text-muted mb-4">
      진행률: {{ progress }}% ({{ currentStep }}/{{ totalQuestions + 1 }}단계)
    </p>

    <!-- 설문 폼 -->
    <form
      @submit.prevent="submitSurvey"
      :class="{ 'form-disabled': submitted }"
    >
      <!-- 질문 페이지 -->
      <div v-if="currentStep <= totalQuestions" class="survey-item">
        <div class="question-header">
          <div class="question-number">
            {{ questions[currentStep - 1].number }}
          </div>
          <div class="question-text">
            {{ questions[currentStep - 1].question }}
          </div>
        </div>

        <div class="rating-container">
          <div class="rating-scale">
            <div
              v-for="rating in ratings"
              :key="rating.value"
              class="rating-option"
            >
              <div class="rating-label">{{ rating.label }}</div>
              <div class="rating-input-wrapper">
                <input
                  class="rating-input"
                  type="radio"
                  :name="'q' + currentStep"
                  :id="'q' + currentStep + '_' + rating.value"
                  :value="rating.value"
                  :data-value="rating.value"
                  @input="updateAnswer(rating.value)"
                  :checked="answers['q' + currentStep] == rating.value"
                  :disabled="submitted"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 추가 의견 페이지 -->
      <div v-if="currentStep === totalQuestions + 1" class="survey-item">
        <div class="question-header">
          <div class="question-number">💬</div>
          <div class="question-text">
            강의에 대한 추가 의견이나 개선사항이 있다면 자유롭게 작성해주세요.
          </div>
        </div>
        <div class="rating-container">
          <textarea
            class="form-control opinion-textarea"
            rows="6"
            placeholder="강의 개선을 위한 의견을 자유롭게 작성해주세요..."
            v-model="additionalOpinion"
            :disabled="submitted"
          ></textarea>
        </div>
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
          class="btn btn-primary btn-lg"
          @click="nextStep"
          :disabled="!canProceedToNext || submitted"
        >
          다음 →
        </button>

        <button
          v-if="currentStep === totalQuestions + 1"
          type="submit"
          class="btn btn-success btn-lg"
          :disabled="submitted || !allQuestionsAnswered"
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

      <!-- 제출 완료 메시지 -->
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

<style lang="scss">
.survey-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 60px 40px; /* 위아래 패딩을 30px에서 60px로 늘려서 높이 증가 */
  background: #f9fbfc;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.survey-header {
  text-align: left;
  color: #253858;
  margin-bottom: 30px;
}

.survey-header h1 {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 6px;
}

.survey-header p {
  font-size: 14px;
  color: #64748b;
}

.course-info {
  background: white;
  border-radius: 12px;
  padding: 20px 28px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #475569;
}

.course-info h5 {
  font-weight: 600;
  margin-bottom: 18px;
}

.course-info p {
  font-size: 14px;
  margin-bottom: 8px;
}

.course-info strong {
  color: #344154;
}

.progress {
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 6px;
  margin-bottom: 18px;
}

.progress-bar {
  background: linear-gradient(90deg, #febe3a 0%, #ffd964 100%);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.text-center.text-muted {
  color: #94a3b8 !important;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 28px;
}

.form-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.survey-item {
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease;
  border: 1px solid #e2e8f0;
}

.survey-item:hover:not(.form-disabled .survey-item) {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.question-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}

.question-number {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  user-select: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
}

.question-text {
  position: relative;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.5;
  flex: 1;
  bottom: -6px;
}

.rating-container {
  background: transparent; /* 배경 없애기 */
  border: none; /* 테두리 없애기 */
  padding: 0; /* 필요 없으면 패딩도 제거 */
}

.rating-scale {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: nowrap;
}

.rating-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.rating-label {
  font-size: 16px;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 2px;
  line-height: 1.3;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-input-wrapper {
  position: relative;
  cursor: pointer;
}

.rating-input {
  appearance: none;
  width: 48px;
  height: 48px;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  color: #64748b;
  position: relative;
}

.rating-input::after {
  content: attr(data-value);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.rating-input:hover:not(:disabled) {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.rating-input:checked {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-color: #1d4ed8;
  color: white;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.rating-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.opinion-textarea {
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 14px;
  color: #475569;
  transition: border-color 0.3s ease;
  background: white;
  resize: vertical;
  min-height: 120px;
}

.opinion-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

.survey-footer {
  margin-top: 32px;
  text-align: center;
  background: #f9fafb;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.btn {
  font-weight: 600;
  border-radius: 12px;
  padding: 12px 28px;
  font-size: 16px;
  transition: all 0.3s ease;
  border: none;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-success:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-outline-secondary {
  color: #64748b;
  border: 2px solid #cbd5e1;
  background: white;
}

.btn-outline-secondary:hover:not(:disabled) {
  background-color: #f1f5f9;
  border-color: #94a3b8;
  color: #475569;
  transform: translateY(-2px);
}

.alert-success {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
  border-radius: 16px;
  padding: 24px;
  margin-top: 32px;
  border: 1px solid #a7f3d0;
}

.alert-success h4 {
  font-weight: 700;
  margin-bottom: 10px;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .survey-container {
    margin: 20px;
    padding: 20px;
  }

  .rating-scale {
    flex-wrap: wrap;
    gap: 8px;
  }

  .rating-option {
    flex: 1 1 calc(50% - 4px);
    margin-bottom: 16px;
  }

  .rating-input {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }

  .rating-label {
    font-size: 16px;
    height: 28px;
  }

  .question-header {
    flex-direction: row;
    align-items: flex-start;
  }

  .question-number {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  .question-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .rating-option {
    flex: 1 1 100%;
  }

  .rating-scale {
    flex-direction: column;
    gap: 12px;
  }

  .rating-option {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  .rating-label {
    margin-bottom: 0;
    height: auto;
    text-align: left;
    flex: 1;
  }
}
</style>
