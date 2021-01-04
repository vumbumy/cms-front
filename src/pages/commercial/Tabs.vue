<template>
    <div class="d-flex fill-height">
        <v-sheet
            class="col-12 col-sm-6 text-left"
            :min-width="defaultMinWidth"
            max-width="550"
            style="overflow-y: auto"
        >
            <div class="headline font-weight-bold" v-text="$t(parent)"/>
            <div class="subtitle-1 mb-4" v-text="$t($route.name)"/>

            <error :message="error"/>
            <kpi-box/>
            <v-tabs show-arrows>
                <v-tab
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :to="`/${parent}/${tab.path}`"
                    v-text="$t(tab.name)"
                />
            </v-tabs>
            <router-view/>
        </v-sheet>
        <v-sheet
            v-if="$route.query.id"
            class="col-12 col-sm-6 fill-height py-0"
            style="position: absolute; top:0; right: 0; overflow-y: scroll"

            :min-width="detailMinWidth"
            :elevation="detailElevation"
        >
            <router-view name="detail"/>
        </v-sheet>
    </div>
</template>

<script>
  import KpiBox from "../../components/KpiBox";
  import {searchChildren} from "../../menu";
  import Error from "../../components/alerts/Error";

  export default {
      components: {
          Error,
          KpiBox
      },
      data() {
          return {
              error: '',
              active_tab: 0,
              tabs: []
          };
      },
      created() {
          let children = searchChildren(this.parent)
          for(let child of children)
              if(child.path !== '') this.tabs.push(child)
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
          defaultMinWidth(){
              if(this.$vuetify.breakpoint.smAndUp)
                  return 600

              return 0
          },
          detailMinWidth(){
              if(this.$vuetify.breakpoint.smAndUp)
                  return 625

              return 0
          },
          detailElevation(){
              if(this.$vuetify.breakpoint.lgAndDown)
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
          },
      }
  }
</script>

<style lang="scss">
    .header {
        width: 100%;
        position: sticky;
        top: 0;
        height: 50px;
        z-index: 3;
    }
    .footer {
        width: 100%;
        position: sticky;
        bottom: 0;
        height: 120px;
    }
</style>
