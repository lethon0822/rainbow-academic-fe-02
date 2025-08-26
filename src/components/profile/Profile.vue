<script setup>
import { ref, reactive, onMounted, watch, computed } from "vue";
import "bootstrap-icons/font/bootstrap-icons.css";

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({}),
  },
});

/* 8 프로필 8 */

// 이미지 관련 상태
const selectedImage = ref(null);
const imagePreview = ref(null);
const fileInput = ref(null);
const currentProfileImage = ref(null); // 세션 저장용 프로필 이미지

// 폼 데이터 상태
const formData = reactive({
  studentType: "대학생",
  department: "선택",
});

const loadUserProfileImage = () => {
  const sessionKey = `profileImage_${props.profile.loginId}`;
  const savedImage = sessionStorage.getItem(sessionKey);

  if (savedImage) {
    currentProfileImage.value = savedImage;
  } else {
    if (props.profile.loginId === "20220001") {
      // 시연용 기본 프로필 이미지
      currentProfileImage.value =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDAiIHI9IjE2IiBmaWxsPSIjNkM3NTdEIi8+CjxwYXRoIGQ9Ik0zMCA4MEMzMCA3MS4xNjM0IDQ0LjUzNjYgNjQgNjAgNjRDNzUuNDYzNCA2NCA5MCA3MS4xNjM0IDkwIDgwVjEwMEgzMFY4MFoiIGZpbGw9IiM2Qzc1N0QiLz4KPC9zdmc+";
    }
  }
};

onMounted(() => {
  if (props.profile.loginId) {
    loadUserProfileImage();
  }
});

watch(
  () => props.profile.loginId,
  (newLoginId) => {
    if (newLoginId) {
      selectedImage.value = null;
      imagePreview.value = null;
      currentProfileImage.value = null;

      loadUserProfileImage();
    }
  }
);

// 이미지 선택 처리
const handleImageSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // 파일 크기 체크
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 파일 형식 체크
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    selectedImage.value = file;

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 카메라 아이콘 클릭시 파일 선택창 열기
const openFileDialog = () => {
  fileInput.value.click();
};

// 이미지 제거
const removeImage = () => {
  selectedImage.value = null;
  imagePreview.value = null;
  fileInput.value.value = "";

  // 세션에서도 제거
  const sessionKey = `profileImage_${props.profile.loginId}`;
  sessionStorage.removeItem(sessionKey);
  currentProfileImage.value = null;
};

// 포트폴리오용 프로필 저장
const saveProfile = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 이미지가 선택되었다면 세션에 저장
    if (selectedImage.value && imagePreview.value) {
      const sessionKey = `profileImage_${props.profile.loginId}`;
      sessionStorage.setItem(sessionKey, imagePreview.value);
      currentProfileImage.value = imagePreview.value;
    }

    const formDataToSend = {
      userId: props.profile.loginId,
      studentType: formData.studentType,
      department: formData.department,
    };

    const response = await fetch("/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(formDataToSend),
    });

    if (response.ok || true) {
      alert(
        "프로필이 성공적으로 업데이트되었습니다.\n(이미지는 세션 동안만 유지됩니다)"
      );

      // 임시 미리보기 상태 초기화
      selectedImage.value = null;
      imagePreview.value = null;
    }
  } catch (error) {
    console.error("프로필 업데이트 오류:", error);
    alert("프로필 업데이트 중 오류가 발생했습니다.");
  }
};

/* 8 탭 8 */
const activeTab = ref("기본정보");

const tabs = [
  { id: "기본프로필", label: "기본프로필", icon: "bi-person-fill" },
  { id: "개인정보", label: "개인정보", icon: "bi-clipboard-check" },
  { id: "등록", label: "등록", icon: "bi-briefcase-fill" },
  { id: "장학", label: "장학", icon: "bi-award" },
];

const currentData = computed(() => {
  return profileData[activeTab.value] || {};
});

const setActiveTab = (tabId) => {
  activeTab.value = tabId;
};

const progressPercent = 96; // 진행률 % (숫자)
</script>

