<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';

defineProps({
  courseList: Array,
  maxHeight: {
    type: String,
    default: "700px",
  },
  show: {
    type: Object,
    default: () => ({
      professorName: false,
      remStd: false,
      enroll: false,
      cancel: false,
      deptName: true,
      setting: false,
      modify: false,
    }),
  },
});
defineEmits(["enroll", "cancel", "check"]);

const change = (status) => {
  if (status === '거부') return "gray";
  if (status === '승인') return "blue";
  return "red";
};

const openModal = inject('openModal');
const openLink = (id) => {
  console.log(id);
  openModal(id);
};

const router = useRouter();
const send = (id, json) => {
  console.log("먀오:", json);
  const jsonBody = JSON.stringify(json);
  router.push({
    path: `/professor/course/${id}/students`,
    state: { data: jsonBody }
  });
};
</script>

<template>
  <div class="table-container" :style="{ maxHeight: maxHeight }">
    <table>
      <thead>
        <tr>
          <th class="code">과목코드</th>
          <th class="deptName">학과</th>
          <th class="title">교과목명</th>
          <th class="classroom">강의실</th>
          <th class="type">이수구분</th>
          <th class="professor" v-if="show.professorName">담당교수</th>
          <th class="grade">수강대상</th>
          <th class="time">강의시간</th>
          <th class="credit">학점</th>
          <th class="maxStd">정원</th>
          <th class="remStd" v-if="show.remStd">잔여</th>
          <th v-if="show.enroll || show.cancel" class="enroll-action">수강</th>
          <th v-if="show.modify" class="status">승인여부</th>
          <th v-if="show.setting || show.modify || show.check" class="button"> </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courseList" :key="course.id">
          <td class="code">{{ course.courseCode }}</td>
          <td class="deptName">
            <div v-if="course.type==='교양'">교양학부</div>
            <div v-else>{{ course.deptName }}</div>
          </td>
          <td class="title">
            <div @click="openLink(course.courseId)" class="link">{{ course.title }}</div>
          </td>
          <td class="classroom">{{ course.classroom }}</td>
          <td class="type">{{ course.type }}</td>
          <td class="professor" v-if="show.professorName">{{ course.professorName }}</td>
          <template v-if="course.grade === 0">
            <td>수강희망자</td>
          </template>
          <template v-else>
            <td class="grade">{{ course.deptName + " " + course.grade }}학년</td>
          </template>
          <td class="time">{{ course.time }}</td>
          <td class="credit">{{ course.credit }}</td>
          <td class="maxStd">{{ course.maxStd }}</td>
          <td v-if="show.modify" class="status" :class="change(course.status)">{{ course.status }}</td>
          <td class="remStd" v-if="show.remStd">{{ course.remStd }}</td>
          <td v-if="show.enroll" class="enroll-action">
            <button class="enroll-btn" :class="{ enrolled: course.enrolled }" :disabled="course.enrolled" @click="$emit('enroll', course)">
              {{ course.enrolled ? "신청완료" : "수강신청" }}
            </button>
          </td>
          <td v-else-if="show.cancel" class="enroll-action">
            <button class="cancel-btn" @click="$emit('cancel', course.courseId)">
              수강취소
            </button>
          </td>
          <td v-else-if="show.setting" class="button">
            <button class="enroll-btn" @click="send(course.courseId, course)">관리</button>
          </td>
          <td v-else-if="show.check" class="button">
              <!-- 학생관리 라우팅 처리해야함 -->
                <button class="enroll-btn" @click="$emit('check', course.courseId, course.title)">강의평 보기</button>
          </td>
          <td v-else-if="show.modify" class="button" v-if="course.status !=='승인'" >
            <router-link :to="{ name: 'ModifyCourse', params: { id: course.courseId } }" class="setting">
              <button class="enroll-btn d-flex" >수정</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.table-container {
  margin: 20px 0 0 15px;
  border-radius: 5px;
  width: 100%;
  max-width: 1430px;
  min-width: 1350px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-bottom: 1px solid #ddd;
}
thead {
  color: white;
  background-color: #364157;
}
thead th {
  position: sticky;
  top: 0;
  background-color: #364157;
  z-index: 2;
  padding: 7px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
tbody {
  text-align: center;
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
  transition: background-color 0.2s ease;
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
  &:hover {
    background-color: #D32F2F;
  }
}
.link {
  color: #2460ce;
  cursor: pointer;
}
.setting {
  padding-top: 2px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  justify-content: center;
}
.red {
  color: #d61421;
}
.gray {
  color: #28292b;
}
.blue {
  color: #2460ce;
  font-weight: 700;
}
// th.code, td.code {
//   width: 90px;
// }
th.deptName, td.deptName {
  width: 150px;
}
// th.title, td.title {
//   width: 150px;
// }
// th.classroom, td.classroom {
//   width: 140px;
// }
th.type, td.type {
  width: 100px;
}
th.professor, td.professor {
  width: 100px;
}
// th.grade, td.grade {
//   width: 150px;
// }
th.time, td.time {
  width: 80px;
}
th.credit, td.credit {
  width: 70px;
}
th.maxStd, td.maxStd {
  width: 70px;
}
th.remStd, td.remStd {
  width: 70px;
}
th.enroll-action, td.enroll-action {
  width: 100px;
}
.status{
  width: 120px;
}
.button{
  width: 150px;
}
</style>
