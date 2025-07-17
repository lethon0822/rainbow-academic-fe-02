<script setup>
import { onMounted, ref } from "vue";
import $ from "jquery";
import GradeTable from "@/components/GradeTable.vue";

const grades = ref([
  { subject: "수학", score: 95, status: "통과" },
  { subject: "영어", score: 88, status: "통과" },
  { subject: "과학", score: 76, status: "통과" },
]);

onMounted(() => {
  $(".tabgroup > div").hide();
  $(".tabgroup").each(function () {
    $(this).children("div:first-of-type").show();
  });

  $(".tabs").on("click", "a", function (e) {
    e.preventDefault();
    const $this = $(this);
    const tabgroup = "#" + $this.parents(".tabs").data("tabgroup");
    const others = $this.closest("li").siblings().children("a");
    const target = $this.attr("href");

    others.removeClass("active");
    $this.addClass("active");
    $(tabgroup).children("div").hide();
    $(target).show();
  });

  $(".tabs").on("click", ".tab-close", function (e) {
    e.stopPropagation();

    const $li = $(this).closest("li");
    const $a = $li.find("a");
    const targetId = $a.attr("href");
    const $content = $(targetId);
    const $tabGroup = $content.closest(".tabgroup");

    const isActive = $a.hasClass("active");

    $li.remove();
    $content.remove();

    if (isActive) {
      // 현재 탭 그룹 안에서 활성 탭 찾기
      const $next = $tabGroup.prev(".tabs").find("a").first();
      if ($next.length) {
        $next.addClass("active");
        const nextTarget = $next.attr("href");
        $tabGroup.children("div").hide();
        $(nextTarget).show();
      }
    }
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
