<script setup>
import { reactive } from 'vue';
import { saveCourse } from '@/services/professor';
import { useRouter } from 'vue-router';
import WhiteBox from '@/components/WhiteBox.vue';

const state = reactive({
  form:{
    classroom:'',
    type:'전공',
    semester: 1,
    time: '',
    title: '',
    credit: null,
    weekPlan:'',
    textBook:'',
    goal: '',
    maxStd: null
  }
})


const router = useRouter();

const submit = async() =>{
  console.log('시작할게')
  
  const res = await saveCourse(state.form);
  console.log('알이에스:',res)

  if(res === undefined || res.status !== 200){
    alert('오류 발생. 잠시 후 다시 실행해주십시오.')
    return;
  }
  console.log('성공했나?')
  router.push('/professor/course/management')


}
</script>

<template>
  <WhiteBox>
    <div class="container">
      <p>강의</p>
        <div class="table d-flex top">
          <div class="table-title">교과목명</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
        </div>

        <div class="table d-flex">
          <div class="table-title">교과구분</div>
          <div class="table-content">
          <!-- 입력 -->
          </div>

          <div class="table-title">학과명</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
        </div>

        <div class="table d-flex">
          <div class="table-title">이수학점</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
          <div class="table-title">학기</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
        </div>

        <div class="table d-flex">
          <div class="table-title">강의시간</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
        </div>

        <div class="table d-flex last">
          <div class="table-title">수강인원</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
          <div class="table-title">강의실</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
        </div>


        <p>강의 계획서</p>
        <div class="table d-flex top">
          <div class="table-title">교재</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
        </div>
        <div class="table d-flex detail">
          <div class="table-title">강의목표</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
        </div>
        <div class="table d-flex detail last">
          <div class="table-title">주차별계획</div>
          <div class="table-content">
            <!-- 입력 -->
          </div>
        </div>


        <p>평가방법</p>

        <div class="score">
          <div class="title">
            <div>출석</div>
            <div>중간고사</div>
            <div>기말고사</div>
          </div>
          <div class="per">
            <div><span>20%</span></div>
            <div class="middle"><span>40%</span></div>
            <div><span> 40%</span> </div>
          </div>
        </div>
        
      </div>
    </WhiteBox>
</template>

<style scoped lang="scss">


.container{
  margin-top: 70px;
  max-width: 1280px;
  min-width: 1280px;
  
}


.title{
  width:100%;
  background-color: #364157;
  border-top: #000;
  color: #fff;
  display: flex;
  
  div{
    border-left: 1px solid #B7B7B7;
    border-right:1px solid #B7B7B7;
    flex:1;
    padding:10px;
    text-align: center;
    font-size: 20px;
  }
}
.per{
  display:flex;
  background-color: #fff;
  margin-bottom: 70px;
  height:120px;
  align-items: center;
  div{
    height:100%;
    flex: 1;
    text-align: center;
    font-size: 20px;
    
    span{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
}
.middle{
    border-left: 1px solid #B7B7B7;
    border-right:1px solid #B7B7B7;
  }

p{
  font-size: 20px;
  font-weight: 700;
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
  border-right: 1px solid #fff;
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