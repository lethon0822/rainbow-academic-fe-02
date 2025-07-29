<script setup>
import WhiteBox from '@/components/common/WhiteBox.vue';
import { reactive, ref, nextTick, onMounted } from 'vue';
import { getPrivacy, putPrivacy } from '@/services/privacyService';

const sample6_postcode = ref('');
const sample6_address = ref('');
const sample6_extraAddress = ref('');
const sample6_detailAddress = ref('');
const sample6_detailAddressRef = ref(null); // 포커싱 대상

function sample6_execDaumPostcode() {
  new window.daum.Postcode({
    oncomplete: function (data) {
      let addr = ''; // 기본 주소
      let extraAddr = ''; // 참고 주소

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        sample6_extraAddress.value = extraAddr;
      } else {
        sample6_extraAddress.value = '';
      }

      sample6_postcode.value = data.zonecode;
      sample6_address.value = addr;

      // 상세주소 입력 칸에 포커스
      nextTick(() => {
        if (sample6_detailAddressRef.value) {
          sample6_detailAddressRef.value.focus();
        }
      });
    },
  }).open();
}

const state = reactive({
  data: {
    loginId: '',
    userName: '',
    phone: '',
    email: '',
  },
});

onMounted(() => {
  selectPrivacy();
});

const selectPrivacy = async () => {
  const res = await getPrivacy();
  if (res.data === undefined || res.status !== 200) {
    return;
  }
  state.data = res.data;
  console.log(state.data);
};

const modifyPrivacy = async () => {
  const res = await putPrivacy(state.data);
  if (res.data === undefined || res.status !== 200) {
    return;
  } 
  alert('수정되었습니다.');
};
</script>

<template>
  <WhiteBox :title="'개인정보변경'">
    <div class="d-flex top last">
      <div class="table-title">학번</div>
      <div class="table-content d-flex">
        <input type="text" class="num" v-model="state.data.loginId" disabled/>
        <i class="fas fa-search"></i>
        <input type="text" class="name" v-model="state.data.userName" disabled />
      </div>
    </div>

    <form>
      <!-- 본인정보 -->
      <p>본인정보</p>
      <div class="d-flex top last">
        <div class="table-title">우편번호</div>
        <div class="table-content d-flex">
          <input type="text" class="num" v-model="sample6_postcode" />
          <i
            class="fas fa-search"
            style="cursor: pointer"
            @click.prevent="sample6_execDaumPostcode"
            ></i>

          <input type="text" class="name" v-model="sample6_address" disabled />
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">상세주소</div>
        <div class="table-content">
          <input type="text" v-model="sample6_extraAddress" />
        </div>
      </div>

      <div class="table d-flex last">
        <div class="table-title">전화번호</div>
        <div class="table-content">
          <input type="text" v-model="state.data.phone" />
        </div>
        <div class="table-title">Email</div>
        <div class="table-content">
          <input type="text" v-model="state.data.email" />
        </div>
      </div>

      <button
        class="button"
        @click.prevent="modifyPrivacy">
        저장
      </button>
    </form>

    <form>
      <!-- 비밀번호 변경 -->
      <p>비밀번호 변경</p>

      <div class="table d-flex">
        <div class="table-title">새 비밀번호</div>
        <div class="table-content">
          <input
            type="password"
            class="nwpw"
          />
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">새 비밀번호 확인</div>
        <div class="table-content">
          <input
            type="password"
            class="nwpw"
          />
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">인증번호</div>
        <div class="table-content d-flex align-center">
          <input
            type="text"
            class="certification-number"
          />
          <button class="send-button">인증번호 발송</button>
          <button class="verify-button">인증번호 확인</button>
        </div>
      </div>
      <div class="table d-flex">
        <div class="table-title">비밀번호 변경</div>
        <div class="table-content">
          <button class="change-button">비밀번호변경</button>
        </div>
      </div>
    </form>
  </WhiteBox>
</template>

<style scoped lang="scss">
.container {
  max-width: 180px;
  min-width: 1280px;
}
.title {
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}

p {
  font-size: 20px;
  font-weight: 400;
  margin-top: 70px;
  margin-bottom: 5px;
}

.table {
  display: flex;
  align-items: center;
  border: 1px solid #b7b7b7;
  background-color: #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #364157;
  margin-bottom: 0;
  border-bottom: 0.5px;
}

.top {
  border-top: 1px solid #000;
}

.last {
  border-bottom: 1px solid #b7b7b7;
}

.table-title {
  display: flex;
  width: 150px;
  background-color: #364157;
  border-right: 1px solid #b7b7b7;
  color: #fff;
  padding: 5px;
  align-content: center;
}
.table-content {
  background-color: #fff;
  align-content: center;
  padding: 3px;
  flex: 1;
}
input {
  width: 100%;
  box-sizing: border-box;
  outline-color: #a2a2a2;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.button {
  display: flex;
  justify-content: flex-end;
  .btn {
    background-color: #2460ce;
    margin-bottom: 100px;
  }
}

.detail {
  height: 200px;
  .table-content {
    input {
      height: 100%;
    }
  }
}

i {
  margin-left: -1px;
  margin-right: 3px;
  display: flex;
  height: 30px;
  width: 35px;
  padding: 3px;
  text-align: center;
  align-items: center;
  border: 2px solid #c2c2c2;
  background-color: #e2e2e2;
  color: #8a8a8a;
  font-weight: 600;
}
.num {
  width: 150px;
  background-color: #e2e2e2;
}
.name {
  background-color: #c9c9c9;
}
.fa-search {
  font-size: 20px;
}
.send-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  height: 30px;
  width: 300px;
  padding: 8px 50px;
  font-size: 14px;
  background-color: #2460ce;
  margin-right: 5px;
}

.verify-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  height: 30px;
  width: 300px;
  padding: 8px 50px;
  font-size: 14px;
  background-color: #2460ce;
}
.change-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  height: 30px;
  width: 300px;
  padding: 8px 50px;
  font-size: 14px;
  background-color: #7d848fce;
}

.nwpw {
  width: 300px;
  background-color: rgb(245, 244, 212);
  border: 0.5px solid #ccc;
}

.certification-number {
  width: 300px;
  margin-right: 5px;
}
</style>
