<!-- Modal.vue -->
<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-window">
      <div class="title-bar">
        <button class="close-btn" @click="close">X</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-window {
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 500px;
  max-width: 90vw;
}
.title-bar {
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  border-bottom: 1px solid #ccc;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
}
.close-btn {
  background: #f0f0f0;
  border: 1px solid #999;
  width: 28px;
  height: 28px;
  font-size: 18px;
  font-family: "Segoe UI", "Tahoma", "Arial", sans-serif;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  padding: 0;
  line-height: 1;
}
.close-btn:hover {
  background: #e0e0e0;
}
.close-btn:active {
  background: #d0d0d0;
  border: 1px solid #777;
}
.modal-body {
  padding: 16px;
  background: white;
}
@media (max-width: 480px) {
  .modal-window {
    width: 320px;
  }
  .modal-body {
    padding: 12px;
  }
}
</style>
