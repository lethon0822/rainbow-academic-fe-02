<script setup>
import { ref, nextTick, onMounted } from "vue";

const accordian = ref(null);

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
    // router-link 클릭 시 기본 라우팅은 유지하고 메뉴 토글만 수행
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

onMounted(() => {
  const menuLinks = accordian.value.querySelectorAll("a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", handleMenuClick);
  });

  // **아래 현재 경로 메뉴 자동 열기 코드 삭제해서
  //  페이지 로드 시 메뉴는 모두 닫힌 상태가 됨**
  /*
  let path = window.location.pathname;
  if (path.endsWith("/")) path += "index.html";

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
  */
});
</script>

<template>
  <div id="accordian" ref="accordian">
    <ul>
      <li class="menu-components">
        <a href="javascript:void(0);">학적</a>
        <ul>
          <li><a href="javascript:void(0);">학적기본사항관리</a></li>
          <li><a href="javascript:void(0);">학적변동관리</a></li>
        </ul>
      </li>

      <li class="menu-sugang">
        <a href="javascript:void(0);">수강</a>
        <ul>
          <li>
            <router-link to="/grade/all" class="router-link"
              >수강조회</router-link
            >
          </li>
          <li><a href="javascript:void(0);">수강신청관리</a></li>
        </ul>
      </li>

      <li>
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
}

/* 상위 메뉴 노란색 배경 */
#accordian li.menu-sugang > a,
#accordian li.menu-components > a,
#accordian li.menu-calendar > a {
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
  margin-top: 1px;
  padding-left: 15px;
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
#accordian
  li:not(.menu-sugang):not(.menu-components):not(.menu-calendar).active
  > a {
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
