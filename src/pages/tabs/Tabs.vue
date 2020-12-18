<template>
    <v-container fluid class="ma-0 py-0">
        <v-row dense :justify="justify">
            <v-col class="text-left" :cols="defaultCols">
                <v-sheet max-width="500">
                    <div class="headline font-weight-bold">Title</div>
                    <div class="subtitle-1 mb-4">
                        <span>{{subTitle}}</span>
                    </div>

                    <v-alert class="mb-0" dense outlined type="error" dismissible>
                        <strong>Main Warning</strong> (Reminder)
                    </v-alert>
                    <kpi-box/>
                    <v-tabs height="40">
                        <v-tab v-for="(tab, index) in tabs" :key="index" link :to="`/tabs/${tab}`">
                            {{tab}}
                        </v-tab>
                    </v-tabs>
                    <router-view/>
                </v-sheet>
            </v-col>
            <v-col v-if="$route.params.id" class="fill-height" :cols="detailCols" :class="{detail: this.$vuetify.breakpoint.mdAndDown}">
                <v-sheet elevation="5" class="fill-height" max-width="600">
                    <router-view name="detail"/>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  import KpiBox from "../../components/KpiBox";
  export default {
      components: {KpiBox},
      data() {
          return {
              tabs: ['sub1', 'sub2']
          };
      },
      mounted() {
          console.log(this.$vuetify.breakpoint.name, this.defaultCols, this.detailCols, this.justify)
      },
      updated() {
          console.log(this.$vuetify.breakpoint.name, this.defaultCols, this.detailCols, this.justify)
      },
      computed: {
          subTitle(){
              if(this.$route.params.sub)
                  return this.$route.params.sub.toUpperCase()

              return this.tabs[0].toUpperCase()
          },
          defaultCols() {
              if(this.$vuetify.breakpoint.lgAndUp)
                  return 6

              return 12
          },
          detailCols(){
              if(this.$vuetify.breakpoint.lgAndUp)
                  return 6
              else if(this.$vuetify.breakpoint.md)
                  return 7
              else if(this.$vuetify.breakpoint.sm)
                  return 10

              return 12
          },
          justify(){
              if(this.$vuetify.breakpoint.mdAndDown)
                  return 'end'

              return undefined
          }
      },
  }
</script>

<style lang="scss" scoped>
    .detail{
        position: absolute;
    }
</style>