<template>
  <div>
    <div class="order-header">
      <div class="contains clearfix">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="title">
          <h2>{{title}}<span>{{tip}}</span></h2>

        </div>
        <div class="username">{{username}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-header",
  data() {
    return {
      username: ''
    }
  },
  props: {
    title: String,
    tip: String
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.axios.get('/user').then((res) => {
        this.username = res.username
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/mixin";
  .contains{
    width: 1226px;
    margin: 0 auto;
    padding: 30px 0;
    .header-logo{
      float: left;
      margin-right: 55px;
    }
    .title{
      float: left;
      h2{
        color: #333333;
        font-size: 28px;
        line-height: 55px;
      }
      span{
        font-size: 14px;
        line-height: 55px;
        margin-left: 17px;
        font-weight: 200;
      }
    }
    .username{
      float: right;
      font-size: 14px;
      line-height: 55px;
    }
  }
</style>
