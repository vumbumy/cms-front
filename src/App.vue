<template>
  <v-app>
    <app-side/>
<!--    <v-main style="background: skyblue">-->
<!--      <router-view style="background: lightgray"/>-->
<!--    </v-main>-->
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import AppSide from "./AppSide";

  export default {
    name: 'App',
    components: {
      AppSide,
    },
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
