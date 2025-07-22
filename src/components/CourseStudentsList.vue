<script setup>
import WhiteBox from './WhiteBox.vue';
import { ref } from 'vue';

const link = ref('/course/detail');
const state = {
  data: {
    no: '',
    stdNum: '',
    name: '',
    dept: '',
    email: '',
    phone: '',
  }
}

const openLink = () => {
  window.open(link.value, '_blank', 'width=700px,height=800px,scrollbars=yes');
};
</script>

<template>
  <WhiteBox :title="'학생조회'">
    <div class="table-title">
      <div class="width-1">no</div>
      <div class="width-1">학번</div>
      <div class="width-1">이름</div>
      <div class="width-1">학과</div>
      <div class="width-2">이메일</div>
      <div class="width-2">전화번호</div>
      <div class=""></div>
    </div>
    <!-- <div class="d-flex data">
        <div class="width-1">10001</div>
        <div class="width-1">555</div>
        <div class="width-1">제연주</div>
        <div class="width-1">컴공</div>
        <div class="width-2">test@gmail.com</div>
        <div class="width-2">010 6737 3868</div>
        <div class=""></div>
    </div> -->
    <div v-for="std in stdList" :key="std.id" class="d-flex data">
        <div>{{ state.data.no }}</div>
        <div>{{ state.data.stdNum }}</div>
        <div>{{ state.data.name }}</div>
        <div>{{ state.data.dept }}</div>
        <div>{{ state.data.email }}</div>
        <div>{{ state.data.phone }}</div>
        <div></div>
    </div>

    <button @click="openLink">
      <!-- <a href="/course/detail" target="_blank">강의계획서</a> -->
      강의계획서
    </button>
  </WhiteBox>
</template>

<style scoped>
.table-title{
  display: flex;
  justify-content: space-around;
  text-align: center;
  width: 100%;
  background-color:#364157;
  color: #fff;
  padding: 5px;;
}
.data {
  text-align: center;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #B7B7B7;
  margin-bottom: 0;
  border-bottom: 0.5px; 
}
.width-1 {
  width: 100px;
}
.width-2 {
  width: 200px;
}
</style>
