<template>
    <v-main style="background: skyblue" class="my-0 py-5">
        <v-container fluid>
            <v-alert
                    dense
                    border="right"
                    colored-border
                    type="error"
                    elevation="2"
            >
                <strong>System Error Message</strong>
            </v-alert>
            <v-row style="background: lightgreen" justify="end">
                <v-col md="6" sm="12" xs="12">
                    <router-view style="background: lightgray"/>
                </v-col>
    <!--            <v-overlay absolute v-if="this.$vuetify.breakpoint.smAndDown" v-model="detail">-->
    <!--            <v-dialog v-if="this.$vuetify.breakpoint.smAndDown" v-model="detail" fullscreen>-->
                <v-col md="6" :class="{detail: this.$vuetify.breakpoint.smAndDown}">
                    <v-slide-x-reverse-transition>
                        <router-view name="detail" style="background: moccasin"/>
                    </v-slide-x-reverse-transition>
                </v-col>
    <!--            </v-dialog>-->
    <!--            </v-overlay>-->
    <!--            <v-col v-else>-->
    <!--                <router-view v-if="detail" name="detail" style="background: moccasin"/>-->
    <!--            </v-col>-->
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
  export default {
      updated() {
          console.log(this.$vuetify.breakpoint.name)
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
    .detail{
        position: absolute;
    }
</style>