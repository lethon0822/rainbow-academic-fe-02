<script setup>
import Header from "@/components/Header.vue";
import { reactive, provide } from "vue";
import CourseDetail from "./components/CourseDetail.vue";


const show =reactive({
  modal: false,
  id: null
})



const openModal = (id) =>{  
  console.log('id:',id)
  show.modal= true;
  show.id = id
  console.log('show.id',show.id)
}

provide('openModal', openModal)
</script>

<template>
  <template v-if="show.modal">
    <div class="black-bg">
      <div class="cover">
        <div class="white-bg">
          <div @click="show.modal=false" class="close">⨯</div>
          <CourseDetail :id="show.id" />
        </div>
      </div>
    </div>
  </template>

  <Header />
  <router-view />
</template>

<style lang="scss">
  body {
  margin : 0;
}
div {
  box-sizing: border-box;
}

.black-bg {
  display: flex;
  width: 100%;
  height:100vh;
  background: rgba(0,0,0,0.5);
  position: fixed; 
  padding: 20px;
  z-index: 20;
  justify-content: center;
  align-items: center;
}

.cover{
  overflow: hidden;
  border-radius: 8px;
  
}

.close{
  font-size: 20px;
  font-weight: 800;
  background-color: #2460ce;
  color: #fff;
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  margin-left: auto;
  border-radius: 8px;
  line-height: 30px;
  
}

.white-bg {
  justify-content: center;
  width: 100%px;
  height: 80vh;
  background: white;
  padding: 20px;
  z-index: 100;
  overflow-y: auto;
  
} 

</style>
