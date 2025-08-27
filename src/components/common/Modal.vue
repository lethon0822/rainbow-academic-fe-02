<script setup>
import { ref } from "vue";

const isOpen = ref(true);

function closeModal() {
  isOpen.value = false;
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <button @click="closeModal">×</button>
      </div>
      <div
        class="modal-divider"
        style="height: 1px; background-color: #e0e0e0"
      ></div>
      <div class="modal-body"></div>
      <div class="modal-footer">
        <button class="confirm-button" @click="closeModal">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #333;
}

.modal-footer {
  text-align: center;
  padding-bottom: 20px;
}

.confirm-button {
  padding: 6px 16px;
  background-color: #198754;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #1b5e20;
}
</style>
