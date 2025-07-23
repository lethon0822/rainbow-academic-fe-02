<script setup></script>

<template>
  <div class="info-box">
    <!-- 왼쪽 정보 (주소 관련) -->
    <div class="one">
      <table>
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
        </tr>

        <tr>
          <td class="label-cell">주소</td>
          <td class="value-cell">대전광역시 유성구 동서대로 125</td>
        </tr>

        <tr>
          <td class="label-cell">상세주소</td>
          <td class="value-cell" colspan="1" style="width: 600px">
            사과아파트 102동 101호
          </td>
        </tr>
      </table>
    </div>

    <!-- 오른쪽 정보 (전화, 병역 등) -->
    <div class="two">
      <table>
        <tr>
          <td class="label-cell">전화번호</td>
          <td class="value-cell">010-123-4560</td>
        </tr>

        <tr>
          <td class="label-cell">병역구분</td>
          <td class="value-cell">면제</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.info-box {
  display: flex;
  justify-content: center;
}

.one,
.two,
.three {
  flex: none;
  width: auto;
}

table {
  width: auto;
  border-collapse: collapse;
  font-size: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  height: 100%;
}

td {
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  vertical-align: middle;
}

td[colspan] {
  width: 600px;
}

.label-cell {
  background-color: #364157;
  color: white;
  font-weight: bold;
  width: 150px;
}

.value-cell {
  background-color: white;
  color: black;
  width: 300px;
}

select {
  width: 100%;
  padding: 4px;
  border: 1px solid #ced4da;
  border-radius: 3px;
  font-size: 13px;
}

/* 검색 바 */
.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  overflow: hidden;
  background-color: #e2e2e2;
}

.search-box input {
  border: none;
  padding: 6px 10px;
  outline: none;
  font-size: 14px;
  width: 180px;
  background-color: #e2e2e2;
  color: black;
}

.search-box button {
  background-color: #e2e2e2;
  border: none;
  width: 80px; /* 버튼 너비 고정 */
  height: 36px; /* input 높이와 맞추기 */
  display: flex;
  justify-content: flex-end; /* 아이콘을 오른쪽 끝으로 */
  align-items: center;
  padding-right: 10px; /* 오른쪽 여백만 */
  cursor: pointer;
}
</style>
