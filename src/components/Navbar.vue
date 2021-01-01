<template>
    <div>
      <b-navbar toggleable="lg" type="light" id="navbar">
        <b-container>
            <b-navbar-brand href="#"><img src="../assets/images/train.svg" width="30" height="30" alt=""> Departure Board</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav>
                <b-nav-item href="#">Settings</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-container>
      </b-navbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
  methods: {
  }
}
</script>
<style>
#navbar {
  background-color: #ffcc33;
}
</style>