<template>
  <!-- 8 프로필 8 -->
  <div class="inner">
    <h class="titleMenu">학적 > 학적기본사항관리</h>
    <h2 class="title">학적기본사항관리</h2>
  </div>

  <div class="profile-wrapper">
    <!-- 이미지 영역 -->
    <div class="image-box">
      <div class="profile-image">
        <div class="avatar-wrapper">
          <div class="avatar">
            <!-- 이미지 미리보기 또는 현재 프로필 이미지 또는 기본 아바타 -->
            <img
              v-if="imagePreview || currentProfileImage"
              :src="imagePreview || currentProfileImage"
              alt="프로필 이미지"
              class="profile-img"
            />
            <svg v-else class="avatar-icon" fill="#6c757d" viewBox="0 0 24 24">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
          <!-- 카메라 아이콘 -->
          <div class="camera-icon" @click="openFileDialog">
            <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
              <path
                d="M12 15.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z"
              />
            </svg>
          </div>
        </div>

        <!-- 숨겨진 파일 입력 -->
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleImageSelect"
          style="display: none"
        />
      </div>

      <div class="action-buttons">
        <button
          class="btn btn-success"
          @click="saveProfile"
          v-if="imagePreview || currentProfileImage"
        >
          저장
        </button>
        <button
          class="btn btn-secondary"
          @click="removeImage"
          v-if="imagePreview || currentProfileImage"
        >
          이미지 제거
        </button>
      </div>
    </div>

    <!-- 8 탭 8  -->
    <div class="profile-tabs">
      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.id"
          @click="setActiveTab(tab.id)"
          :class="[
            'tab-button',
            { active: activeTab === tab.id },
            { 'first-tab': index === 0 },
          ]"
        >
          <i :class="tab.icon"></i>
          {{ tab.label }}
        </button>
      </div>

      <div class="tab-content">
        <!-- 기본정보 Tab -->
        <div v-if="activeTab === '기본정보'" class="space-y-6">
          <div class="content-grid">
            <div class="field-group full-width">
              <label class="field-label">이름</label>
              <div class="field-value boxed-value">
                {{ profile.studentName }}
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">학번</label>
              <div class="field-value boxed-value">{{ profile.loginId }}</div>
            </div>
            <div class="field-group">
              <label class="field-label">학년</label>
              <div class="field-value boxed-value">{{ profile.grade }}</div>
            </div>

            <div class="field-group">
              <label class="field-label">학과</label>
              <div class="field-value boxed-value">{{ profile.deptName }}</div>
            </div>
            <div class="field-group">
              <label class="field-label">학기</label>
              <div class="field-value boxed-value">{{ profile.semester }}</div>
            </div>

            <div class="field-group">
              <label class="field-label">등록연도</label>
              <div class="field-value boxed-value">
                {{ profile.registerYear }}
              </div>
            </div>
            <div class="field-group">
              <label class="field-label">학적상태</label>
              <div class="field-value boxed-value">{{ profile.status }}</div>
            </div>
          </div>
        </div>

        <!-- 개인정보 Tab -->
        <div v-if="activeTab === '개인정보'" class="space-y-6">
          <div class="content-grid">
            <div class="field-group">
              <label class="field-label">생년월일</label>
              <div class="field-value boxed-value">{{ profile.loginId }}</div>
            </div>

            <div class="field-group">
              <label class="field-label">연락처</label>
              <div class="field-value boxed-value">{{ profile.loginId }}</div>
            </div>

            <div class="field-group">
              <label class="field-label">이메일</label>
              <div class="field-value boxed-value">{{ profile.grade }}</div>
            </div>

            <div class="field-group">
              <label class="field-label">병역구분</label>
              <div class="field-value boxed-value">{{ profile.deptName }}</div>
            </div>
            <div class="field-group">
              <label class="field-label">우편번호</label>
              <div class="field-value boxed-value">{{ profile.semester }}</div>
            </div>

            <div class="field-group">
              <label class="field-label">주소</label>
              <div class="field-value boxed-value">
                {{ profile.registerYear }}
              </div>
            </div>

            <div class="field-group full-width">
              <label class="field-label">상세주소</label>
              <div class="field-value boxed-value">
                {{ profile.studentName }}
              </div>
            </div>
          </div>
        </div>

        <!-- 등록 Tab -->
        <div v-if="activeTab === '특징'" class="space-y-4">
          <h3 class="section-title">특징 정보</h3>
          <p class="section-description">특징 관련 정보가 여기에 표시됩니다.</p>
        </div>

        <!-- 장학 Tab -->
        <div v-if="activeTab === '검색'" class="space-y-4">
          <div class="search-container">
            <i class="bi-search search-icon"></i>
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              class="search-input"
            />
          </div>
          <div class="search-result">
            <p>검색 결과가 여기에 표시됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 8 프로그레스 8 -->
  <div class="progress-container">
    <h2
      style="
        font-size: 14px;
        color: #4a5568;
        margin-bottom: 12px;
        font-weight: bold;
      "
    >
      전체 졸업 달성률
    </h2>

    <div class="progress">
      <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <div style="text-align: center; margin-top: -8px">
      <span style="font-size: 12px; color: #718096">
        135%달 완료 / 140%달 목표 (96.4% 달성)
      </span>
    </div>
  </div>

  <!-- 8 그래프 8 -->
  <div class="graph">
    <h2
      style="
        font-size: 14px;
        color: #4a5568;
        margin-bottom: 12px;
        font-weight: bold;
      "
    >
      학기별 이수학점 현황
    </h2>
  </div>
