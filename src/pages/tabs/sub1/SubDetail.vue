<template>
  <v-container fluid class="ma-0">
      <v-row no-gutters>
        <v-col class="text-left">
            <v-icon v-if="$vuetify.breakpoint.xs" @click="onClickClose">mdi-arrow-left</v-icon>
            <v-btn v-else @click="onClickClose" text>닫기</v-btn>
        </v-col>
        <v-col class="text-right">
          <v-btn text>저장</v-btn>
        </v-col>
      </v-row>
    <v-row align="center">
      <v-col class="text-left">
        <v-btn height="30">PERMISSION</v-btn>
      </v-col>
      <v-col class="text-right">
<!--        {{new Date().toISOString().split('T')[0]}}-->
        {{dateToDateTime(new Date())}}
      </v-col>
    </v-row>
    <v-alert class="mb-1" dense outlined type="error" dismissible>
      <strong>Main Warning</strong> (Reminder)
    </v-alert>
    <v-row no-gutters justify="space-between">
      <v-col cols="12" sm="6">
        <photo/>
      </v-col>
      <v-col cols="12" sm="5">
        <v-text-field label="NAME"/>
        <v-text-field label="DESCRIPTION"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels flat dark>
          <v-expansion-panel>
            <v-expansion-panel-header color="#666">ADVANCED</v-expansion-panel-header>
            <v-expansion-panel-content color="#999">
              <v-text-field label="A"/>
              <v-text-field label="B"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-tabs height="40" grow>
          <v-tab v-for="(tab, index) in tabs" :key="index">
            {{tab}}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Photo from "../../../components/Photo";
  import {dateToDateTime} from "../../../scripts/util";
  export default {
    components: {Photo},
    data: () => ({
      dialog: true,
      tabs: ['ses x', 'ses y' ,'ses z']
    }),
    methods: {
        onClickClose: function(){
            this.$router.push('/tabs/sub1')
        },
      dateToDateTime: dateToDateTime
    }
  }
</script>

<!--<style lang="scss" scoped>-->
<!--  .v-tab{-->
<!--    font-size: 5px;-->
<!--  }-->
<!--</style>-->