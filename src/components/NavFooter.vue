<template>
    <div class="footer">
      <div class="footer-logo">
        <img src="/imgs/logo-footer.png" alt="">
        <p>小米商城</p>
      </div>
      <div class="footer-link">
        <a href="https://www.baidu.con" target="_blank">贫僧纠结中</a><span>|</span>
        <a href="https://www.baidu.con">贫僧纠结中</a><span>|</span>
        <a href="https://www.baidu.con">贫僧纠结中</a><span>|</span>
        <a href="https://www.baidu.con">贫僧纠结中</a><span>|</span>
        <a href="https://www.baidu.con">贫僧纠结中</a>
      </div>
      <div class="copyright">
        Copyright ©2020 <span>mi.futurefe.com</span> All Rights Reserved.
      </div>
    </div>
</template>

<script>
export default {
  name: "nav-footer"
}
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  .footer{
    height: 234px;
    border-top: 4px solid $colorA;
    font-size: 16px;
    color: #999;
    text-align: center;
    background-color: #333;
    .footer-logo{
      margin: 44px 0 36px 0;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color: #999;
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 10px;
        margin-left: 10px;
      }
    }
    .copyright{
      span{
        color: $colorA;
      };
    }

  }
</style>
