<template>
  <div class="order-pay">
    <order-header title="订单支付" tip="请谨防钓鱼链接或诈骗电话，了解更多"></order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{shippingVo.receiverName + '  ' + shippingVo.receiverMobile + '  ' + shippingVo.receiverProvince + '  ' + shippingVo.receiverCity + '  ' + shippingVo.receiverDistrict + '  ' + shippingVo.receiverAddress}} </p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{order.payment}}</span>元</p>
              <p>订单详情<em class="icon-down up"  @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{order.orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{shippingVo.receiverName + '  ' + shippingVo.receiverMobile + '  ' + shippingVo.receiverProvince + '  ' + shippingVo.receiverCity + '  ' + shippingVo.receiverDistrict + '  ' + shippingVo.receiverAddress}} </div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage"/>{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" @click="submitPay(1)" :class="payType == 1 ? 'checked' : ''"></div>
            <div class="pay pay-wechat" @click="submitPay(2)" :class="payType == 2 ? 'checked' : ''"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay" :img="imgurl" @close="closePayModal"></scan-pay-code>
    <modal
      title="订单确认"
      btnType="3"
      sureText="已完成支付"
      cancelText="未支付"
      @close="showModalPay"
      v-if="showModalAffirmPay"
      @submit="completePay"
      showModalChance="showModalPay">
      <template v-slot:body>
        <p style="font-size: 18px">您确认是否已完成支付?</p>
      </template>

    </modal>
  </div>
</template>
<script>
  import QRCode from 'qrcode'
  import OrderHeader from './../components/OrderHeader'
  import ScanPayCode from './../components/ScanPayCode'
  import Modal from './../components/Modal'
  export default{
    name:'order-pay',
    data(){
      return {
        showDetail:false,//是否显示订单详情
        showPay:false,//是否显示微信支付弹框
        orderDetail: [],
        showModalAffirmPay: false,
        order: {},
        shippingVo: {},
        payType: 1,
        imgurl: '',
        orderNo: this.$route.query.orderNo,
        timer: '',
        status: 10
      }
    },
    components:{
      OrderHeader,
      ScanPayCode,
      Modal
    },
    mounted() {
      this.getOrderDetail()
    },
    methods:{
      // 关闭微信弹框
      closePayModal(){
        clearInterval(this.timer)
        this.showModalAffirmPay = true;
      },
      showModalPay() {
        this.showModalAffirmPay = false
      },
      goOrderList(){
        this.$router.push('/order/list');
      },
      getOrderDetail() {
        let orderNo = this.$route.query['orderNo']
        console.log('orderNo:', orderNo)
        this.axios.get(`/orders/${orderNo}`).then((res) => {
          this.order = res
          this.shippingVo = res.shippingVo
          this.orderDetail = res.orderItemVoList
        })
      },
      submitPay(type) {
        this.payType = type
        if (type == 1) {
          window.open('/#/order/alipay?orderNo=' + this.$route.query.orderNo, '_blank')
        } else if (type == 2) {
          let orderNo = this.$route.query.orderNo
          this.axios.post('/pay', {
            orderId: orderNo,
            orderName: 'Vue 表单提交',
            amount: 0.01,
            payType: 2
          }).then((res) => {
            this.showPay = true
            this.imgurl = res.content
            QRCode.toDataURL(res.content).then(url => { this.imgurl = url }).catch(err => { console.error(err) })
            this.loopOrderState()
          })
        }
      },
      completePay() {
        this.$router.push('/order/list')
      },
      getOrderState() {
        this.axios.get(`/orders/${this.orderNo}`).then((res) => {
          this.status = res.status
        })
      },
      loopOrderState() {
        this.timer = setInterval(() => {
          this.getOrderState()
          console.log(this.status)
          if (this.status == 20 ) {
            clearInterval(this.timer)
            this.$router.push('/order/list')
          }
        }, 1000)
      }
    }
  }
</script>
<style lang="scss">
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
            .icon-up{
              transform: rotate(180deg);
            }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>
