

<!-- src/views/UserInfo.vue -->
<template>
    <div class="user-info">
      <h1>개인정보 확인</h1>
  
      <div v-if="loading">불러오는 중...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <p><strong>아이디:</strong> {{ user.userId }}</p>
        <p><strong>이름:</strong> {{ user.name }}</p>
        <p><strong>이메일:</strong> {{ user.email }}</p>
        <p><strong>역할:</strong> {{ user.role }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const user = ref({});
  const loading = ref(true);
  const error = ref(null);
  
  onMounted(async () => {
    try {
      const res = await axios.get("/api/user/info"); // 실제 백엔드 API 경로로 수정하세요
      user.value = res.data;
    } catch (err) {
      error.value = "사용자 정보를 불러오는 데 실패했습니다.";
    } finally {
      loading.value = false;
    }
  });
  </script>
  
  <style scoped>
  .user-info {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  .user-info p {
    margin: 10px 0;
  }
  </style>
