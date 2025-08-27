<script setup>
import { reactive } from 'vue';

const departments = reactive([
  {
    code: 'ILU3876',
    name: '컴퓨터전공',
    office: '공학관 301호',
    head: '컴퓨터전공',
    phone: '02-1234-5678',
    capacity: 100,
    status: '처리중'
  },
  // 필요하면 다른 학과 데이터 추가 가능
]);

</script>

<template>
  <div class="container">
    <div class="table-wrapper">
      <table class="dept-table">
        <thead>
          <tr>
            <th>학과코드</th>
            <th>학과</th>
            <th>학과사무실</th>
            <th>학과장명</th>
            <th>학과 전화번호</th>
            <th>학과 정원</th>
            <th>상태</th>
            <th>수강</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dept in departments" :key="dept.code">
            <td>{{ dept.code }}</td>
            <td>{{ dept.name }}</td>
            <td>{{ dept.office }}</td>
            <td>{{ dept.head }}</td>
            <td>{{ dept.phone }}</td>
            <td>{{ dept.capacity }}명</td>
            <td>
              <span :class="dept.status === '처리중' ? 'status-processing' : 'status-complete'">{{ dept.status }}</span>
            </td>
            <td>
              <button class="btn-edit">수정</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* 전체 컨테이너 */
.container {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
}

/* 가로 스크롤 가능 */
.table-wrapper {
  overflow-x: auto;
}

/* 테이블 기본 스타일 */
.dept-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}


.dept-table th {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  font-weight: 600;
  text-align: center; /* 가운데 정렬 */
  color: #333;
}

/* 테이블 바디 */
.dept-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  text-align: center; /* 가운데 정렬 */
  color: #555;
}

/* 행 호버 효과 */
.dept-table tbody tr:hover {
  background-color: #f9f9f9;
}

/* 상태 색상 */
.status-processing {
  color: #e53e3e; /* 빨간색 */
  font-weight: 500;
}

.status-complete {
  color: #38a169; /* 초록색 */
  font-weight: 500;
}

/* 버튼 스타일 */
.btn-edit {
  background-color: #3182ce;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.btn-edit:hover {
  background-color: #2b6cb0;
}

</style>