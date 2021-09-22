<template>
  <div class="cart">
    <order-header title="我的购物车"
                  tip="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算">
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1" @click="toggleAll"><span class="checkbox" :class=" checkAll ? 'checked' : '' "></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in cartList" :key="index">
              <div class="item-check">
                <span class="checkbox" :class=" item.productSelected ? 'checked' : '' " @click=checkProduct(index)></span>
              </div>
              <div class="item-name">
                <img :src="item.productMainImage" alt="">
                <span>{{ item.productName + ' , ' + item.productSubtitle }}</span>
              </div>
              <div class="item-price">{{ item.productPrice }}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="changeCart(item.productId, item.quantity - 1, item.productStatus)">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="changeCart(item.productId, item.quantity + 1, item.productStatus)">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}元</div>
              <div class="item-del" @click="removeCart(item.productId)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共<span>{{ cartList.length }}</span>件商品，已选择<span>{{ cartChecked }}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import OrderHeader from './../components/OrderHeader'
  import ServiceBar from './../components/ServicesBar'
  import { mapState} from 'vuex';
  import NavFooter from './../components/NavFooter'
  export default{
    name:'index',
    components:{
      OrderHeader,
      ServiceBar,
      NavFooter
    },
    data(){
      return {
        allChecked: false,
        cartList: [],
        cartTotal: 0,
        cartTotalPrice: 0,
      }
    },
    computed: {
      ...mapState(['username']),
      cartChecked() {
        return this.cartList.filter(item=>item.productSelected).length
      },
      checkAll() {
        if (!this.cartList.length) {
          return false
        }
        return this.cartList.every(item => item.productSelected)
      }
    },
    mounted() {
      this.getCarts()
      console.log('username: ', this.$store.state.username)
    },
    methods:{
      // 购物车下单
      order(){
        let isCheck = this.cartList.every(item => !item.productSelected)
        console.log('isCheck: ', isCheck)
        if (isCheck) {
          this.$message.error('当前需要至少选择一件商品');
        } else {
          this.$router.push('/order/confirm');
        }
      },
      init(res){
        this.cartTotal = res.cartTotalQuantity
        this.cartList = res.cartProductVoList
        this.cartTotalPrice = res.cartTotalPrice
      },
      getCarts() {
        this.axios.get('/carts').then((res) => {
          this.init(res)
        })
      },
      toggleAll() {
        const path = this.checkAll ? '/carts/unSelectAll' : '/carts/selectAll'
        this.axios.put(path).then((res) => {
          this.init(res)
        })
      },
      changeCart(id, quantity, status) {
        if (quantity <=0) {
          this.$message({
            message: '当前商品小于0, 拒绝继续减少',
            type: 'warning'
          });
        }else if (quantity>status) {
          const text = '当前最大库存为' + status + ', 不可继续添加'
          this.$message({
            message: text,
            type: 'warning'
          });
        }else{
          this.axios.put(`/carts/${id}`, {
            quantity: quantity,
            selected: true
          }).then((res) => {
            this.init(res)
          })
        }
      },
      removeCart(id) {
        this.axios.delete(`/carts/${id}`).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.init(res)
        })
      },
      checkProduct(index) {
          this.cartList[index].productSelected = !this.cartList[index].productSelected
      }
    }
  }
</script>
<style lang="scss">
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>
