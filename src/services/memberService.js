// 공용 axios 인스턴스가 따로 있으면 그걸 import 하세요.
// 예) import api from '@/services/api'
import axios from 'axios';

// 전역 인스턴스가 없다면 임시 인스턴스 사용(프로젝트에 맞게 조정)
const api = axios.create({ baseURL: '' });

/**
 * 학과/역할별 명단 조회
 * ⚠️ 백엔드 요구 파라미터 이름은 snake_case 입니다: user_role, dept_id
 *
 * @param {{ role: 'student'|'professor', deptId?: number|string|null }} params
 * @returns {Promise<Array>} MemberGetRes[]
 */
export async function fetchMemberList(params) {
  const query = {
    user_role: params.role, // 필수
  };
  if (params.deptId !== undefined && params.deptId !== null && params.deptId !== '') {
    query.dept_id = params.deptId;
  }

  const { data } = await api.get('/api/staff/member', { params: query });
  // data는 배열( MemberGetRes[] ) 형태: { loginId, username, address, email, phone, deptName, status, grade }
  return data;
}