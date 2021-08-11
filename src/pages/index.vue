<template>
  <div class="index">
    <div class="contains">

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
                    <a :href="sub? '/#/product/' + sub.id : 'javascript:;'"><img v-lazy="sub ? sub.img : '/imgs/item-box-1.png'" alt="">{{sub ? sub.name : '小米9' }}</a>
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
      <div class="ads-box">
        <a :href="'/#/product/' + item.id" v-for="(item, index) in adsList" :key="index"><img :src="item.img" alt=""></a>
      </div>
      <div class="banner">
        <a href="/#/product/30"><img v-lazy="'/imgs/banner-1.png'" alt=""></a>
      </div>
      <div class="product-box">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <img src="/imgs/mix-alpha.jpg" alt="">
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in productList" :key="i">
              <div class="list-item" v-for="(item, j) in arr" :key="j">
                <span class="new-pro">新品</span>
                <div class="item-img">
                  <img :src="item.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p class="item-desc">{{ item.subtitle }}</p>
                  <p class="price" @click="addCart"><span>{{ item.price }}</span>元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ServicesBar></ServicesBar>
      <Modal title="提示"
             v-show="showModal"
             sureText="查看购物车"
             @submit="goMyCart"
             btnType="1">
        <template v-slot:body>
          <p>商品添加成功</p>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>

  import Modal from "../components/Modal";
  import ServicesBar from "../components/ServicesBar";
  import 'swiper/css/swiper.css'
  import { mapActions } from 'vuex'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  export default {
    name: "nav-home",
    components: {
      ServicesBar,
      swiper,
      swiperSlide,
      Modal
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
        ],
        adsList: [
          {
            id: 33,
            img: '/imgs/ads/ads-1.png'
          },{
            id: 45,
            img: '/imgs/ads/ads-2.jpg'
          },{
            id: 47,
            img: '/imgs/ads/ads-3.png'
          },{
            id: 48,
            img: '/imgs/ads/ads-4.jpg'
          }
        ],
        productList: [],
        showModal: false,
        cartList: []
      }
    },
    mounted() {
      this.getUserName()
      this.getCartCount()
      this.init()
    },
    methods: {
      ...mapActions({
        getUserName: 'getUserName',
        getCartCount: 'getCartCount'
      }),
      init() {
        this.axios.get('/products', {
          params: {
            categoryId: 100012,
            pageSize: 8
          }
        }).then((result) => {
          this.productList = [result.list.slice(0, 4), result.list.slice(4, 8)]
          console.log('this.productList: ', this.productList)
        })
      },
      addCart() {
        this.showModalChance()
        console.log('添加购物车')
      },
      showModalChance() {
        console.log('调用了showModalChance方法')
        this.showModal = !this.showModal
      },
      goMyCart() {
        this.$router.push('/cart')
      }
    }

  }
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  @import '../assets/scss/mixin.scss';
  .contains{
    width: 1226px;
    margin: 0 auto;
    .swiper-box{
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
    .ads-box{
      width: 1226px;
      margin: 30px 0 15px 0;
      @include flex();
      a {
        width: 296px;
        height: 167px;
        box-sizing: border-box;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .banner{
      height: 132px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .product-box{
      background-color: $colorJ;
      padding: 30px 0 50px;
      h2{
        font-size: 22px;
        height: 21px;
        line-height: 21px;
        color: $colorB;
        margin-bottom: 20px;
      }
      .wrapper{
        display: flex;
        .banner-left{
          margin-right: 16px;
          img{
            height: 619px;
            width: 224px;
          }
        }
        .list-box{
          .list{
            display: flex;
            justify-content: space-between;
            width: 986px;
            .list-item{
              width: 236px;
              height: 302px;
              background-color: #fff;
              text-align: center;
              margin-bottom: 14px;
              .item-img{
                img{
                  width: 100%;
                  height: 195px;
                }
              }
              h3{
                font-size: 14px;
                color: $colorB;
                font-weight: 700;
                line-height: 14px;
              }
              .item-desc{
                margin: 6px 0 13px;
              }
              .new-pro{
                width: 67px;
                height: 24px;
                line-height: 24px;
                display: inline-block;
                background-color: #7ecf68;
                color: #fff;
                margin-top: 2px;
              }
              .price{
                color: #f20a0a;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                &:after{
                  @include bgImg('/imgs/icon-cart-hover.png', 22px, 22px);
                  display: inline-block;
                  vertical-align: middle;
                  margin-left: 5px;
                }
              }
              &:last-child{
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }
  }
</style>
