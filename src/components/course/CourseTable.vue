 <script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';

defineProps({
  courseList: Array,
  maxHeight: {
    type: String,
    default: "800px",
  },
  show: {
    //
    type: Object,
    default: () => ({
      professorName: false,
      remStd: false,
      enroll: false,
      cancel: false,
      deptName: true,
      setting: false, //학생관리
      modify: false, // 강의 신청 조회시 수정 버튼 활성화
      check: false,  //강의 평가 조회
    }),
  },
});
defineEmits(["enroll", "cancel","check"]);
// 승인여부 css 변경
const change = (status) =>{
  if(status === '거부'){
    return "gray"
  }else if(status === '승인'){
    return "blue"
  }
  return "red"
}
// 강의계획서 새 창 띄우기
//const link = ref(/course/detail);

const openModal = inject('openModal')
const openLink = (id) => {
  // window.open(`/course/detail/${id}`, '_blank', 'width= 1200px,height=800px,scrollbars=yes');
  console.log(id)
  openModal(id);
};

// 강의 관리로 이동 
const router = useRouter();
const send = (id, json) =>{

  const jsonBody = JSON.stringify(json);
  router.push({
    path:`/professor/course/${id}/students`,
    state: {
      data:jsonBody
    }
  })

}
</script>
<template>
  <div class="table-container" :style="{ maxHeight: maxHeight }">
    <table>
      <thead>
        <tr>
          <th>과목코드</th>
          <th>학과</th>
          <th>교과목명</th>
          <th>강의실</th>
          <th>이수구분</th>
          <th v-if="show.professorName">담당교수</th>
          <th>수강대상</th>
          <th>강의시간</th>
          <th class="credit">학점</th>
          <th class="people">{{ show.setting === true ? "수강인원" : "정원" }}</th>
          <th v-if="show.remStd">잔여</th>
          <th v-if="show.enroll || show.cancel">수강</th>
          <th v-if="show.modify">승인여부</th>
          <th v-if="show.setting || show.modify || show.check"> </th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courseList" :key="course.id">
          <td>{{ course.courseCode }}</td>
          <td>
            <div v-if="course.type==='교양'">교양학부</div>
            <div v-else >{{ course.deptName }}</div>
          </td>
        
          <td>
            <div v-if="show.modify">{{ course.title }}</div>
            <div v-else @click="openLink(course.courseId)" class="link">{{ course.title }}</div>
          </td>
          <td>{{ course.classroom }}</td>
          <td>{{ course.type }}</td>
          <td v-if="show.professorName">{{ course.professorName }}</td>
          <template v-if="course.grade === 0 ">
            <td>수강희망자</td>
          </template>
          <template v-else>
            <td>{{ course.deptName + " " + course.grade }}학년</td>
          </template>
          <td>{{ course.time }}</td>
          <td class="credit">{{ course.credit }}</td>
          <td class="people">{{ show.setting === true ? course.maxStd - course.remStd : course.maxStd  }}</td>
          <td v-if="show.modify" class="status" :class="change(course.status)">{{ course.status }}</td> <!-- 승인여부 뜨기 -->
          <td v-if="show.remStd">{{ course.remStd }}</td>
          <td v-if="show.enroll">
            <button class="enroll-btn" :class="{enrolled: course.enrolled}" :disabled="course.enrolled" @click="$emit('enroll', course)">
              {{ course.enrolled ? "신청완료": "수강신청" }}
            </button>
          </td>
          <td v-else-if="show.cancel">
            <button class="cancel-btn" @click="$emit('cancel', course.courseId)">
              수강취소
            </button>
          </td>
          <td v-else-if="show.setting">
              <!-- 학생관리 라우팅 처리해야함 -->
                <button class="enroll-btn" @click="send(course.courseId, course)">관리</button>
          </td>
          <td v-else-if="show.check">
              <!-- 학생관리 라우팅 처리해야함 -->
                <button class="enroll-btn" @click="$emit('check', course.courseId)">강의평 보기</button>
          </td>
          <td v-else-if="show.modify && course.status !=='승인' ">
              <!-- 강의 수정 라우팅 처리해야함 -->
              <router-link :to="{name:'ModifyCourse', params:{id: course.courseId }}" class="setting" >
                <button class="enroll-btn ">수정</button>
              </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>
<style lang="scss">

.table-container {
  margin: 20px;
  margin-left: 15px;
  border-radius: 5px;
  width: 100%;
  max-width: 1430px;
  min-width: 1350px;
  overflow-y: auto; // 세로 스크롤
  scrollbar-gutter: stable; //스크롤바로 인해 테이블 컬럼 정렬 깨짐 방지
}
table {
  width: 100%;
  table-layout: fixed; // 열 너비 일정하게 주기
  border-collapse: collapse;
  border-bottom: 1px solid #ddd;
}
thead {
  color: white;
  background-color: #364157;
}
thead th {
  //스크롤시 헤더 고정하는 부분 및 스타일 적용
  position: sticky; //스크롤 해도 헤더가 상단에 고정되도록 하기 위함
  top: 0; // 가장 가까운 overflow 조상 요소기준 최상단(0px) 위치에 고정 (table-container)
  background-color: #364157; /* 스티키는 기본 배경색 투명이므로 배경색 다시 지정*/
  z-index: 2; // 스티키 헤더가 다른 요소보다 위에 떠있게 설정
  padding: 7px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
tbody {
  text-align: center; // 내용 가운데 정렬
  color: black;
}
tbody tr {
  border-bottom: 1px solid #ddd;
  height: 30px;
}
button {
  color: white;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  margin: 5px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease; // 버튼 클릭시 툭 바뀌는 게 아닌 0.2초 동안 천천히 바뀜
}
button.enroll-btn {
  background-color: #2460CE;
  color: #fff;
  &:hover {
    background-color: #1F53B5;
  }
}

.enroll-btn.enrolled {
  background-color: gray;
  cursor: not-allowed;

  &:hover {
    background-color: gray;
  }
}

button.cancel-btn {
  background-color: #F44336;
  color: white;
  &:hover {
    background-color: #D32F2F;
  }
}
.link{
  color:#2460ce;
  cursor: pointer;
}
.setting{
  padding-top: 2px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color:#fff;
  font-weight: 4;
  justify-content: center;
}

.credit, .people{
  width: 90px;
}
.red{
  color:#d61421;
}
.gray{
  color:#28292b;
}
.blue{
  color:#2460ce;
  font-weight: 700;
}


</style> 