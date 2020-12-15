<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col class="text-left">
                <div class="headline font-weight-bold">Tabs</div>
                <div class="subtitle-1 mb-4">SubTitle</div>

                <v-tabs v-model="tab" height="40">
                    <v-tab>
                        <h4>A</h4>
                    </v-tab>
                    <v-tab>
                        <h4>B</h4>
                    </v-tab>
                </v-tabs>
                <list/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  import List from "./List";
  export default {
      components: {List},
      data() {
          return {
              tab: null,
          };
      }
  }
</script>