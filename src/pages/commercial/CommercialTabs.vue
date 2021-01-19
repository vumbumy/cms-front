<template>
    <div class="d-flex fill-height">
        <v-sheet
            class="col-12 col-sm-6 text-left"
            :min-width="defaultMinWidth"
            max-width="550"
            style="overflow-y: auto"
        >
            <div class="headline font-weight-bold" v-text="$t('commercial')"/>
            <div class="subtitle-1 mb-4" v-text="$t(tabs[tabIndex])"/>

            <error :message="error"/>
            <kpi-box/>
            <v-tabs show-arrows v-model="tabIndex">
                <v-tab
                    v-for="tab in tabs"
                    :key="tab"

                    v-text="$t(tab)"

                    @click="onClickTab(tab)"
                />
            </v-tabs>
            <router-view/>
        </v-sheet>
        <router-view name="detail" class="detail col-12 col-sm-6 fill-height py-0" :class="{'elevation-5' : $vuetify.breakpoint.mdAndDown}"/>
    </div>
</template>

<script>
  import KpiBox from "../../components/KpiBox";
  import Error from "../../components/alerts/Error";

  export default {
      components: {
          Error,
          KpiBox
      },
      data() {
          return {
              error: '',

              tabs: [
                  'products',
                  'orders',
                  'agreements',
                  'templates'
              ],
              tabIndex: 0
          };
      },
      created() {
          this.tabIndex = this.defaultIndex
      },
      computed: {
          defaultTab(){
              return this.$route.name.split(':')[0]
          },
          defaultIndex(){
              let index = this.tabs.indexOf(this.defaultTab)
              console.log("defaultIndex", index)

              return index
          },
          defaultMinWidth(){
              if(this.$vuetify.breakpoint.smAndUp)
                  return 600

              return 0
          },
      },
      methods: {
          onClickTab(tab) {
              this.$router.push({name: tab}).catch(() => {})
          }
      }
  }
</script>

<style lang="scss">
    .header {
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 3;
    }
    .footer {
        width: 100%;
        position: sticky;
        bottom: 0;
        height: 120px;
    }
    .detail {
        position: absolute;
        top:0;
        right: 0;
        overflow-y: scroll;
    }
</style>
