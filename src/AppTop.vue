<template>
    <div>
        <v-app-bar app clipped-left height="40" flat class="mx-0 px-0" outlined style="background: white">
            <!--        <v-img :src="require('../assets/logo.png')" contain max-height="40"/>-->
            <v-img src="https://naim.ai/img/logo.png" max-width="40" contain/><div class="mx-1">|</div><b>ad</b>

            <v-spacer/>
            <div>
                Hello! <b>Tester</b>
            </div>
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
  export default {
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
