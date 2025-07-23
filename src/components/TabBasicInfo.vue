<script setup></script>

<template>
  <div class="info-box">
    <table>
      <!-- 첫 행: 우편번호 + 전화번호 -->
      <tr>
        <td class="label-cell">우편번호</td>
        <td class="value-cell">
          <div class="search-box">
            <input type="text" placeholder="34158" />
            <button aria-label="검색">
              <img
                src="/src/assets/btn_search.svg"
                alt="돋보기 아이콘"
                style="filter: invert(0)"
              />
            </button>
          </div>
        </td>

        <td class="label-cell">전화번호</td>
        <td class="value-cell">010-123-4560</td>
      </tr>

      <!-- 두번째 행: 주소 + 병역구분 -->
      <tr>
        <td class="label-cell">주소</td>
        <td class="value-cell">대전광역시 유성구 동서대로 125</td>

        <td class="label-cell">병역구분</td>
        <td class="value-cell">면제</td>
      </tr>

      <!-- 세번째 행: 상세주소 + 빈칸 또는 추가정보 -->
      <tr>
        <td class="label-cell">상세주소</td>
        <td class="value-cell" colspan="3">사과아파트 102동 101호</td>
      </tr>

      <!-- 네번째 행: 미정 -->
      <tr>
        <td class="label-cell">　</td>
        <td class="value-cell">　</td>

        <td class="label-cell">　</td>
        <td class="value-cell">　</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.info-box {
  display: flex;
  justify-content: center;
}

table {
  border-collapse: collapse;
  font-size: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  width: auto;
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
  width: 150px;
  white-space: nowrap;
}

.value-cell {
  background-color: white;
  color: black;
  width: 520px;
}

/* 검색 바 */
.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  overflow: hidden;
  background-color: #e2e2e2;

  width: 160px;
}

.search-box input {
  flex: 1;
  min-width: 0;
  padding: 0px 8px;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: #e2e2e2;
  color: black;
}

.search-box button {
  width: 40px;
  height: 30px;
  border: none;
  background-color: #e2e2e2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
}
</style>
