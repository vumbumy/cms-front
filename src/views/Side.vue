<template>
  <v-container>
    <v-app-bar app clipped-left height="40" flat>
      <v-toolbar-title>LOGO</v-toolbar-title>
      <v-spacer/>
      <v-app-bar-nav-icon
              v-if="this.$vuetify.breakpoint.xs"
              @click.stop="drawer = !drawer"/>
    </v-app-bar>

    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            :right="this.$vuetify.breakpoint.xs"
            mobile-breakpoint="xs"
            :mini-variant="this.$vuetify.breakpoint.mdAndDown"
            hide-overlay
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content class="text-left">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/tabs">
          <v-list-item-action>
            <v-icon>mdi-tab</v-icon>
          </v-list-item-action>
          <v-list-item-content class="text-left">
            <v-list-item-title>Tabs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-system-bar window app color="red" v-if="systemMsg" :height="barHeight">
      <v-row justify="center">
        <v-col class="white--text">
          <div v-for="(msg, index) in msgArray" :key="index" v-html="msg"/>
        </v-col>
        <v-col class="text-right" style="position: absolute">
          <v-icon @click="systemMsg=null">mdi-close</v-icon>
        </v-col>
      </v-row>
    </v-system-bar>

    <v-snackbar app timeout="-1" v-model="snackbar" right bottom color="primary" vertical>
      <v-row>
        <v-col v-html="snackbar"/>
      </v-row>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = null">
          OK
        </v-btn>
        <v-btn text v-bind="attrs" @click="snackbar = null">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    computed:{
      msgArray(){
        return this.systemMsg.split('<br>')
      },
      barHeight(){
        return this.msgArray.length * 25
      }
    },
    data: () => ({
      drawer: null,
      snackbar: "Guide Message",
      systemMsg: "<strong>System Error Message</strong><br>System Error Message",
    }),
  }
</script>