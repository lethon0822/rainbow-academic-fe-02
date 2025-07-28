<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Login from "@/Login.vue";

import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";

const images = [img1, img2, img3, img4, img5];
</script>

<template>
  <div class="container">
    <div class="centerBorder">
      <!-- 왼쪽: 스와이프  -->
      <div class="leftSide">
        <Swiper
          :modules="[Pagination, Navigation, Autoplay]"
          :slides-per-view="1"
          :space-between="10"
          :loop="true"
          :pagination="{ clickable: true }"
          :navigation="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          class="mySwiper"
        >
          <SwiperSlide v-for="(img, idx) in images" :key="idx">
            <img :src="img" alt="슬라이드 이미지" />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- 오른쪽: 로그인  -->
      <div class="rightSide">
        <Login />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: #f0f2f5;
}

.centerBorder {
  display: flex;
  width: 100%;
  max-width: 1000px;
  height: 600px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.leftSide {
  flex: 1.2;
  position: relative;
  height: 100%;
}

.mySwiper {
  width: 100%;
  height: 100%;
}

.mySwiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rightSide {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}
</style>
