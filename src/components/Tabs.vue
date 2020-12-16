<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col class="text-left">
                <div class="headline font-weight-bold">{{title}}</div>
                <div class="subtitle-1 mb-4">{{title}} -> {{tabs[active_tab]}}</div>

                <v-alert
                        dense
                        outlined
                        type="error"
                >
                    <strong>Main Warning</strong> (reminder)
                </v-alert>
                <kpi-box/>
                <v-tabs v-model="active_tab" height="40">
                    <v-tab v-for="(value, id) in tabs" :key="id">
                        {{value}}
                    </v-tab>
                </v-tabs>
                <list/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  import List from "./List";
  import KpiBox from "./KpiBox";
  export default {
      components: {KpiBox, List},
      props: {
          tabs: {
              type: Array,
              default: function () {
                  return []
              }
          }
      },
      data() {
          return {
              title: this.$route.name,

              active_tab: 0,
          };
      }
  }
</script>