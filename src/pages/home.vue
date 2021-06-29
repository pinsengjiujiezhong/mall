<template>
  <div>
    <NavHeader></NavHeader>
    <div>home</div>
    <router-view></router-view>
    <NavFooter></NavFooter>
  </div>
</template>

<script>

import NavHeader from "../components/NavHeader";
import NavFooter from "../components/NavFooter";
export default {
  name: "nav-home",
  components: {
    NavHeader,
    NavFooter
  }
}
</script>

<style scoped>

</style>
