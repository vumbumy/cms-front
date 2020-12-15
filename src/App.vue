<template>
  <div id="app">
    <v-app id="inspire">
      <navigation/>
      <v-main style="background: skyblue">
        <v-row class="fill-height" style="background: lightgray">
          <v-col>
            <v-container class="fill-height" fluid>
              <home class="fill-height" style="background: darkseagreen"/>
            </v-container>
          </v-col>
          <v-divider vertical class="ma-0 pa-0"/>
          <v-col>
            <v-container class="fill-height" fluid>
              <detail class="fill-height" style="background: moccasin"/>
            </v-container>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Navigation from "./components/Navigation";
import Detail from "./components/Detail";

export default {
  name: 'App',
  components: {
    Detail,
    Navigation,
    Home
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
