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
          <div class="tab">
            <label for="deptCode" class="form-label"><b>학과코드</b></label>
            <input type="text" class="form-control" id="deptCode" v-model="state.form.deptCode" />
          </div>

          <div class="tab">
            <label for="deptName" class="form-label"><b>학과명</b></label>
            <input type="text" class="form-control" id="deptName" v-model="state.form.deptName" />
          </div>

          <div class="tab">
            <label for="deptCourse" class="form-label"><b>학과장명</b></label>
            <input type="text" class="form-control" id="deptCourse" v-model="state.form.headProfId" />
          </div>

          <div class="tab">
            <label for="deptOffice" class="form-label"><b>학과 사무실</b></label>
            <input type="text" class="form-control" id="deptOffice" v-model="state.form.deptOffice" />
          </div>

          <div class="tab">
            <label for="deptPhone" class="form-label"><b>학과 전화번호</b></label>
            <input type="text" class="form-control" id="deptPhone" v-model="state.form.deptTel" />
          </div>

          <div class="tab">
            <label for="deptCapacity" class="form-label"><b>학과 정원</b></label>
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
    <div>
      <div>
        <input type="text">
      </div>
      <select name="filter">
        <option value="전체"></option>
        <option value="1">운영중</option>
        <option value="0">폐지</option>
      </select>
    </div>
    <departMent></departMent>
  </whiteBox>

</template>

<style scoped>
.white-box{
  min-height: auto;
  min-width: 1270px;
  width: 1550px;
  margin-top: 20px;
}
  .line{
    margin-bottom: 10px;
  }




.dept-form-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 */
  gap: 15px;
}

.tab{
  padding:10px;
}
.form-label {
  font-weight: 500;
}

label{
  font-weight: 700;
}

input{
  border-radius: 10px;
  background-color: #F8F9FA;
  border: 1px solid #E5E7EB;
  
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.white2{
  max-height: 500px;
}
</style>