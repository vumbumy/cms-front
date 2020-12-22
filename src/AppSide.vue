<template>
    <v-container>
        <v-app-bar app clipped-left height="40" flat class="mx-0 px-0" outlined style="background: white">
            <!--        <v-img :src="require('../assets/logo.png')" contain max-height="40"/>-->
            <v-img src="https://naim.ai/img/logo.png" max-width="40" contain/><div class="mx-1">|</div><b>ad</b>

            <v-spacer/>
            <div>
                Hello! <b>Tester</b>
            </div>
            <v-app-bar-nav-icon
                    v-if="$vuetify.breakpoint.xs"
                    @click.stop="drawer = !drawer"/>
        </v-app-bar>

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
            </v-list-item-group>
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
  import {defaultMenus} from "./menu";

  export default {
      data: () => ({
          drawer: null,
          snackbar: "Guide Message",
          systemMsg: "<strong>System Error Message</strong><br>System Error Message",

          menus: defaultMenus,
      }),

      computed:{
          msgArray(){
              return this.systemMsg.split('<br>')
          },
          barHeight(){
              return this.msgArray.length * 25
          }
      },
      mounted() {
          console.log(this.menus)
      }
  }
</script>

<style scoped>
  .tile:hover {
    color: blue;
  }
  .tile:active {
    color: blue;
  }
</style>