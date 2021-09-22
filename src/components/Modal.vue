<template>
    <transition name="modal">
        <div class="modal">
            <div class="mask"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <span>{{title}}</span>
                    <a href="javascript:;" class="icon-close" @click="$emit('close')"></a>
                </div>
                <div class="modal-body">
                    <slot name="body" ></slot>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn" @click="$emit('submit')" v-if="btnType==1">{{sureText}}</a>
                    <a href="javascript:;" class="btn" @click="canceDialog" v-if="btnType==2">{{cancelText}}</a>
                    <div class="btn-group" v-if="btnType==3">
                        <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
                        <a href="javascript:;" class="btn btn-default" @click="$emit('close')">{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script type="text/javascript">
    export default {
        name: 'modal',
        props: {
            modalType: {
                type: String,
                default: 'form'
            },
            title: String,
            // 按钮类型： 1 确定,2 取消,3 确定+取消
            btnType: String,
            sureText: {
                type: String,
                default: '确定'
            },
            cancelText: {
                type: String,
                default: '取消'
            }
        }
    }
</script>


<style lang="scss">
@import "../assets/scss/config.scss";
@import "../assets/scss/modal.scss";
@import "../assets/scss/btn.scss";
</style>
