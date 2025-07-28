<script setup>
</script>

<template>
  <div class="info-box">
    <!-- 첫번째 -->
    <div class="one">
      <table>
        <tbody>
          <tr>
            <td class="label-cell">학적상태</td>
            <td class="value-cell">재학</td>
          </tr>

          <tr>
            <td class="label-cell" rowspan="2">전공(부/복수/연계)</td>
            <td class="value-cell">복수전공</td>
          </tr>
          <tr>
            <td class="value-cell">부전공</td>
          </tr>

          <tr>
            <td class="label-cell">조기졸업</td>
            <td class="value-cell">N</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 두번째 -->
    <div class="two">
      <table>
        <tbody>
          <tr>
            <td class="label-cell">입학일자</td>
            <td class="value-cell">2020-10-10</td>
          </tr>

          <tr>
            <td class="label-cell" rowspan="2">신청학부</td>
            <td class="value-cell">컴퓨터전공</td>
          </tr>
          <tr>
            <td class="value-cell">사진영상학부</td>
          </tr>

          <tr>
            <td class="label-cell">졸업논문</td>
            <td class="value-cell">합격</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 세번째 -->
    <div class="three">
      <table>
        <tbody>
          <tr>
            <td class="label-cell">입학구분</td>
            <td class="value-cell">신입학</td>
          </tr>

          <tr>
            <td class="label-cell">입학학부</td>
            <td class="value-cell">컴퓨터공학과</td>
          </tr>

          <tr>
            <td class="label-cell">교직이수</td>
            <td class="value-cell">
              <select>
                <option>선택</option>
              </select>
            </td>
          </tr>

          <tr>
            <td class="label-cell">학석사연계</td>
            <td class="value-cell"></td>
          </tr>
        </tbody>
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
</style>
