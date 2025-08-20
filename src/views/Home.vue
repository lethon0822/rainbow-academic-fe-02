<script setup>
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue";

</script>

<template>
  <div>
    <Header />
  </div>
  <div class="d-flex main">
    
    <div class="sidebar">
      <div class="dummy"></div>
      <SideBar/>
    </div>
    <div class="content d-flex">
      <div class="router">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main{
  margin-top:60px;
}
.sidebar{
  width:300px;
  box-sizing: border-box;
  
}
.dummy{
  width: 300px;
}
.content{
  flex:1;
  //justify-content: center;
  
}
.router{
  min-width: 1580px;
}

// .content {
//   position: relative;
//   top: 65px;
//   left: 150px;
// }

// .sidebar {
//   position: absolute;
//   left: 0;
//   top: 65px;
//   width: 140px;
// }
</style>
