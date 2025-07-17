<script setup>
import { onMounted, ref } from "vue";
import GradeTable from "@/components/GradeTable.vue";

const handleTabClick = (event) => {
  event.preventDefault();

  const link = event.target;
  const tabgroup = "#" + link.closest(".tabs").dataset.tabgroup;
  const siblings = link.closest("li").parentElement.querySelectorAll("a");
  const target = link.getAttribute("href");

  // 다른 탭들 비활성화
  siblings.forEach((sibling) => sibling.classList.remove("active"));

  // 현재 탭 활성화
  link.classList.add("active");

  // 모든 탭 콘텐츠 숨기기
  const tabGroupElement = document.querySelector(tabgroup);
  const allContents = tabGroupElement.querySelectorAll("div");
  allContents.forEach((content) => (content.style.display = "none"));

  // 선택된 탭 콘텐츠만 보이기
  const targetContent = document.querySelector(target);
  if (targetContent) {
    targetContent.style.display = "block";
  }
};

const handleTabClose = (event) => {
  event.stopPropagation();

  const closeBtn = event.target;
  const li = closeBtn.closest("li");
  const link = li.querySelector("a");
  const targetId = link.getAttribute("href");
  const content = document.querySelector(targetId);
  const tabGroup = content.closest(".tabgroup");

  const isActive = link.classList.contains("active");

  // 탭과 콘텐츠 제거
  li.remove();
  content.remove();

  // 활성 탭이 제거된 경우 다른 탭 활성화
  if (isActive) {
    const tabsContainer = tabGroup.previousElementSibling;
    const nextTab = tabsContainer.querySelector("a");
    if (nextTab) {
      nextTab.classList.add("active");
      const nextTarget = nextTab.getAttribute("href");

      // 모든 콘텐츠 숨기기
      const allContents = tabGroup.querySelectorAll("div");
      allContents.forEach((content) => (content.style.display = "none"));

      // 다음 탭 콘텐츠 보이기
      const nextContent = document.querySelector(nextTarget);
      if (nextContent) {
        nextContent.style.display = "block";
      }
    }
  }
};

onMounted(() => {
  // 모든 탭 콘텐츠 숨기기
  const allTabContents = document.querySelectorAll(".tabgroup > div");
  allTabContents.forEach((content) => (content.style.display = "none"));

  // 각 탭 그룹의 첫 번째 콘텐츠만 보이기
  const tabGroups = document.querySelectorAll(".tabgroup");
  tabGroups.forEach((group) => {
    const firstContent = group.querySelector("div:first-of-type");
    if (firstContent) {
      firstContent.style.display = "block";
    }
  });

  // 탭 클릭 이벤트 추가
  const tabLinks = document.querySelectorAll(".tabs a");
  tabLinks.forEach((link) => {
    link.addEventListener("click", handleTabClick);
  });

  // 탭 닫기 이벤트 추가
  const closeButtons = document.querySelectorAll(".tab-close");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", handleTabClose);
  });
});
</script>

<template>
  <div class="wrapper">
    <ul class="tabs clearfix" data-tabgroup="tab-group-1">
      <li>
        <a href="#tab1-1" class="active">수업/성적</a
        ><span class="tab-close">×</span>
      </li>
      <li><a href="#tab2-1">Tab 2</a><span class="tab-close">×</span></li>
      <li><a href="#tab3-1">Tab 3</a><span class="tab-close">×</span></li>
      <li><a href="#tab4-1">Tab 4</a><span class="tab-close">×</span></li>
      <li><a href="#tab5-1">Tab 5</a><span class="tab-close">×</span></li>
    </ul>

    <section id="tab-group-1" class="tabgroup">
      <div id="tab1-1">
        <GradeTable :grades="grades" />
      </div>
      <div id="tab2-1">
        <h2>Heading 2</h2>
        <p>Tab 2 content...</p>
      </div>
      <div id="tab3-1">
        <h2>Heading 3</h2>
        <p>Tab 3 content...</p>
      </div>
      <div id="tab4-1">
        <h2>Heading 4</h2>
        <p>Tab 4 content...</p>
      </div>
      <div id="tab5-1">
        <h2>Heading 5</h2>
        <p>Tab 5 content...</p>
      </div>
    </section>
  </div>

  <div class="wrapper">
    <ul class="tabs clearfix" data-tabgroup="tab-group-2">
      <li>
        <a href="#tab1-2" class="active">수업/성적</a>
      </li>
      <li><a href="#tab2-2">Tab 2</a></li>
      <li><a href="#tab3-2">Tab 3</a></li>
      <li><a href="#tab4-2">Tab 4</a></li>
      <li><a href="#tab5-2">Tab 5</a></li>
    </ul>

    <section id="tab-group-2" class="tabgroup">
      <div id="tab1-2">
        <GradeTable :grades="grades" />
      </div>
      <div id="tab2-2">
        <h2>Heading 2</h2>
        <p>Tab 2 content...</p>
      </div>
      <div id="tab3-2">
        <h2>Heading 3</h2>
        <p>Tab 3 content...</p>
      </div>
      <div id="tab4-2">
        <h2>Heading 4</h2>
        <p>Tab 4 content...</p>
      </div>
      <div id="tab5-2">
        <h2>Heading 5</h2>
        <p>Tab 5 content...</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 30px auto;
  width: 80%;
  font-family: sans-serif;
  color: #555;
  font-size: 14px;
  line-height: 24px;
}

.tabs {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tabs li {
  float: left;
  width: 20%;
  position: relative;
}

.tabs a {
  display: block;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  padding: 20px 0;
  border-bottom: 2px solid #888;
  background: #a2a2a2;
}

.tabs a:hover {
  background: #f7f7f7;
  color: #888;
  cursor: pointer;
}

.tabs a.active {
  background: #2460ce;
  color: white;
}

.tab-close {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 16px;
  color: #888;
  cursor: pointer;
  font-weight: bold;
}

.tab-close:hover {
  color: #000;
}

.tabgroup div {
  padding: 15px;
  background-color: #fff;
  clear: both;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
</style>
