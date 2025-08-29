<script setup>
import Header from "@/components/common/Header.vue";
import SideBar from "@/components/common/SideBar.vue";
import DeptUpdateModal from "@/components/management/DeptUpdateModal.vue";
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
      <DeptUpdateModal/>
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
  width:250px;
  box-sizing: border-box;
  
}
.dummy{
  width: 250px;
}
.content{
  flex:1;

  
}
.router{
  min-width: 1580px;
}

</style>
