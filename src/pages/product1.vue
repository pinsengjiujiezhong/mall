<template>
  <div class="product">
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buyProduct">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
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
          <span>￥<em>{{product.price}}</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper>
          <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg" @click="showSlide=true"></div>
        <div class="video-box" v-if="showSlide">
          <div class="overlay"></div>
          <div class="video" :class="showSlide ? 'slide' : ''">
            <span class="icon-close" @click="showSlide=false"></span>
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
        product: {},
        showSlide: false
      }
    },
    components: {
      swiper,
      swiperSlide,
      ProductParam
    },
    mounted(){
      this.getProduct()
    },
    methods: {
      buyProduct() {
        let id = this.$route.params.id
        this.$router.push(`/detail/${id}`)
      },
      getProduct() {
        let id = this.$route.params.id
        this.axios.get(`products/${id}`).then((res) => {
          this.product = res
        })
      }
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
            .video-bg{
              background:url('/imgs/product/gallery-1.png') no-repeat center;
              background-size:cover;
              width:1226px;
              height:540px;
              margin:0 auto 120px;
              cursor:pointer;
            }
              .video-box{
                .overlay{
                  @include position(fixed);
                  background-color:#333333;
                  opacity: .4;
                  z-index:10;
                }
                .video{
                  width: 1000px;
                  height: 536px;
                  position: fixed;
                  top: -50%;
                  left: 50%;
                  z-index:10;
                  transform: translate(-50%, -50%);
                  opacity: 0;
                  transition: all 1s;
                  &.slide{
                    opacity: 1;
                    top: 50%;
                  }
                  video{
                    width: 100%;
                    height: 100%;
                    object-fit:cover;
                    outline:none;
                  }
                  .icon-close{
                    position:absolute;
                    top:20px;
                    right:20px;
                    @include bgImg('/imgs/icon-close.png', 20px,20px);
                    cursor:pointer;
                    z-index:11;
                  }
                }
              }
          }
      }
      button{
          margin-left:10px;
      }
  }
</style>
