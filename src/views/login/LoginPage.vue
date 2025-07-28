<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Login from "@/views/login/Login.vue";

import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";

const images = [img1, img2, img3, img4, img5];

</script>

<template>
  <router-view />
  <div class="container">
    <div class="centerBorder">
      <!-- 왼쪽: 스와이프  -->
      <div class="leftSide">
        <div class="swiper-wrapper-container">
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
      </div>

      <!-- 오른쪽: 로그인  -->
      <div class="rightSide">
        <Login />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 기존 스타일 그대로 유지 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: #f0f2f5;
  box-sizing: border-box;
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
  min-width: 0;
  min-height: 0;
}

.leftSide {
  flex: 1.2;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.swiper-wrapper-container {
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
}

.mySwiper {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  top: 0;
  left: 0;
}

.mySwiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rightSide {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-width: 0;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #fff;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 16px;
}

@media (max-width: 768px) {
  .centerBorder {
    flex-direction: column;
    height: auto;
    min-height: 600px;
  }

  .leftSide {
    flex: none;
    height: 300px;
  }

  .rightSide {
    flex: none;
    height: auto;
  }
}
</style>
