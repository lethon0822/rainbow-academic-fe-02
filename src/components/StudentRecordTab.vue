<script setup>
import { onMounted } from "vue";
import GradeTable from "@/components/GradeTable.vue";

// 상위 컴포넌트에서 props로 전달받음
const props = defineProps({
  grades: {
    type: Array,
    required: true,
  },
});

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

  // 활성 탭에 해당하는 콘텐츠 보이기
  const activeTab = document.querySelector(".tabs a.active");
  if (activeTab) {
    const activeTarget = activeTab.getAttribute("href");
    const activeContent = document.querySelector(activeTarget);
    if (activeContent) {
      activeContent.style.display = "block";
    }
  } else {
    // active 클래스가 없으면 첫 번째 탭을 활성화
    const firstTab = document.querySelector(".tabs a");
    if (firstTab) {
      firstTab.classList.add("active");
      const firstTarget = firstTab.getAttribute("href");
      const firstContent = document.querySelector(firstTarget);
      if (firstContent) {
        firstContent.style.display = "block";
      }
    }
  }

  // 탭 클릭 이벤트 추가
  const tabLinks = document.querySelectorAll(".tabs a");
  tabLinks.forEach((link) => {
    link.addEventListener("click", handleTabClick);
  });

  // 탭 닫기 이벤트 추가 (필요한 경우)
  const closeButtons = document.querySelectorAll(".tab-close");
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", handleTabClose);
  });
});
</script>

<template>
  <div class="wrapper">
    <ul class="tabs clearfix" data-tabgroup="tab-group-2">
      <li><a href="#tab1-2">학적사항</a></li>
      <li><a href="#tab2-2">기본정보</a></li>
      <li><a href="#tab3-2" class="active">수업/성적</a></li>
      <li><a href="#tab4-2">등록</a></li>
      <li><a href="#tab5-2">장학</a></li>
    </ul>

    <section id="tab-group-2" class="tabgroup">
      <div id="tab1-2">
        <h5>학적세부사항</h5>
      </div>
      <div id="tab2-2">
        <h5>개인신상</h5>
      </div>
      <div id="tab3-2">
        <h5>수업/성적 조회</h5>
        <GradeTable :grades="grades" />
      </div>
      <div id="tab4-2">
        <h5>등록현황 조회</h5>
      </div>
      <div id="tab5-2">
        <h5>장학현황 조회</h5>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  margin: 30px auto;
  width: 80%;
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
  width: 8%;
  margin-right: 8px;
  position: relative;
}

.tabs a {
  display: block;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  padding: 10px 0;
  font-size: 15px;
  border-bottom: 1px solid #888;
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
  margin-bottom: 10px;
  background-color: #fff;
  clear: both;
  width: 99.2%;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
</style>
