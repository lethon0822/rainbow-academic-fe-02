<script setup></script>

<template>
  <div class="info-box">
    <table>
      <tbody>
        <tr>
          <td class="label-cell">우편번호</td>
          <td class="value-cell">
            <div class="search-box">
              <input type="text" placeholder="34158" readonly />
            </div>
          </td>

          <td class="label-cell">전화번호</td>
          <td class="value-cell">010-123-4560</td>
        </tr>

        <tr>
          <td class="label-cell">주소</td>
          <td class="value-cell">
            <input type="text" readonly style="width: 100%" />
          </td>

          <td class="label-cell">병역구분</td>
          <td class="value-cell">면제</td>
        </tr>

        <tr>
          <td class="label-cell">상세주소</td>
          <td class="value-cell" colspan="3">
            <input type="text" readonly style="width: 100%" />
            <input type="hidden" />
          </td>
        </tr>

        <tr>
          <td class="label-cell">　</td>
          <td class="value-cell">　</td>
          <td class="label-cell">　</td>
          <td class="value-cell">　</td>
        </tr>
      </tbody>
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
</style>
