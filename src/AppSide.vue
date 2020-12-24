<template>
    <div id="side">
        <v-navigation-drawer
            v-model="drawer"
            width="200"
            app
            clipped
            :right="$vuetify.breakpoint.xs"
            mobile-breakpoint="xs"
            :mini-variant="$vuetify.breakpoint.sm"
            hide-overlay
        >
            <v-list dense>
                <v-list-item-group color="#00f">
                    <div v-for="menu in menus" :key="menu.name" :to="menu.path">
                        <v-list-item v-if="menu.name" :to="menu.path" class="py-1">
                            <v-list-item-icon class="mr-2">
                                <v-icon size="20" v-text="menu.icon"/>
                            </v-list-item-icon>
                            <v-list-item-subtitle class="text-left" v-text="$t(menu.name)"/>
                        </v-list-item>
                        <v-divider v-else class="py-0 my-0"/>
                    </div>
                    <log-out/>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

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
    </div>
</template>

<script>
  import {defaultMenus} from "./menu";
  import LogOut from "./components/LogOut";

  export default {
      components: {LogOut},
      props: {
          value: Boolean
      },
      data: () => ({
          drawer: false,
          snackbar: "Guide Message",

          menus: defaultMenus,
      }),
      created() {
          this.drawer = this.value
      },
      watch: {
          value(){
            this.drawer = this.value
          },
          drawer(){
              this.$emit('input', this.drawer)
          }
      }
  }
</script>
