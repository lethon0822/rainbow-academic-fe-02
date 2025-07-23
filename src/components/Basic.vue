<script setup>
import { ref, nextTick, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const accordian = ref(null);
const route = useRoute();

const slideUp = (element) => {
  element.style.height = element.scrollHeight + "px";
  element.offsetHeight; // force reflow
  element.style.transition = "height 0.3s ease";
  element.style.height = "0px";
  element.style.overflow = "hidden";

  setTimeout(() => {
    element.style.display = "none";
    element.style.height = "";
    element.style.overflow = "";
    element.style.transition = "";
  }, 300);
};

const slideDown = (element) => {
  element.style.display = "block";
  element.style.height = "0px";
  element.style.overflow = "hidden";
  element.style.transition = "height 0.3s ease";

  nextTick(() => {
    element.style.height = element.scrollHeight + "px";

    setTimeout(() => {
      element.style.height = "";
      element.style.overflow = "";
      element.style.transition = "";
    }, 300);
  });
};

const toggleMenu = (liElement) => {
  const parentUl = liElement.parentElement;

  if (liElement.classList.contains("active")) {
    liElement.classList.remove("active");
    const subMenu = liElement.querySelector("ul");
    if (subMenu) {
      slideUp(subMenu);
      subMenu.classList.remove("show-dropdown");
    }
  } else {
    // 같은 레벨의 활성화 메뉴 모두 닫기
    const activeItems = parentUl.querySelectorAll("li.active");
    activeItems.forEach((item) => {
      item.classList.remove("active");
      const subMenu = item.querySelector("ul");
      if (subMenu) {
        slideUp(subMenu);
        subMenu.classList.remove("show-dropdown");
      }
    });

    liElement.classList.add("active");
    const subMenu = liElement.querySelector("ul");
    if (subMenu) {
      slideDown(subMenu);
      subMenu.classList.add("show-dropdown");
    }
  }
};

const handleMenuClick = (event) => {
  const link = event.target;

  if (
    link.tagName.toLowerCase() === "a" &&
    link.classList.contains("router-link")
  ) {
    // router-link 클릭 시 기본 라우팅 유지하며 메뉴 토글만 수행
    const li = link.closest("li");
    if (li) toggleMenu(li);
    return;
  }

  if (link.tagName.toLowerCase() === "a") {
    event.preventDefault();
    const li = link.closest("li");
    if (li) toggleMenu(li);
  }
};

const openMenuByRoute = () => {
  if (!accordian.value) return;

  // 기존 활성화 상태 초기화
  const activeItems = accordian.value.querySelectorAll("li.active");
  activeItems.forEach((item) => {
    item.classList.remove("active");
  });
  const shownSubMenus = accordian.value.querySelectorAll("ul.show-dropdown");
  shownSubMenus.forEach((ul) => {
    ul.classList.remove("show-dropdown");
    ul.style.display = "none";
  });

  // 현재 라우터 경로
  let path = route.path;

  // path 조정 필요 시 여기서 처리 (예: index.html 붙이기 등)
  // path가 router-link to 값과 일치해야 찾을 수 있습니다.

  // 경로에 맞는 <a> 태그 찾기
  const target = accordian.value.querySelector(`li a[href="${path}"]`);

  if (target) {
    let parent = target.parentElement;
    while (parent && parent !== accordian.value) {
      if (parent.tagName === "LI") {
        parent.classList.add("active");
        const subMenu = parent.querySelector("ul");
        if (subMenu) {
          subMenu.classList.add("show-dropdown");
          subMenu.style.display = "block";
        }
      }
      parent = parent.parentElement;
    }
  }
};

onMounted(() => {
  const menuLinks = accordian.value.querySelectorAll("a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", handleMenuClick);
  });

  openMenuByRoute();
});

watch(
  () => route.path,
  () => {
    openMenuByRoute();
  }
);
</script>

