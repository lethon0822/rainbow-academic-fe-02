<script setup>
import { reactive } from 'vue';

const state = reactive({
  form:{

  }
})

</script>

<template>

  <div class="container">
    <h2 class="title">강의등록</h2>
    
    <div class="d-flex top last">
        <div class="table-title">교수번호</div>
        <div class="table-content">
          <input type="text">
        </div>
    </div>
    
    <form>
      <p>개설신청</p>
      <div class="table d-flex top">
        <div class="table-title">교과목명</div>
        <div class="table-content">
          <input type="text">
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">교과구분</div>
        <div class="table-content">
          <select>
            <option>전공</option>
            <option>교양</option>
          </select>
        </div>
        <div class="table-title">학과명</div>
        <div class="table-content">
          <input type="text">
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">이수학점</div>
        <div class="table-content">
          <input type="text">
        </div>
        <div class="table-title">학기</div>
        <div class="table-content">
          <select>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
      </div>

      <div class="table d-flex">
        <div class="table-title">강의시간</div>
        <div class="table-content">
          <input type="text">
        </div>
      </div>

      <div class="table d-flex last">
        <div class="table-title">수강인원</div>
        <div class="table-content">
          <input type="text">
        </div>
        <div class="table-title">강의실</div>
        <div class="table-content">
          <input type="text">
        </div>
      </div>


      <p>강의 계획서</p>
      <div class="table d-flex top">
        <div class="table-title">교재</div>
        <div class="table-content">
          <input type="text">
        </div>
      </div>
      <div class="table d-flex detail">
        <div class="table-title">강의목표</div>
        <div class="table-content">
          <input type="text">
        </div>
      </div>
      <div class="table d-flex detail last">
        <div class="table-title">주차별계획</div>
        <div class="table-content">
          <input type="text">
        </div>
      </div>

      <div class="button">
        <button class="btn btn-primary mt-3">저장</button>
      </div>
    </form>
  </div>

</template>

<style scoped lang="scss">


.container{
  max-width: 1280px;
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
  border: 1px solid #B7B7B7;
  background-color: #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #364157;
  margin-bottom: 0;
  border-bottom: 0.5px;
  

}
select{
  width: 120px;
  background-color:#e2e2e2;
  color:#4d4d4d
}

.top{
border-top: 3px solid #000;
}
.last{
  border-bottom: 1px solid #B7B7B7;
}

.table-title{
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
</style>