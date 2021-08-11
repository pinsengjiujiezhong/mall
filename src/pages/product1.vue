<template>
  <div class="product">
    <product-param title="小米9">
      <template v-slot:buy>
        <button class="btn">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>小米9</h2>
        <h3>小米9 战斗天使</h3>
        <p>
          <a href="" id="2">全球首款双频 GP</a>
          <span>|</span>
          <a href="" id="4">骁龙845</a>
          <span>|</span>
          <a href="" id="6">AI 变焦双摄</a>
          <span>|</span>
          <a href="" id="7">红外人脸识别</a>
        </p>
        <div class="price">
          <span>￥<em>2599</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper>
          <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg"></div>
        <div class="video-box">
          <div class="overlay"></div>
          <div class="video">
            <span class="icon-close"></span>
            <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import ProductParam from './../components/ProductParam'
  export default {
    name: 'product',
    data() {
      return {

      }
    },
    components: {
      swiper,
      swiperSlide,
      ProductParam
    },
    methods: {

    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .product{
      .content{
          .item-bg{
              background:url('/imgs/product/product-bg-1.png') no-repeat center;
              height:718px;
              text-align:center;
              h2{
                  font-size:80px;
                  padding-top:55px;
              }
              h3{
                  font-size:24px;
                  letter-spacing: 10px;
              }
              p{
                  margin-top:21px;
                  margin-bottom:40px;
                  a{
                      font-size:16px;
                      color:#333333;
                  }
                  span{
                      margin:0 15px;
                  }
              }
              .price{
                  font-size:30px;
                  color:#333333;
                  em{
                      font-style:normal;
                      font-size:38px;
                  }
              }
          }
          .item-bg-2{
              background:url('/imgs/product/product-bg-2.png') no-repeat center;
              height:480px;
              background-size:1226px 397px;
          }
          .item-bg-3{
              background:url('/imgs/product/product-bg-3.png') no-repeat center;
              height:638px;
              background-size:cover;
          }
          .item-swiper{
              margin:36px auto 52px;
              .desc{
                  font-size:18px;
                  color:#333333;
                  text-align:center;
              }
              img{
                  width:100%;
              }
          }
          .item-video{
              height:1044px;
              background-color:#070708;
              margin-bottom:76px;
              color:#FFFFFF;
              text-align:center;
              h2{
                  font-size:60px;
                  padding-top:82px;
                  margin-bottom:47px;
              }
              p{
                  font-size:24px;
                  margin-bottom:58px;
              }
          }
      }
      button{
          margin-left:10px;
      }
  }
</style>
