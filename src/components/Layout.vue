<template>
    <v-main style="background: skyblue" class="my-0 py-8">
        <v-row style="background: lightgray">
            <v-col>
                <router-view style="background: darkseagreen"/>
            </v-col>
            <v-overlay absolute v-if="this.$vuetify.breakpoint.mdAndDown" v-model="detail">
                <v-slide-x-reverse-transition>
                    <router-view name="detail" style="background: moccasin"/>
                </v-slide-x-reverse-transition>
            </v-overlay>
            <v-col v-else>
                <router-view v-if="detail" name="detail" style="background: moccasin"/>
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
  export default {
      mounted() {
          console.log(this.$route.params.id)
      },
      data() {
          return {
              detail: this.$route.params.id !== undefined
          }
      },
      watch: {
          $route(){
              this.detail = this.$route.params.id !== undefined
          }
      }
  }
</script>

<style lang="scss" scoped>
    .v-overlay{
        position: absolute;
    }
</style>