<template>
  <div id="accordian" ref="accordian">
    <ul>

      <!-- 학적 -->
      <li class="menu-hakjeok">
        <a href="javascript:void(0);">학적</a>
        <ul>
          <li>
            <router-link to="/grade/all" class="router-link">
              학적기본사항관리
            </router-link>
          </li>

          <li><a href="javascript:void(0);">학적변동관리</a></li>
        </ul>
      </li>

      <li class="menu-sugang">
        <a href="javascript:void(0);">수강</a>
        <ul>
          <li><router-link to="/attendance" class="router-link">출결입력</router-link></li>
          <li><router-link to="/gradeinput" class="router-link">성적입력</router-link></li>
          <li><router-link to="/sugang/history" class="router-link">수강조회</router-link></li>
          <li><router-link to="/enrollment" class="router-link"
              >수강신청 관리</router-link></li>
        </ul>
      </li>

      <!-- 추후 v-if설정 해야함 -->
      <li class="menu-gangui">
        <a href="javascript:void(0);">강의</a>
        <ul>
          <li><router-link to="/professor/course/status">강의등록</router-link></li>
          <li><router-link to="/professor/course/management">강의관리</router-link></li>
        </ul>
      </li>

      <li class="menu-etc">
        <a href="javascript:void(0);">기타 다른 메뉴</a>
        <ul>
          <li><a href="javascript:void(0);">Search</a></li>
          <li><a href="javascript:void(0);">Graphs</a></li>
          <li><a href="javascript:void(0);">Settings</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-weight: 700;
  background-color: #dee2e5;
}

#accordian {
  position: fixed;
  top: 60px;
  left: 0;
  width: 300px;
  height: 100vh;
  background: #dee2e5;
  overflow-y: auto;
  z-index: 999;
}

/* 스크롤바 */
#accordian::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}
#accordian::-webkit-scrollbar-track {
  background-color: #e4e4e4;
}
#accordian::-webkit-scrollbar-thumb {
  background: #0089ff;
  transition: 0.5s;
}
#accordian::-webkit-scrollbar-thumb:hover {
  background: #d5b14c;
}

/* 메뉴 기본 스타일 */
#accordian ul {
  list-style: none;
}

#accordian ul li {
  list-style: none;
  position: relative;
}

#accordian ul li > a {
  color: #333;
  background-color: white;
  text-decoration: none;
  font-size: 15px;
  display: block;
  padding: 13px 15px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1px;
  font-weight: 700;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer; /* 클릭 커서 추가 */
}

/* 상위 메뉴 노란색 배경 */
#accordian li.menu-sugang > a,
#accordian li.menu-hakjeok > a,
#accordian li.menu-gangui > a,
#accordian li.menu-etc > a {
  background-color: #febe3a;
  color: #364157;
  border: 1px solid #febe3a;
  font-weight: bold;
}

/* 하위 메뉴 */
#accordian ul li ul {
  display: none;
  margin: 0;
  position: relative;
  padding-left: 0;
  width: 100%;
}

/* 활성화된 하위 메뉴 보이기 */
#accordian ul li.active > ul.show-dropdown {
  display: block;
}

/* 하위 메뉴 링크 스타일 */
#accordian ul li ul li a {
  background-color: #ffffff !important;
  color: #333;
  border: 1px solid #ddd;
  margin-top: -2px;
  padding-left: 15px;
  cursor: pointer; /* 클릭 커서 추가 */
}

/* 하위 메뉴 활성화시에도 배경색 흰색 유지 */
#accordian ul li ul li.active > a,
#accordian ul li ul li > a.active {
  background-color: #ffffff !important;
  color: inherit !important;
  box-shadow: none !important;
}

/* 메뉴 화살표 */
#accordian a:not(:only-child):after {
  content: "\f105";
  position: absolute;
  right: 20px;
  top: 10px;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 20px;
  transition: 0.3s;
}

/* 활성 메뉴 화살표 회전 */
#accordian li.active > a:not(:only-child):after {
  transform: rotate(90deg);
}

/* 상위 메뉴 아닌 활성 메뉴 배경 투명 처리 */
#accordian li:not(.menu-sugang):not(.menu-hakjeok):not(.menu-etc):not(.menu-gangui).active > a {
  background-color: transparent;
  color: inherit;
  box-shadow: none;
}

/* 하위 메뉴 링크 포커스, 호버 시 배경색 유지 */
#accordian ul li ul li a:hover,
#accordian ul li ul li a:focus {
  background-color: #ffffff !important;
  color: inherit !important;
}
</style>
