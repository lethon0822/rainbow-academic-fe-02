<script setup>
import { ref } from "vue";
import GradeTable from "@/components/profile/TabGradeTable.vue";
import TabAcademicStatus from "@/components/profile/TabAcademicStatus.vue";
import TabBasicInfo from "@/components/profile/TabBasicInfo.vue";

const props = defineProps({
  grades: {
    type: Array,
    required: true,
  },
});

const activeTabIndex = ref(0);

function selectTab(index) {
  activeTabIndex.value = index;
}
</script>

<template>
  <div class="wrapper">
    <ul class="tabs clearfix" data-tabgroup="tab-group-2">
      <li :class="{ active: activeTabIndex === 0 }">
        <a href="#" @click.prevent="selectTab(0)">학적사항</a>
      </li>
      <li :class="{ active: activeTabIndex === 1 }">
        <a href="#" @click.prevent="selectTab(1)">기본정보</a>
      </li>
      <li :class="{ active: activeTabIndex === 2 }">
        <a href="#" @click.prevent="selectTab(2)">수업/성적</a>
      </li>
      <li :class="{ active: activeTabIndex === 3 }">
        <a href="#" @click.prevent="selectTab(3)">등록</a>
      </li>
      <li :class="{ active: activeTabIndex === 4 }">
        <a href="#" @click.prevent="selectTab(4)">장학</a>
      </li>
    </ul>

    <section id="tab-group-2" class="tabgroup">
      <div v-show="activeTabIndex === 0">
        <h5>학적세부사항</h5>
        <TabAcademicStatus />
      </div>
      <div v-show="activeTabIndex === 1">
        <h5>개인 신상</h5>
        <TabBasicInfo />
      </div>
      <div v-show="activeTabIndex === 2">
        <h5>수업/성적 조회</h5>
        <GradeTable :grades="grades" />
      </div>
      <div v-show="activeTabIndex === 3">
        <h5>등록현황 조회</h5>
      </div>
      <div v-show="activeTabIndex === 4">
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
  cursor: pointer;
}

.tabs a:hover {
  background: #f7f7f7;
  color: #888;
}

.tabs li.active a {
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
