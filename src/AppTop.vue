<template>
    <div>
        <v-app-bar
            app
            flat
            outlined
            clipped-left
            height="40"
            class="mx-0 px-0 text-subtitle-2 font-weight-light"
            style="background: white"
        >
            <v-img src="https://naim.ai/img/logo.png" max-width="40" contain/><div class="mx-1">|</div><b>ad</b>
            <v-spacer/>
            Hello,
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn class="px-0 text-subtitle-2" v-bind="attrs" v-on="on" text rounded>
                        Tester
                    </v-btn>
                </template>
                <v-list dense>
                    <log-out/>
                </v-list>
            </v-menu>
            <v-app-bar-nav-icon
                v-if="$vuetify.breakpoint.xs"
                @click.stop="$emit('toggle')"/>
        </v-app-bar>

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
    </div>
</template>

<script>
  import LogOut from "./components/LogOut";
  export default {
      components: {LogOut},
      data: () => ({
          systemMsg: "<strong>System Error Message</strong><br>System Error Message",
      }),

      computed:{
          msgArray(){
              return this.systemMsg.split('<br>')
          },
          barHeight(){
              return this.msgArray.length * 25
          }
      }
  }
</script>
