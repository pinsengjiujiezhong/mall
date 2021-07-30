<template>
  <div class="index">
    <div class="contains">
      <NavHeader></NavHeader>
      <div>home</div>
      <router-view></router-view>
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <a :href="'/#/product/' + item.id"><img :src="item.img" alt=""></a>
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <ServicesBar></ServicesBar>
      <NavFooter></NavFooter>
    </div>
  </div>
</template>

<script>

import NavHeader from "../components/NavHeader";
import NavFooter from "../components/NavFooter";
import ServicesBar from "../components/ServicesBar";
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: "nav-home",
  components: {
    NavHeader,
    NavFooter,
    ServicesBar,
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable :true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '47',
          img: '/imgs/slider/slide-4.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .swiper-box{
    width: 1226px;
    margin: 0 auto;
    img{
      width: 100%;
    }
  }
  .swiper-container {
    width: 100%;
    height: 451px;
    --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
    --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
    --swiper-navigation-size: 30px;/* 设置按钮大小 */
  }
</style>
