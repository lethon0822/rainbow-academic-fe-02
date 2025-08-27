<script setup>
import whiteBox from '@/components/common/WhiteBox.vue';
import departMent from '@/components/common/DepartMent.vue';
import { reactive } from 'vue';

const state = reactive({
  form:{
    deptName:"",
    headProfId:0,
    deptOffice: "",
    deptTel: "",
    deptMaxStd:0,
    deptCode: "",

  }
})

</script>

<template>
  <whiteBox :title="'학과관리'" class="white1" >
    <div class="dept-form-container">
      <form>
        <!-- 입력 필드들을 감싸는 grid -->
        <div class="dept-form-grid">
          <div>
            <label for="deptCode" class="form-label">학과코드</label>
            <input type="text" class="form-control" id="deptCode" v-model="state.form.deptCode" />
          </div>

          <div>
            <label for="deptName" class="form-label">학과명</label>
            <input type="text" class="form-control" id="deptName" v-model="state.form.deptName" />
          </div>

          <div>
            <label for="deptCourse" class="form-label">학과장명</label>
            <input type="text" class="form-control" id="deptCourse" v-model="state.form.headProfId" />
          </div>

          <div>
            <label for="deptOffice" class="form-label">학과 사무실</label>
            <input type="text" class="form-control" id="deptOffice" v-model="state.form.deptOffice" />
          </div>

          <div>
            <label for="deptPhone" class="form-label">학과 전화번호</label>
            <input type="text" class="form-control" id="deptPhone" v-model="state.form.deptTel" />
          </div>

          <div>
            <label for="deptCapacity" class="form-label">학과 정원</label>
            <input type="text" class="form-control" id="deptCapacity" v-model="state.form.deptMaxStd" />
          </div>
        </div>

        <!-- 버튼은 grid 바깥 -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">학과개설</button>
        </div>
      </form>
    </div>
  </whiteBox>

  <whiteBox class="white2">
    <departMent></departMent>
  </whiteBox>

</template>

<style scoped>
  .white-box{
    min-height: auto;
    min-width: auto;
  }
 
 

.dept-form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 */
  gap: 20px;
}

.form-label {
  font-weight: 500;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>