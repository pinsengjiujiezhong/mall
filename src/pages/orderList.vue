<template>
  <div class="order-list">
    <order-header title="订单列表" tip="请谨防钓鱼链接或诈骗电话，了解更多">
    </order-header>
    <div class="wrapper">
      <div class="container">
        <Loading v-if=loading></Loading>
        <div class="order-box" v-for="(item, index) in orderList" :key="index">
          <div class="order">
            <div class="order-title">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                {{ item.shippingVo ? item.shippingVo.receiverName : '默认'}}
                <span>|</span>
                订单号：{{item.orderNo}}
                <span>|</span>
                在线支付
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ item.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(good, index) in item.orderItemVoList" :key="index">
                  <div class="good-img">
                    <img v-lazy="good.productImage" :alt="good.productName">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{good.productName}}</div>
                    <div class="p-money">{{good.totalPrice}} X {{good.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr">
                <a href="javascript:;">{{item.statusDesc}}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="pagination">
          <el-pagination
            v-if="!loading && this.orderList.length != 0"
            background
            @current-change="changePage"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div> -->
        <div v-infinite-scroll="scrollMore" infinite-scroll-disabled="busy" infinite-scroll-distance="410">
          <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" class="scroll-more" v-show="loadingScroll" alt="">
        </div>
        <NoData v-if="!loading && this.orderList.length == 0"></NoData>

      </div>
    </div>
  </div>
</template>
<script>
  import OrderHeader from './../components/OrderHeader'
  import Loading from './../components/Loading'
  import NoData from './../components/NoData'
  import {Pagination} from 'element-ui'
  import infiniteScroll from 'vue-infinite-scroll'
  export default{
    name:'order-list',
    data() {
      return {
        orderList: [],
        pageSize: 10,
        pageNum: 1,
        loading:true,
        total: 0,
        busy: false,
        loadingScroll: false
      }
    },
    mounted() {
      this.getOrderList()
    },
    directives: {infiniteScroll},
    methods: {
      getOrderList() {
        this.axios.get('/orders', {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum
        }
        }).then((res) => {
          this.loading = false
          this.orderList = this.orderList.concat(res.list)
          this.total = res.total
          this.loadingScroll = false
          this.busy = false
        }).catch(() => {
          this.loading = true
        })
      },
      changePage(page) {
        this.pageNum = page
        this.getOrderList()
      },
      scrollMore() {
        console.log('进来了scrollMore')
        this.loadingScroll = true
        let top = document.body.scrollTop
        console.log('top: ', top)
        this.busy = true
        this.pageNum += 1
        this.getOrderList()
        document.body.scrollTop = top
      }
    },
    components:{
      OrderHeader,
      Loading,
      NoData,
      [Pagination.name]: Pagination
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .pagination{
    float: right;
    margin: 10px 0;
  }
  .scroll-more{
    text-align: center;
  }
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                border-bottom: 1px solid #9b9b9b;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
                &:last-child{
                  border-bottom: none;
                }
              }

            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align:right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>
