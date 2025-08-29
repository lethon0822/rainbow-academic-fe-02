import axios from "@/services/httpRequester"

export const getMemberList = async (params) => {
  const { data } = await axios.get('/staff/member', { params }); // ← 핵심: { params }
  return data; // 배열(List<MemberGetRes>)만 반환
};