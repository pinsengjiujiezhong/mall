<template>
  <div>
    <NavHeader></NavHeader>
    <div>index</div>
    <ServicesBar></ServicesBar>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import ServicesBar from '../components/ServicesBar'
export default {
  name: "index",
  components: {
    NavHeader,
    NavFooter,
    ServicesBar
  }
}
</script>

<style lang="scss">

</style>
