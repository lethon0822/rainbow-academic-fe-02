<script setup>
// 카카오 api 씀 상세주소는 DB 필요
import { ref } from "vue";

const sample6_postcode = ref("");
const sample6_address = ref("");
const sample6_extraAddress = ref("");
const sample6_detailAddress = ref("");

function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = "";
      let extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        sample6_extraAddress.value = extraAddr;
      } else {
        sample6_extraAddress.value = "";
      }

      sample6_postcode.value = data.zonecode;
      sample6_address.value = addr;

      nextTick(() => {
        if (sample6_detailAddressRef.value) {
          sample6_detailAddressRef.value.focus();
        }
      });
    },
  }).open();
}

import { nextTick, ref as vueRef } from "vue";
const sample6_detailAddressRef = vueRef(null);
</script>

<template>
  <div class="info-box">
    <table>
      <tbody>
        <tr>
          <td class="label-cell">우편번호</td>
          <td class="value-cell">
            <div class="search-box">
              <input
                type="text"
                placeholder="34158"
                v-model="sample6_postcode"
                readonly
              />
              <button
                type="button"
                aria-label="검색"
                @click="sample6_execDaumPostcode"
              >
                <img src="/src/assets/btn_search.svg" alt="돋보기 아이콘" />
              </button>
            </div>
          </td>

          <td class="label-cell">전화번호</td>
          <td class="value-cell">010-123-4560</td>
        </tr>

        <tr>
          <td class="label-cell">주소</td>
          <td class="value-cell">
            <input
              type="text"
              v-model="sample6_address"
              readonly
              style="width: 100%"
            />
          </td>

          <td class="label-cell">병역구분</td>
          <td class="value-cell">면제</td>
        </tr>

        <tr>
          <td class="label-cell">상세주소</td>
          <td class="value-cell" colspan="3">
            <input
              type="text"
              v-model="sample6_detailAddress"
              ref="sample6_detailAddressRef"
              placeholder="상세주소를 입력하세요"
              style="width: 100%"
            />
            <input type="hidden" v-model="sample6_extraAddress" />
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
