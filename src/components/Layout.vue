<template>
    <v-container fluid class="ma-0 pa-0">
<!--        <v-row :justify="justify">-->
<!--            <v-col :cols="defaultCols">-->
<!--                <v-sheet max-width="500">-->
                    <router-view/>
<!--                </v-sheet>-->
<!--            </v-col>-->
<!--            <v-col :cols="detailCols" :class="{detail: this.$vuetify.breakpoint.smAndDown}">-->
<!--                <v-sheet :max-width="detailMaxWidth">-->
<!--                    <router-view name="detail"/>-->
<!--                </v-sheet>-->
<!--            </v-col>-->
<!--        </v-row>-->
    </v-container>
</template>

<script>
  export default {
      mounted() {
          console.log(this.$options.components)
          console.log(this.$vuetify.breakpoint.name, this.defaultCols, this.detailCols, this.justify)
      },
      updated() {
          console.log(this.$vuetify.breakpoint.name, this.defaultCols, this.detailCols, this.justify)
      },
      data() {
          return {
              dialog: true,
              detail: this.$route.params.id !== undefined
          }
      },
      computed: {
          defaultCols() {
              if(this.$vuetify.breakpoint.mdAndUp)
                  return 6

              return 12
          },
          detailCols(){
              if(this.$vuetify.breakpoint.smAndUp)
                  return 6

              return 12
          },
          detailMaxWidth(){
              if(this.$vuetify.breakpoint.sm)
                  return 500

              return 1000
          },
          justify(){
              if(this.$vuetify.breakpoint.smAndUp)
                  return 'end'

              return undefined
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