<template>
    <v-container fluid class="ma-0 pa-0 d-flex flex-column">
        <v-sheet class="col-12 col-sm-6 text-left fill-height" :min-width="defaultMinWidth" max-width="550">
            <div class="headline font-weight-bold" v-text="$t(parent)"/>
            <div class="subtitle-1 mb-4" v-text="$t($route.name)"/>

            <v-alert class="mb-0" dense outlined type="error" dismissible>
                <strong>Main Warning</strong> (Reminder)
            </v-alert>
            <kpi-box/>
            <v-tabs>
                <v-tab
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :to="`/${parent}/${tab.path}`"
                    v-text="$t(tab.path)"
                />
            </v-tabs>
            <router-view/>
        </v-sheet>
        <v-sheet
            v-if="$route.query.id"
            class="v-overlay--absolute col-12 col-sm-6 align-self-end"
            :class="{'detail': $vuetify.breakpoint.smAndUp}"

            :min-width="detailMinWidth"
            :elevation="detailElevation"
        >
            <router-view name="detail"/>
        </v-sheet>
    </v-container>
</template>

<script>
  import KpiBox from "../../components/KpiBox";
  import {searchChildren} from "../../menu";

  export default {
      components: {KpiBox},
      data() {
          return {
              active_tab: 0,
              tabs: []
          };
      },
      created() {
          let children = searchChildren(this.parent)
          for(let child of children)
              if(child.path !== '') this.tabs.push(child)

          console.log(this.tabs)
      },
      mounted() {
          console.log(this.$vuetify.breakpoint.name)
      },
      updated() {
          console.log(this.$vuetify.breakpoint.name)
      },
      watch: {
          parent() {this.updateTabs()}
      },
      computed: {
          parent(){
              return this.$route.matched[0].name
          },
          // defaultCols() {
          //     if(this.$vuetify.breakpoint.lgAndUp)
          //         return 6
          //
          //     return 12
          // },
          // detailCols(){
          //     if(this.$vuetify.breakpoint.lgAndUp)
          //         return 6
          //     else if(this.$vuetify.breakpoint.md)
          //         return 7
          //     else if(this.$vuetify.breakpoint.sm)
          //         return 10
          //
          //     return 12
          // },
          // justify(){
          //     if(this.$vuetify.breakpoint.mdAndDown)
          //         return 'end'
          //
          //     return undefined
          // },
          defaultMinWidth(){
              if(this.$vuetify.breakpoint.smAndUp)
                  return 500

              return 0
          },
          detailMinWidth(){
              if(this.$vuetify.breakpoint.smAndUp)
                  return 550

              return 0
          },
          detailElevation(){
              if(this.$vuetify.breakpoint.mdAndDown)
                  return 5

              return 0
          }
      },
      methods: {
          updateTabs: function(){
              this.tabs = []

              let children = searchChildren(this.parent)
              for(let child of children)
                  if(child.path !== '') this.tabs.push(child)
          }
      }
  }
</script>

<style lang="scss" scoped>
    .detail{
        position: absolute;
        height: 100%;
    }
</style>
