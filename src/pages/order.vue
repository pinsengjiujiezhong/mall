<template>
  <div>
    <div>order</div>
    <router-view></router-view>
    <ServicesBar></ServicesBar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from "../components/NavFooter";
import ServicesBar  from "../components/ServicesBar";
export default {
  name: "order",
  components: {
    NavFooter,
    ServicesBar
  }
}
</script>

<style scoped>

</style>
