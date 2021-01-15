<template>
    <v-app>
        <app-top @toggle="onClickNavIcon"/>
        <app-side v-model="drawer"/>
        <v-main class="main">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
  import AppSide from "./AppSide";
  import AppTop from "./AppTop";

  export default {
      name: 'App',
      components: {
          AppTop,
          AppSide,
      },
      data: () => ({
          drawer: null
      }),
      methods: {
          onClickNavIcon(){
              this.drawer = !this.drawer
              // console.log('onClickNavIcon', this.drawer)
          }
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

    .main {
        height: 100vh;
        overflow-y: hidden;
    }
</style>
