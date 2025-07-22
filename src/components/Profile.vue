<script setup></script>

<template>
  <div class="profile-container">
    <!-- 이미지 영역을 별도의 박스로 분리 -->
    <div class="image-box">
      <div class="profile-image">
        <div class="avatar">
          <svg class="avatar-icon" fill="#6c757d" viewBox="0 0 24 24">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <div class="camera-icon">
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path
                d="M12 15.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 프로필 정보 영역도 별도의 박스로 -->
    <div class="info-box">
      <div class="profile-info">
        <div class="left-info">
          <table>
            <tr>
              <td class="label-cell">학번</td>
              <td class="value-cell">1234567</td>
            </tr>

            <tr>
              <td class="label-cell">성명(한글)</td>
              <td class="value-cell">홍길동</td>
            </tr>

            <tr>
              <td class="label-cell">E-mail</td>
              <td class="value-cell">123@naver.com</td>
            </tr>

            <tr>
              <td class="label-cell">학생구분</td>
              <td class="value-cell">
                <select>
                  <option>대학생</option>
                </select>
              </td>
            </tr>

            <tr>
              <td class="label-cell">최종등록연도</td>
              <td class="value-cell">
                <select>
                  <option>2025</option>
                </select>
              </td>
            </tr>

            <tr>
              <td class="label-cell">학적상태</td>
              <td class="value-cell">졸업</td>
            </tr>
          </table>
        </div>

        <div class="right-info">
          <table>
            <tr>
              <td class="label-cell">학년</td>
              <td class="value-cell" colspan="2">4</td>
            </tr>

            <tr>
              <td class="label-cell" rowspan="2">소속</td>
              <td class="label-cell">학부(과)</td>
              <td class="value-cell">
                <select>
                  <option>선택</option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="label-cell">전공</td>
              <td class="value-cell"></td>
            </tr>

            <tr>
              <td class="label-cell">담당교수</td>
              <td class="value-cell" colspan="2">김성배</td>
            </tr>
            <tr>
              <td class="label-cell">학기</td>
              <td class="value-cell" colspan="2">
                <select>
                  <option>1학기</option>
                </select>
              </td>
            </tr>

            <tr>
              <td class="label-cell">졸업충족 학점</td>
              <td class="value-cell" colspan="2">48(이수)/ 140(총)</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
}

/* 이미지 영역 */
.image-box {
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: fit-content;
  left: -20px;
}

.profile-image {
  width: 100%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 62px 20px;
  border-radius: 8px;
}

/* 정보 영역 */
.info-box {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
}

.avatar-icon {
  width: 60px;
  height: 60px;
}

.camera-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  background-color: #6c757d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-info {
  display: flex;
}

.left-info {
  width: 560px; /* 100px에서 20px 줄임 */
}

.right-info {
  flex: 1;
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
</style>
