<template>
  <div id="app">
    <v-app id="inspire">
      <side/>
      <layout/>
    </v-app>
  </div>
</template>

<script>
import Side from "./components/Side";
import Layout from "./components/Layout";

export default {
  name: 'App',
  components: {
    Layout,
    Side,
  }
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
