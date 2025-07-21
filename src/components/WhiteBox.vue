<script setup>
// props로 title을 받는다
defineProps({
  title: String,
});
</script>

<template>
  <div class="white-box">
    <div class="inner">
      <h2 class="title">{{ title }}</h2>
      <div class="line"></div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.white-box {
  background-color: white;
  padding: 30px;
  margin: 30px 30px 30px 250px;
  width: 100%;
  max-width: 1430px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 120px);
  box-sizing: border-box;
}
.inner {
  padding: 0;
  margin: 0;
  width: 100%;
}
.title {
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}
.line {
  border-bottom: 2px solid #1f2c5a;
  margin-bottom: 10px;
}
</style>
