import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    login_id: "",
    user_name: "",
    email: "",
    user_role: "",
    status: "",
    grade: "",
    semester: "",
    year: "",
    dept_name: "",
    totalcredits: 0,
  }),
  actions: {
    setUserInfo(userInfo) {
      this.login_id = userInfo.login_id || "";
      this.user_name = userInfo.user_name || "";
      this.email = userInfo.email || "";
      this.user_role = userInfo.user_role || "";
      this.status = userInfo.status || "";
      this.grade = userInfo.grade || "";
      this.semester = userInfo.semester || "";
      this.year = userInfo.year || "";
      this.dept_name = userInfo.dept_name || "";
      this.totalcredits = userInfo.totalcredits || 0;
    },
    clearUserInfo() {
      this.login_id = "";
      this.user_name = "";
      this.email = "";
      this.user_role = "";
      this.status = "";
      this.grade = "";
      this.semester = "";
      this.year = "";
      this.dept_name = "";
      this.totalcredits = 0;
    },
  },
  getters: {
    // 편의를 위한 getter (기존 코드 호환성)
    userId: (state) => state.login_id,
    userName: (state) => state.user_name,
    userRole: (state) => state.user_role,
  },
  persist: true,
});
