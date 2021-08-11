<template>
    <div class="nav-bar" :class="{'is_fixed':isFixed}">
        <div class="container">
            <div class="pro-title">
                <a href="javascript:;">小米8</a>
            </div>
            <div class="pro-param">
                <a href="javascript:;">概述</a><span>|</span>
                <a href="javascript:;">参数</a><span>|</span>
                <a href="javascript:;">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductParam",
    data() {
        return {
            isFixed: false
        }
    },
    mounted() {
      window.addEventListener('scroll', this.initHeight)
    },
    methods: {
        initHeight() {
            let scrollTops  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.isFixed = scrollTops > 152;
            console.log('this.isFixed: ', this.isFixed)
        }
    },
    destroyed(){
        window.removeEventListener('scroll',this.initHeight,false)
    }
}
</script>

<style lang="scss">
    @import './../assets/scss/mixin';
    @import './../assets/scss/config';
    .nav-bar{
        width: 1226px;
        height: 70px;
        width: 100%;
        line-height: 70px;
        background-color: $colorG;
        &.is_fixed{
            position: fixed;
            top: 0;
        }
        .container{
            @include flex();
            .pro-title{
                a{
                    font-size: $fontH;
                    font-weight: bold;
                    color: $colorB;
                }
            }
            .pro-param{
                a{
                    font-size: $fontJ;
                    color: $colorC;
                    padding: 0 10px;
                }
            }
        }

    }

</style>
