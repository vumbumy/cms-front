<template>
  <v-container>
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            :right="this.$vuetify.breakpoint.xs"
            mobile-breakpoint="xs"
            :mini-variant="this.$vuetify.breakpoint.smAndDown"
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

    <v-app-bar app clipped-left height="40">
      <v-toolbar-title>LOGO</v-toolbar-title>
      <v-spacer/>
      <v-app-bar-nav-icon
              v-if="this.$vuetify.breakpoint.xs"
              @click.stop="drawer = !drawer"/>
    </v-app-bar>
  </v-container>

</template>

<script>
  export default {
    data: () => ({
      drawer: null,
    }),
  }
</script>