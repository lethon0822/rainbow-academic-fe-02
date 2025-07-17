<script setup>
import { onMounted, ref, nextTick } from "vue";

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

const handleMenuClick = (event) => {
  event.preventDefault();

  const link = event.target;
  const closestLi = link.closest("li");
  const closestUl = closestLi.parentElement;

  if (closestLi.classList.contains("active")) {
    // 이미 활성화된 메뉴면 닫기
    closestLi.classList.remove("active");
    const subMenu = closestLi.querySelector("ul");
    if (subMenu) {
      slideUp(subMenu);
      subMenu.classList.remove("show-dropdown");
    }
  } else {
    // 같은 레벨의 활성화 메뉴 모두 닫기
    const activeItems = closestUl.querySelectorAll("li.active");
    activeItems.forEach((item) => {
      item.classList.remove("active");
      const subMenu = item.querySelector("ul");
      if (subMenu) {
        slideUp(subMenu);
        subMenu.classList.remove("show-dropdown");
      }
    });

    // 클릭한 메뉴 열기
    closestLi.classList.add("active");
    const subMenu = closestLi.querySelector("ul");
    if (subMenu) {
      slideDown(subMenu);
      subMenu.classList.add("show-dropdown");
    }
  }
};

onMounted(() => {
  // 메뉴 클릭 이벤트 추가
  const menuLinks = accordian.value.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", handleMenuClick);
  });

  // 페이지 로드시 현재 경로에 맞는 메뉴 활성화
  let path = window.location.pathname.split("/").pop();
  if (path === "") path = "index.html";

  const target = accordian.value.querySelector(`li a[href="${path}"]`);
  if (target) {
    // 상위 메뉴들 활성화
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
});
</script>

<template>
  <div id="accordian" ref="accordian">
    <ul>
      <li class="menu-sugang">
        <a href="javascript:void(0);"> 수강정보 </a>
        <ul>
          <li><a href="javascript:void(0);">수강조회</a></li>
          <li><a href="javascript:void(0);">Search</a></li>
          <li><a href="javascript:void(0);">Graphs</a></li>
          <li><a href="javascript:void(0);">Settings</a></li>
        </ul>
      </li>
      <li class="menu-components">
        <a href="javascript:void(0);"> Components </a>
        <ul>
          <li><a href="javascript:void(0);">Today's tasks</a></li>
          <li>
            <a href="javascript:void(0);">DrillDown (active)</a>
            <ul>
              <li><a href="javascript:void(0);">Today's tasks</a></li>
              <li><a href="javascript:void(0);">Urgent</a></li>
              <li>
                <a href="javascript:void(0);">Overdues</a>
                <ul>
                  <li><a href="javascript:void(0);">Today's tasks</a></li>
                  <li><a href="javascript:void(0);">Urgent</a></li>
                  <li><a href="javascript:void(0);">Overdues</a></li>
                  <li><a href="javascript:void(0);">Recurring</a></li>
                  <li>
                    <a href="javascript:void(0);">Calendar</a>
                    <ul>
                      <li><a href="javascript:void(0);">Current Month</a></li>
                      <li><a href="javascript:void(0);">Current Week</a></li>
                      <li><a href="javascript:void(0);">Previous Month</a></li>
                      <li><a href="javascript:void(0);">Previous Week</a></li>
                      <li><a href="javascript:void(0);">Next Month</a></li>
                      <li><a href="javascript:void(0);">Next Week</a></li>
                      <li><a href="javascript:void(0);">Team Calendar</a></li>
                      <li>
                        <a href="javascript:void(0);">Private Calendar</a>
                      </li>
                      <li><a href="javascript:void(0);">Settings</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><a href="javascript:void(0);">Recurring</a></li>
              <li><a href="javascript:void(0);">Settings</a></li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);">Overdues</a>
            <ul>
              <li><a href="javascript:void(0);">Today's tasks</a></li>
              <li><a href="javascript:void(0);">Urgent</a></li>
              <li><a href="javascript:void(0);">Overdues</a></li>
              <li><a href="javascript:void(0);">Recurring</a></li>
              <li><a href="javascript:void(0);">Settings</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0);">Recurring</a></li>
          <li><a href="javascript:void(0);">Settings</a></li>
        </ul>
      </li>
      <li class="menu-calendar">
        <a href="javascript:void(0);"> Calendar </a>
        <ul>
          <li><a href="javascript:void(0);">Current Month</a></li>
          <li><a href="javascript:void(0);">Current Week</a></li>
          <li><a href="javascript:void(0);">Previous Month</a></li>
          <li><a href="javascript:void(0);">Previous Week</a></li>
          <li><a href="javascript:void(0);">Next Month</a></li>
          <li><a href="javascript:void(0);">Next Week</a></li>
          <li><a href="javascript:void(0);">Team Calendar</a></li>
          <li><a href="javascript:void(0);">Private Calendar</a></li>
          <li><a href="javascript:void(0);">Settings</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #dee2e5;
  font-family: "Noto Sans KR", Arial, Verdana, sans-serif;
  font-weight: 700;
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
  font-family: "Noto Sans KR", Arial, Verdana, sans-serif;
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
  padding-left: 0; /* 들여쓰기 제거 */
  width: 100%; /* 상위 메뉴와 같은 너비 */
}

/* 활성화된 하위 메뉴 보이기 */
#accordian ul li.active > ul.show-dropdown {
  display: block;
}

/* 하위 메뉴 링크 스타일 */
#accordian ul li ul li a {
  background-color: #ffffff !important; /* 항상 흰색 유지 */
  color: #333;
  border: 1px solid #ddd;
  margin-top: 1px;
  padding-left: 15px; /* 필요시 조절 가능 */
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
