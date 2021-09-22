<template>
    <div class="loading">
        <img src="/imgs/icon-no-data.png" alt="暂无数据">
        <p>暂无数据</p>
    </div>
</template>

<script>
    export default {
        name: "no-data"
    }
</script>

<style lang="scss">
    .loading{
        height: 300px;
        text-align: center;
        padding: 50px 0;
        img{
            height: 100%;
        }
    }
</style>
