
<template>
  <div>
    <NavHeader></NavHeader>
    cart
    <router-view></router-view>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
  import NavHeader from '../components/NavHeader'
  import NavFooter from '../components/NavFooter'
  export default {
    name: "cart",
    components: {
      NavHeader,
      NavFooter
    }
  }
</script>

<style lang="scss">

</style>
