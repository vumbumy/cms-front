<template>
  <v-container>
    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            :right="isXS"
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content class="text-left">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content class="text-left">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
            app
            clipped-left
    >
      <v-toolbar-title>LOGO</v-toolbar-title>
      <v-spacer/>
      <v-app-bar-nav-icon
              v-if="isXS"
              @click.stop="drawer = !drawer"/>
    </v-app-bar>
  </v-container>

</template>

<script>
  export default {
    data: () => ({
      drawer: null,
    }),
    computed: {
      isXS() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          default: return false
        }
      },
    },
  }
</script>