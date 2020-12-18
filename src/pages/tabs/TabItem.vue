<template>
    <v-row>
        <v-col>
            <v-alert dense outlined type="warning" border="left" class="mb-2" v-for="(msg, index) in alertMsg" :key="index" dismissible>
                <div v-html="msg"/>
            </v-alert>
            <bar-chart style="background: dimgray"/>
            <v-row dense>
                <v-col class="py-0">
                    <v-text-field prepend-icon="mdi-filter" placeholder="검색어" v-model="keyword"/>
                </v-col>
            </v-row>
            <v-chip-group multiple active-class="primary" v-model="active_tags">
                <v-chip class="mr-1" @click="onClickAll">전체</v-chip>
                <v-chip v-for="(tag, index) in tags" :key="index" class="mr-1" @click="onClickTag">
                    {{tag}}
                </v-chip>
            </v-chip-group>
            <v-row justify="space-between">
                <v-col class="text-left">
                    <v-icon class="mr-2" @click="check=!check" v-if="!check">mdi-checkbox-blank-outline</v-icon>
                    <v-icon class="mr-2" @click="check=!check" v-else>mdi-check-box-outline</v-icon>
                    <v-icon class="mr-2" @click="$router.push('/tabs/0')">mdi-plus</v-icon>
                    <v-icon class="mr-2" @click="dots=false" v-if="dots">mdi-dots-vertical</v-icon>
                    <v-icon class="mr-2" v-if="!dots">mdi-refresh</v-icon>
                    <v-icon class="mr-2" v-if="!dots">mdi-download</v-icon>
                    <v-icon v-if="!dots">mdi-trash-can-outline</v-icon>
                </v-col>
                <v-col class="text-right">
                    15 of 200
                    <v-icon>mdi-chevron-left</v-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-col>
            </v-row>
            <router-view/>
        </v-col>
    </v-row>
</template>

<script>
  import BarChart from "../../components/BarChart";
  export default {
      components: {BarChart},
      data: () => ({
          keyword: "",
          active_tags: [],
          tags: ['의정부', '최근 1주'],
          check: false,
          dots: true,
          alertMsg: [
              '<strong>Section Warning</strong> (Notice)'
          ],
          refreshId: 0
      }),
      methods: {
          onClickAll(){
              let index = Object.values(this.active_tags).indexOf(0)
              if (index === -1) {
                  this.active_tags.splice(0, this.active_tags.length)
              }
          },
          onClickTag(){
              let index = Object.values(this.active_tags).indexOf(0)
              if (index > -1) {
                  this.active_tags.splice(index, 1)
              }
          }
      }
  }
</script>