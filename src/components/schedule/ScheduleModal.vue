<script setup>
import { ref, watch, computed } from 'vue';
import { createSchedule, updateSchedule, deleteSchedule } from '@/services/scheduleService';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  // 편집 시 기존 값 전달 (없으면 신규)
  editItem: {
    type: Object,
    default: null,
  },
  defaultSemesterId: { type: Number, required: true }, // 백엔드 요구
  pickedDate: { type: String, default: '' }, // 달력에서 클릭한 날짜(YYYY-MM-DD)
});
const emit = defineEmits(['update:modelValue', 'saved']);

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});

const form = ref({
  scheduleId: null,
  semesterId: props.defaultSemesterId,
  scheduleType: '',
  startDate: '',
  endDate: '',
  description: '',
});

watch(
  () => props.editItem,
  (v) => {
    if (v) {
      form.value = {
        scheduleId: v.id,
        semesterId: v.semesterId,
        scheduleType: v.scheduleType,
        startDate: v.startDate,
        endDate: v.endDate,
        description: v.description ?? '',
      };
    } else {
      form.value = {
        scheduleId: null,
        semesterId: props.defaultSemesterId,
        scheduleType: '',
        startDate: props.pickedDate || '',
        endDate: props.pickedDate || '',
        description: '',
      };
    }
  },
  { immediate: true }
);

const close = () => (visible.value = false);

const save = async () => {
  if (!form.value.scheduleType || !form.value.startDate || !form.value.endDate) {
    alert('일정명, 시작일, 종료일을 입력하세요.');
    return;
  }
  if (form.value.scheduleId) {
    await updateSchedule(form.value);
  } else {
    await createSchedule(form.value);
  }
  emit('saved'); // 부모에서 재조회
  close();
};

const removeItem = async () => {
  if (!form.value.scheduleId) return;
  if (!confirm('정말 삭제할까요?')) return;
  await deleteSchedule(form.value.scheduleId);
  emit('saved');
  close();
};
</script>

<template>
    <teleport to="body">
      <div v-if="visible" class="sch-overlay" @click.self="close">
        <div class="sch-dialog" role="dialog" aria-modal="true">
          <div class="title">
            <strong>{{ form.scheduleId ? '일정 수정' : '새 일정 추가' }}</strong>
            <button class="icon" @click="close" aria-label="닫기">✕</button>
          </div>
  
          <div class="body">
            <label class="row">
              <span class="label">일정명</span>
              <input v-model="form.scheduleType" placeholder="예) 수강신청" />
            </label>
            <label class="row">
              <span class="label">시작일</span>
              <input type="date" v-model="form.startDate" />
            </label>
            <label class="row">
              <span class="label">종료일</span>
              <input type="date" v-model="form.endDate" />
            </label>
            <label class="row">
              <span class="label">설명</span>
              <textarea v-model="form.description" rows="3" placeholder="선택 사항"></textarea>
            </label>
          </div>
  
          <div class="actions">
            <button class="primary" @click="save">{{ form.scheduleId ? '저장' : '추가' }}</button>
            <button class="ghost" @click="close">취소</button>
            <button v-if="form.scheduleId" class="danger" @click="removeItem">삭제</button>
          </div>
        </div>
      </div>
    </teleport>
  </template>
  
  <style scoped>
  /* 기존 .overlay → .sch-overlay (최상단 z-index 유지) */
  .sch-overlay{
    position:fixed; inset:0; background:rgba(0,0,0,.5);
    display:flex; align-items:center; justify-content:center;
    z-index:2000;
  }
  
  /* 기존 .modal → .sch-dialog (전역 .modal 규칙과 충돌 회피) */
  .sch-dialog{
    display:block;              /* 혹시 모를 전역 규칙 대비 */
    width:460px; background:#fff; border-radius:16px;
    box-shadow:0 10px 30px rgba(0,0,0,.15);
  }
  
  /* 나머지 스타일은 동일 */
  .title{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid #eee}
  .icon{background:transparent;border:none;font-size:18px;cursor:pointer}
  .body{padding:16px 18px;display:flex;flex-direction:column;gap:12px}
  .row{display:flex;align-items:center;gap:12px}
  .label{width:72px;color:#666;font-size:14px}
  input,textarea{flex:1;border:1px solid #ddd;border-radius:10px;padding:10px 12px;font-size:14px;outline:none}
  input:focus,textarea:focus{border-color:#3BBEFF}
  .actions{display:flex;justify-content:flex-end;gap:10px;padding:12px 18px 16px;border-top:1px solid #eee}
  .primary{background:#3BBEFF;border:none;color:#fff;border-radius:10px;padding:8px 14px;cursor:pointer;font-weight:600}
  .ghost{background:#f5f5f5;border:none;border-radius:10px;padding:8px 14px;cursor:pointer}
  .danger{background:#ff5252;border:none;color:#fff;border-radius:10px;padding:8px 14px;cursor:pointer}
  </style>