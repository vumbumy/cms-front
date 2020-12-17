<template>
  <v-app>
    <side/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import Side from "./components/Side";

  export default {
    name: 'App',
    components: {
      Side,
    },
    // mounted() {
    //   console.log(this.$vuetify.application)
    //   console.log(this.$vuetify.application.top)
    // }
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
