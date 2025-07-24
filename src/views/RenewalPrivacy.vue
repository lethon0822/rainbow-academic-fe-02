<script setup>
import WhiteBox from '@/components/WhiteBox.vue';
import { findId } from '@/services/accountService';
import { reactive } from 'vue';

const state = reactive({
  form: {
    name: '',
    addressPreview: '',
    studentId: '',
    studentNumber: '',
    zipcode: '',
    detailAddress: '',
    phone: '',
    mobile: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    authCode: '',
    changePassword: ''
  }
});

const router = findId(); // findId 함수가 라우터 기능인지 확인 필요, 보통 router는 useRouter()

// 폼 제출 함수
const submit = async () => {
  try {
    // saveCourse 함수는 어디서 임포트/정의된건지 확인 필요
    const res = await saveCourse(state.form);
    if (res?.status === 200) {
      alert('등록 성공');
      router.push('/professor/course/management');
    } else {
      alert('등록 실패');
    }
  } catch (error) {
    console.error(error);
    alert('등록 중 오류가 발생했습니다.');
  }
};

// 우편번호 검색 버튼 클릭 시
const searchzipcode = async () => {
  if (!state.form.zipcode) {
    alert('우편번호를 입력해주세요.');
    return;
  }
  // 우편번호 검색 API 호출 로직 추가 가능
  alert(`우편번호 '${state.form.zipcode}' 검색 기능은 아직 구현되지 않았습니다.`);
};

// 학번 검색 버튼 클릭 시
const searchStudentNumber = async () => {
  if (!state.form.studentNumber) {
    alert('학번을 입력해주세요.');
    return;
  }

  try {
    // 서버에 학번으로 정보 요청
    const res = await findId(state.form.studentNumber);
    console.log('검색 결과:', res);

    if (res?.data) {
      state.form.name = res.data.name ?? '';
      state.form.zipcode = res.data.zipcode ?? '';
      state.form.detailAddress = res.data.detailAddress ?? '';
      state.form.phone = res.data.phone ?? '';
      state.form.mobile = res.data.mobile ?? '';
      state.form.email = res.data.email ?? '';
    } else {
      alert('해당 학번의 정보를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error(error);
    alert('학번 검색 중 오류가 발생했습니다.');
  }
};

// 인증번호 발송
const sendAuthCode = async () => {
  if (!state.form.email) {
    alert('이메일을 입력해주세요.');
    return;
  }
  try {
    // 인증번호 발송 API 호출 예시
    // await sendAuthCodeApi(state.form.email);
    alert('인증번호가 발송되었습니다.');
  } catch (error) {
    console.error(error);
    alert('인증번호 발송 실패');
  }
};

// 인증번호 확인
const verifyAuthCode = async () => {
  if (!state.form.authCode) {
    alert('인증번호를 입력해주세요.');
    return;
  }
  try {
    // 인증번호 확인 API 호출 예시
    // await verifyAuthCodeApi(state.form.authCode);
    alert('인증번호 확인 완료');
  } catch (error) {
    console.error(error);
    alert('인증번호 확인 실패');
  }
};

// 비밀번호 변경 버튼 클릭 시
const changePassword = async () => {
  if (!state.form.newPassword || !state.form.confirmPassword) {
    alert('새 비밀번호와 확인을 입력해주세요.');
    return;
  }
  if (state.form.newPassword !== state.form.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  try {
    // 비밀번호 변경 API 호출 예시
    // await changePasswordApi(state.form.newPassword);
    alert('비밀번호가 변경되었습니다.');
  } catch (error) {
    console.error(error);
    alert('비밀번호 변경 실패');
  }
};
</script>

<template>
  <WhiteBox :title="'개인정보변경'">
  
    
    <div class="d-flex top last">
        <div class="table-title">학번</div>
        <div class="table-content d-flex">
          <input type="text" class="num" v-model="state.form.studentNumber">
          <i class="fas fa-search" style="cursor:pointer;" @click="searchStudentNumber"></i>
          <input type="text" class="name" disabled v-model="state.form.name" />
        </div>
      </div>
      
  

    
    <form @submit="submit">
      <!-- 본인정보 -->
      <p>본인정보</p>
      <div class="d-flex top last">
        <div class="table-title">우편번호</div>
        <div class="table-content d-flex">
          <input type="text" class="num" v-model="state.form.zipcode">
          <i class="fas fa-search" style="cursor:pointer;" @click="searchzipcode"></i>
          <input type="text" class="name" disabled/>
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">상세주소</div>
        <div class="table-content">
          <input type="text" v-model="state.form.detailAddress" required />
        </div>
      </div>

      <div class="table d-flex last">
        <div class="table-title">전화번호</div>
        <div class="table-content">
          <input type="text" v-model="state.form.phone" required />
        </div>
        <div class="table-title">휴대전화</div>
        <div class="table-content">
          <input type="text" v-model="state.form.mobile" required />
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">E-MAIL</div>
        <div class="table-content">
          <input type="email" v-model="state.form.email" required />
        </div>
      </div>

      <!-- 비밀번호 변경 -->
      <p>비밀번호 변경</p>

      <div class="table d-flex">
      <div class="table-title">새 비밀번호</div>
      <div class="table-content">
        <input type="password" class="nwpw" v-model="state.form.newPassword" />
    </div>
</div>

<div class="table d-flex">
  <div class="table-title">새 비밀번호 확인</div>
  <div class="table-content">
    <input type="password" class="nwpw" v-model="state.form.confirmPassword" />
  </div>
</div>

<div class="table d-flex">
  <div class="table-title">인증번호</div>
  <div class="table-content d-flex align-center">
    <input type="text" class="certification-number" v-model="state.form.authCode" />
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



.container{
  max-width: 180px;
  min-width: 1280px;
  
}
.title{
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}

p{
  font-size: 20px;
  font-weight: 400;
  margin-top: 70px;
  margin-bottom: 5px;

}

.table{
  display: flex;
  align-items: center;
  border: 1px solid #B7B7B7;
  background-color: #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #364157;
  margin-bottom: 0;
  border-bottom: 0.5px;
  

}

.top{
border-top: 1px solid #000;
}

.last{
  border-bottom: 1px solid #B7B7B7;
}

.table-title{
  display: flex;
  width: 150px;
  background-color:#364157;
  border-right: 1px solid #B7B7B7;
  color: #fff;
  padding: 5px;;
  align-content: center;
}
.table-content{
  background-color: #fff;
  align-content: center;
  padding: 3px;
  flex:1
  
}
input{
    width: 100%;
    box-sizing: border-box;
    outline-color: #A2A2A2;
    
  }


.button{
  display: flex;
  justify-content: flex-end;
  .btn{
    background-color: #2460CE;
    margin-bottom: 100px;
  }
}


.detail{
  height:200px;
  .table-content{
    input{
      height:100%
    }
  }
}

i{
  margin-left:-1px;
  margin-right: 3px;
  display: flex;
  height:30px;
  width: 35px;
  padding:3px;
  text-align: center;
  align-items: center;
  border: 2px solid #C2C2C2;
  background-color: #E2E2E2;
  color: #8A8A8A;
  font-weight: 600;
}
.num{
  width:150px;
  background-color: #E2E2E2;
}
.name{
  background-color: #C9C9C9;
}
.fa-search{
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
  background-color: #2460CE;
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
  background-color: #2460CE;
}
.change-button{
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
  background-color:rgb(245, 244, 212);
  border: 0.5px solid #ccc;

}

.certification-number{
  width: 300px;
  margin-right: 5px; 
}
</style>