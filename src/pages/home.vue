<template>
  <div class="index">
    <div class="contains">
      <NavHeader></NavHeader>
      <div>home</div>
      <router-view></router-view>
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="nav-warp">
            <li class="nav-item">
              <a href="javascript:;" class="nav-class">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" :key="i">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub? '/#/product/' + sub.id : 'javascript:;'"><img :src="sub ? sub.img : '/imgs/item-box-1.png'" alt="">{{sub ? sub.name : '小米9' }}</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item" >
              <a href="javascript:;" class="nav-class">电视 盒子</a>
            </li>
            <li class="nav-item">
              <a href="javascript:;" class="nav-class">笔记本 平板</a>
            </li>
            <li class="nav-item">
              <a href="javascript:;" class="nav-class">家电 插线板</a>
            </li>
            <li class="nav-item">
              <a href="javascript:;" class="nav-class">出行 穿戴</a>
            </li>
            <li class="nav-item">
              <a href="javascript:;" class="nav-class">智能 路由器</a>
            </li>
            <li class="nav-item">
              <a href="javascript:;" class="nav-class">电源 配件</a>
            </li>
            <li class="nav-item">
              <a href="javascript:;" class="nav-class">生活 箱包</a>
            </li>
          </ul>
        </div>
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
      ],
      menuList: [
            [
              {
                id: 30,
                name: '小米CC9',
                img: '/imgs/item-box-1.png'
              },
              {
                id: 31,
                name: '小米8青春版',
                img: '/imgs/item-box-1.png'
              },
              {
                id: 32,
                name: 'Redmi K20',
                img: '/imgs/item-box-1.png'
              },
              {
                id: 33,
                name: '移动4G专区',
                img: '/imgs/item-box-1.png'
              }
            ],
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
      ]
    }
  }

}
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  .swiper-box{
    width: 1226px;
    margin: 0 auto;
    .nav-menu{
      position: absolute;
      height: 460px;
      padding: 26px 0;
      width: 264px;
      z-index: 9;
      background-color: #55585a63;
      box-sizing: border-box;
      .nav-warp{
        .nav-item{
          height: 50px;
          line-height: 50px;
          &:hover{
            background-color: $colorA;
            .children{
              display: block;
            }
          }
          a.nav-class{
            position: relative;
            padding-left: 30px;
            display: block;
            color: #fff;
            font-size: 16px;
            &:after{
              content: " ";
              background: url("/imgs/icon-arrow.png") no-repeat 50%;
              background-size: contain;
              width: 10px;
              height: 15px;
              display: inline-block;
              position: absolute;
              right: 30px;
              top: 17.5px;
            }
          }
          .children{
            display: none;
            position: absolute;
            width: 962px;
            height: 460px;
            left: 264px;
            top: 0;
            background-color: #fff;
            border: 1px solid $colorH;
            ul{
              display: flex;
              justify-content: space-between;
              li{
                width: 24.8%;
                height: 75px;
                line-height: 75px;
                padding-left: 23px;
                font-size: 14px;
                a{
                  color: $colorB;
                  img{
                    height: 42px;
                    width: 35px;
                    margin-right: 15px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
    .swiper-container {
      width: 100%;
      height: 451px;
      .swiper-button-prev{
        margin-left: 274px;
      }
      img{
        width: 100%;
      }
    }

  }

</style>
