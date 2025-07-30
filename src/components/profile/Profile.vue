<script setup>
import { ref, reactive, onMounted, watch } from "vue";

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({}),
  },
});

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
</script>

<template>
  <div class="inner">
    <div class="header-section">
      <h2 class="title">학적기본사항관리</h2>
      <div class="action-buttons">
        <button
          class="btn btn-primary"
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
    <div class="line"></div>
    <slot></slot>
  </div>

  <div class="profile-container">
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
    </div>

    <!-- 프로필 정보 영역 -->
    <div class="info-box">
      <div class="profile-info">
        <div class="left-info">
          <table>
            <tbody>
              <tr>
                <td class="label-cell">학번</td>
                <td class="value-cell">{{ profile.loginId }}</td>
              </tr>

              <tr>
                <td class="label-cell">성명(한글)</td>
                <td class="value-cell">{{ profile.studentName }}</td>
              </tr>

              <tr>
                <td class="label-cell">E-mail</td>
                <td class="value-cell">{{ profile.email }}</td>
              </tr>

              <tr>
                <td class="label-cell">학생구분</td>
                <td class="value-cell one-cell">대학생</td>
              </tr>

              <tr>
                <td class="label-cell">최종등록연도</td>
                <td class="value-cell">{{ profile.year }}</td>
              </tr>

              <tr>
                <td class="label-cell">학적상태</td>
                <td class="value-cell">{{ profile.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="right-info">
          <table>
            <tr>
              <td class="label-cell">학년</td>
              <td class="value-cell" colspan="2">{{ profile.grade }}</td>
            </tr>

            <tr>
              <td class="label-cell" rowspan="2">소속</td>
              <td class="label-cell">학부(과)</td>
              <td class="value-cell">
                <select v-model="formData.department">
                  <option>선택</option>
                  <option>자연융합학부</option>
                  <option>공학시스템학부</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="label-cell">전공</td>
              <td class="value-cell">{{ profile.deptName }}</td>
            </tr>

            <tr>
              <td class="label-cell">담당교수</td>
              <td class="value-cell" colspan="2">
                {{ profile.professorName }}
              </td>
            </tr>

            <tr>
              <td class="label-cell">학기</td>
              <td class="value-cell" colspan="2">
                {{ profile.semester }}
              </td>
            </tr>

            <tr>
              <td class="label-cell">졸업충족학점</td>
              <td class="value-cell" colspan="2">
                {{ profile.totalCredits }}(이수) / 130(총)
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inner {
  padding: 0;
  margin: 0;
  width: 100%;
  padding: 30px;
  margin: 30px 30px 30px 250px;
  width: 100%;
  max-width: 1430px;
  margin-left: 250px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.title {
  font-size: 38px;
  font-weight: bold;
  text-align: left;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
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

.line {
  border-bottom: 2px solid #1f2c5a;
  margin-bottom: -30px;
}

body {
  font-family: "Malgun Gothic", sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 20px;
}

.profile-container {
  display: flex;
  gap: 20px;
  max-width: 1500px;
  margin: 0 auto;
  margin-top: 30px;
  align-items: stretch;
}

/* 이미지 영역 */
.image-box {
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  left: -18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-image {
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 30px 12px 20px;
  border-radius: 8px;
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
.info-box {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  margin-top: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
}

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
  bottom: 22px;
  right: 55px;
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

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.header-row {
  background-color: #364157;
  color: white;
  font-weight: bold;
}

.subheader-row {
  background-color: #6c757d;
  color: white;
  font-weight: bold;
}

.yellow-header {
  background-color: #dee2e6;
  color: #000;
  font-weight: bold;
}

td {
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  vertical-align: middle;
}

.label-cell {
  background-color: #364157;
  color: white;
  font-weight: bold;
  width: 114px;
}

.value-cell {
  background-color: white;
}

select {
  width: 100%;
  padding: 4px;
  border: 1px solid #ced4da;
  border-radius: 3px;
  font-size: 13px;
}

.search-box {
  position: relative;
  display: inline-block;
}

.search-input {
  padding: 4px 25px 4px 8px;
  border: 1px solid #ced4da;
  border-radius: 3px;
  font-size: 13px;
  width: 80px;
}

.search-icon {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.dropdown-arrow {
  float: right;
  color: #6c757d;
}

td.one-cell {
  padding: 12px;
}
</style>
