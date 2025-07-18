<script setup>
import lockIcon from "@/assets/lock-fill.svg";
import logo from "@/assets/logoW.svg";
</script>

<template>
  <header>
    <div
      class="navbar navbar-dark text-white shadow-sm"
      style="background-color: #364157; height: 60px"
    >
      <div
        class="container-fluid d-flex justify-content-between align-items-center px-4"
      >
        <!-- 로고 왼쪽 -->
        <div class="logo d-flex align-items-center" @click="$router.push('/')">
          <img :src="logo" alt="로고 아이콘" height="40" />
          <span class="systemText" @click="$router.push('/')"
            >학사관리시스템</span
          >
        </div>

        <!-- 메뉴 오른쪽 -->
        <div class="menus d-flex align-items-center gap-3">
          <span>님 반갑습니다</span>
          <span class="divider">|</span>
          <img
            :src="lockIcon"
            alt="로그인 아이콘"
            width="20"
            height="20"
            style="filter: invert(1)"
          />
          <a href="#" class="text-white text-decoration-none">로그인</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #364157;
  padding: 10px 20px;
  height: 60px;
}

body,
main,
#app {
  padding-top: 60px;
}

.logo img {
  position: relative;
  left: -20px;
  display: block;
  height: 45px;
  cursor: pointer;
}

.menus {
  position: relative;
  top: -2px;
  display: flex;
  gap: 20px;
}

.menus a {
  cursor: pointer;
  color: #fff;
  text-decoration: none;
}

.divider {
  color: #fff;
  user-select: none;
}

.systemText {
  position: relative;
  top: -2px;
  left: -12px;
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
}
</style>
