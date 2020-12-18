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
                        <v-tab v-for="(value, id) in tabs" :key="id" link :to="'/tabs/'+value">
                            {{value}}
                        </v-tab>
                    </v-tabs>
                    <tab-item/>
                </v-sheet>
            </v-col>
            <v-col v-if="$route.params.id" class="fill-height" :cols="detailCols" :class="{detail: this.$vuetify.breakpoint.smAndDown}">
                <v-sheet elevation="2" class="fill-height">
                    <router-view/>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  import TabItem from "./TabItem";
  import KpiBox from "./KpiBox";
  export default {
      components: {TabItem, KpiBox},
      data() {
          return {
              // active_tab: 0,
              tabs: ['sub1', 'sub2' ,'sub3']
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
              if(this.$vuetify.breakpoint.mdAndUp)
                  return 6

              return 12
          },
          detailCols(){
              if(this.$vuetify.breakpoint.smAndUp)
                  return 6

              return 12
          },
          justify(){
              if(this.$vuetify.breakpoint.smAndDown)
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