<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">IOT</a>
          <a href="javascript:;">云服务</a>
        </div>
        <div class="user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" v-else>注册</a>
          <a href="javascript:;" class="my-cart" @click="cart"><span class="icon-cart"></span>购物车(<span>{{cartCount}}</span>)</a>
        </div>
      </div>
      <div class=""></div>
    </div>
    <div class="header-menu">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(phone, index) in phoneList" :key="index">
                  <a :href="'/#/product/' + phone.id" target="_blank">
                    <div class="pro-img">
                      <img :src="phone.mainImage" :alt="phone.name">
                    </div>
                    <div class="pro-name">{{phone.name}}</div>
                    <div class="pro-price">￥<span>{{phone.price | currency}}</span>元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMI红米手机</span>
            <!--<div class="children"></div>-->
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-1.jpg" alt="小米8图片">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">￥<span>6999</span>元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-2.jpg" alt="小米8图片">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">￥<span>1999</span>元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-3.png" alt="小米8图片">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">￥<span>699</span>元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-4.jpg" alt="小米8图片">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">￥<span>1799</span>元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-5.jpg" alt="小米8图片">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">￥<span>2699</span>元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="javascript:;" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-6.png" alt="小米8图片">
                    </div>
                    <div class="pro-name">小米电视3</div>
                    <div class="pro-price">￥<span>1799</span>元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="header-search">
          <div class="search">
            <input type="text" placeholder="请输入">
            <div class="search-icon">
              <span class="icon-search"></span>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "nav-header",
  data() {
    return {
      phoneList:[]
    }
  },
  computed: {
    ...mapState([
      'cartCount',
      'username'
    ])
  },
  filters: {
    currency(val) {
      if (!val) {
        return '0.00'
      }
      return val.toFixed(2)
    }
  },
  mounted(){
    console.log('执行了')
    this.getProductList()
    this.getCartCount()
    console.log('username: ', this.username)
  },
  methods: {
    getProductList() {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
          pageSize: 6
        }
      }).then((res) => {
        this.phoneList = res.list
        console.log('this.phoneList: ', this.phoneList)
      })
    },
    cart() {
      this.$router.push('/cart')
    },
    login() {
      this.$router.push('/login')
    },
    logout() {
      this.axios.post('/user/logout').then(() => {
        this.$message({
          message: '退出成功',
          type: 'success'
        });
        this.$router.push('/login')
        this.$cookies.set('userId', '', {expires: '-1'})
        this.cartCount = 0
        this.username = ''
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/base.scss';
  @import '../assets/scss/mixin.scss';
  @import '../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height: 39px;
      background-color: #333333;
      color: #B0B0B0;
      .container{
        width: 1226px;
        margin: 0 auto;
        @include flex();
        a{
          color: #B0B0B0;
          text-decoration: none;
          line-height: 39px;
          margin-right: 17px;
        }
        .my-cart{
          background-color: #FF6600;
          display: inline-block;
          width: 110px;
          text-align: center;
          color: #FFF;
          .icon-cart{
            display: inline-block;
            width: 16px;
            height: 12px;
            background: url("/imgs/icon-cart-checked.png") no-repeat center;
            background-size: contain;
            margin-right: 4px;
          }
        }

      }
    }
    .header-menu{
      .container{
        position: relative;
        height: 112px;
        @include flex();

        .header-menu{
          display: inline-block;
          margin-left: 209px;
          width: 600px;
          .item-menu{
            display: inline-block;
            color: #333333;
            font-weight: bold;
            font-size: 16px;
            padding: 0 10px;
            line-height: 112px;
            span{
              cursor: pointer;
            }
            &:hover{
              color: $colorA;
              .children{
                height: 220px;
                opacity: 1;
                transition: all .5s;
                background-color: #fff;
                z-index: 11;
              }
            }
            .children{
              height: 0px;
              opacity: 0;
              overflow: hidden;
              position: absolute;
              top: 112px;
              left: 0;
              width: 1226px;
              box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              .product{
                position: relative;
                float: left;
                height: 220px;
                width: 16.6666666%;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                a{
                  display: inline-block;

                }
                img{
                  height: 111px;
                  width: auto;
                  margin-top: 26px;
                }
                .pro-img{
                  height: 137px;
                }
                .pro-name{
                  height: 12px;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  font-weight: 700;
                  color: $colorB;
                }
                .pro-price{
                  color: $colorA;
                }
                &:before{
                  content: ' ';
                  position: absolute;
                  height: 100px;
                  top: 28px;
                  right: 0;
                  width: 1px;
                  border-right: 1px $colorF solid;
                }
                &:last-child:before{
                  display: none;
                }
              }
            }
          }
        }
        .header-search{
          display: flex;
          justify-content: space-between;
          align-items: center;
          input{
            height: 50px;
            width: 296px;
            padding-left: 10PX;
            border:1px solid #e0e0e0;
            background-color:transparent;
          }
          .search-icon{
            display: inline-block;
            width: 18px;
            height: 18px;
            padding: 16px;
            border: 1px solid #e0e0e0;
            position: relative;
            top: 4px;
            left: -1px;
            .icon-search{
              display: inline-block;
              background: url("/imgs/icon-search.png") no-repeat center;
              background-size: contain;
              width: 18px;
              height: 18px;

            }
          }

        }
      }
    }
  }
</style>
