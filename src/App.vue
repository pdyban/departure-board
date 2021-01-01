<template>
  <div id="app">
    <Navbar />
    <Listview />
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue';
  import Listview from './components/Listview.vue';
  export default {
    name: 'navbar',
    components: {
        Navbar,
        Listview
      }
    }
</script>

<style>
</style>