</template>

<style scoped lang="scss">
.inner {
  padding: 30px;
  margin: 30px 30px 30px 250px;
  max-width: 1430px;
}

.title {
  font-size: 38px;
  font-weight: bold;
  text-align: left;
  margin-bottom: -100px;
  margin-top: 10px;
}

.titleMenu {
  color: #f8f9fa;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-left: 50px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &.btn-primary {
    background: linear-gradient(135deg, #4a76a8 0%, #2c5f8a 100%);
    color: white;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #3b5f8a 0%, #1f4568 100%);
    }
  }

  &.btn-secondary {
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #545b62;
    }
  }
}

body {
  font-family: "Malgun Gothic", sans-serif;
  background-color: #f5f5f5;
}

.profile-wrapper {
  display: flex;
  gap: 180px;
  align-items: flex-start;
}

/* 이미지 영역 */
.image-box {
  margin-top: -140px;
  width: 200px;
  flex-shrink: 0;
}

.profile-image {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 190px 150px;
}

/* 포트폴리오 안내 메시지 */
.portfolio-notice {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  border-radius: 0 0 8px 8px;
  text-align: center;
}

.notice-text {
  margin: 0;
  font-size: 12px;
  color: #6c757d;
  line-height: 1.4;
}

/* 정보 영역 */

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
  overflow: hidden;
}

.avatar-icon {
  width: 100px;
  height: 100px;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.camera-icon {
  position: absolute;
  bottom: 125px;
  right: 40px;
  width: 60px;
  height: 60px;
  background-color: #6c757d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #545b62;
  }
}

.profile-info {
  display: flex;
}

.left-info {
  width: 575px;
  flex-shrink: 0;
}

.right-info {
  flex: 1;
  min-width: 0;
}

/* 8 탭 8 */

.profile-tabs {
  flex: 1;
  max-width: 600px;
  margin-top: 50px;
  margin-left: 60px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.tab-navigation {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  white-space: nowrap;
}

.tab-button:hover {
  color: #374151;
  background-color: #f9fafb;
}

.tab-button.active {
  color: #00664f;
  background-color: #e9f5e8;
  border-bottom: 2px solid #00664f;
}

.first-tab {
  border-radius: 6px 0px 0px 0px;
}

.tab-button:not(.active) {
  color: #6b7280;
}

.tab-content {
  padding: 24px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0px 48px;
}

.field-group {
  margin-bottom: 16px;
}

.field-label {
  display: block;
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
}

.field-value {
  color: #1f2937;
}

.full-width {
  grid-column: span 2;
}

.boxed-value {
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #f9fafb;
}

.section-title {
  font-size: 18px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 16px;
}

.section-description {
  color: #6b7280;
  margin-bottom: 16px;
}

.search-container {
  position: relative;
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  ring: 2px solid #3b82f6;
  border-color: #3b82f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 20px;
}

.search-result {
  color: #6b7280;
}

.space-y-6 > * + * {
  margin-top: 24px;
}

.space-y-4 > * + * {
  margin-top: 16px;
}

/* 8 프로그레스 8 */
.progress-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.progress {
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 6px;
  margin-bottom: 18px;
  overflow: hidden;
}

.progress-bar {
  background: linear-gradient(90deg, #febe3a 0%, #ffd964 100%);
  border-radius: 6px;
  transition: width 0.3s ease;
  height: 100%;
}

/* 8 그래프 8 */
.graph {
  max-width: 500px;
  margin: 20px auto 0 auto;
  padding: 16px;
  background: white;

  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
