<template>
  <navbar-section />
  <router-view />
</template>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';
</style>

<script>
import NavbarSection from './components/NavbarSetion.vue'
export default {
  components: {
    NavbarSection
  }
}
</script>