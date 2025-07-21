<script setup>
import WhiteBox from '@/components/WhiteBox.vue'
import SearchFilterBar from '@/components/SearchFilterBar.vue';

function handleSearch(filters){
  console.log(filters);
}
</script>

<template>
    <WhiteBox title="수강 신청">
      <SearchFilterBar @search="handleSearch"></SearchFilterBar>
      <text>개설 과목 목록</text>
        
    </WhiteBox>
      
      
    
  </template>

<style scoped>

</style>