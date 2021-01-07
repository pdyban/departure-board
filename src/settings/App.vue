<template>
  <div id="app">
    <Navbar />
    <Settings />
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue';
  import Settings from '../components/Settings.vue';
  export default {
    name: 'navbar',
    components: {
        Navbar,
        Settings
      }
    }
</script>

<style>
</style>
