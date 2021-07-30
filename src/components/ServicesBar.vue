<template>
    <div class="service">
        <div class="container">
            <li class="item"><span class="icon-setting"></span>预约维修服务</li>
            <li class="item"><span class="icon-setting"></span>7天无理由退货</li>
            <li class="item"><span class="icon-setting"></span>15天免费换货</li>
            <li class="item"><span class="icon-setting"></span>满150元包邮</li>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service-bar"
    }
</script>

<style lang="scss">
    @import '../assets/scss/config.scss';
    @import '../assets/scss/mixin.scss';
    .service{
        font-size: 16px;
        height: 91px;
        .container{
            width: 1226px;
            margin: 0 auto;
            li{
                margin: 35px 0px;
                width: 20.8%;
                border-right: 1px solid #e5e5e5;
                display: inline-block;
                text-align: center;
                &:last-child{
                    border-right: none;
                }
                .span{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                }
                .icon-setting{
                    @include bgImg('/imgs/icon-setting.png', 20px, 20px);
                    display: inline-block;
                    background: url('/imgs/icon-setting.png') no-repeat center;
                    background-size: contain;
                    margin-right: 8px;
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }
            }
        }

    }
</style>
