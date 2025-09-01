import { reactive } from "vue";
import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", () => {
  const state = reactive({
    checked: false,
    loggedIn: false,
  });
  const setChecked = (val) => (state.checked = val);

  const setLoggedIn = (val) => (state.loggedIn = val);

  return { state, setChecked, setLoggedIn };
});

export const useUserStore = defineStore("user", {
  state: () => ({
    userName: "",
    userId: 0,
    loginId: "",
    userRole: "",
    semesterId: 0,
    deptName: "",
  }),
  persist: true, // 옵션: 새로고침 후에도 유지하고 싶으면
});
