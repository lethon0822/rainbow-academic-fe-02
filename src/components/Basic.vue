<script setup>
import { onMounted } from "vue";
import $ from "jquery";

onMounted(() => {
  $("#accordian a").click(function () {
    const link = $(this);
    const closest_li = link.closest("li");
    const closest_ul = closest_li.parent();

    if (closest_li.hasClass("active")) {
      // 이미 활성화된 메뉴면 닫기
      closest_li.removeClass("active");
      closest_li.children("ul").slideUp().removeClass("show-dropdown");
    } else {
      // 같은 레벨의 활성화 메뉴 모두 닫기
      closest_ul
        .children("li.active")
        .removeClass("active")
        .children("ul")
        .slideUp()
        .removeClass("show-dropdown");

      // 클릭한 메뉴 열기
      closest_li.addClass("active");
      closest_li.children("ul").slideDown().addClass("show-dropdown");
    }
  });

  // 페이지 로드시 현재 경로에 맞는 메뉴 활성화
  let path = window.location.pathname.split("/").pop();
  if (path === "") path = "index.html";
  const target = $(`#accordian li a[href="${path}"]`);
  target.parents("li").addClass("active");
  target.parents("ul").addClass("show-dropdown");
});
</script>

<template>
  <div id="accordian">
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
