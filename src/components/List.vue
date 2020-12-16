<template>
    <v-row>
        <v-col>
            <v-alert dense outlined type="warning" border="left">
                <strong>Section Warning</strong> (Notice)
            </v-alert>
            <bar-chart style="background: dimgray"/>
            <v-row dense>
                <v-col class="py-0">
                    <v-text-field prepend-icon="mdi-filter" placeholder="검색어" v-model="keyword"/>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col class="py-0">
                    <v-chip v-for="(chip, index) in chips" :key="index" :color="color(index)" @click="onClickChip(index)" class="mr-1">
                        {{chip}}
                    </v-chip>
                </v-col>
            </v-row>
            <v-row justify="space-between">
                <v-col class="text-left">
                    <v-icon @click="check=!check" v-if="!check">mdi-checkbox-blank-outline</v-icon>
                    <v-icon @click="check=!check" v-else>mdi-check-box-outline</v-icon>
                    <v-icon @click="$router.push('/tabs/0')">mdi-plus</v-icon>
                    <v-icon @click="dots=false" v-if="dots">mdi-dots-vertical</v-icon>
                    <v-icon v-if="!dots">mdi-refresh</v-icon>
                    <v-icon v-if="!dots">mdi-download</v-icon>
                    <v-icon v-if="!dots">mdi-trash-can-outline</v-icon>
                </v-col>
                <v-col class="text-right">
                    15 of 200
                    <v-icon>mdi-chevron-left</v-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-col>
            </v-row>
            <v-card class="mx-auto" outlined>
                <list-item/>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
  import ListItem from "./ListItem";
  import BarChart from "./BarChart";
  export default {
      components: {BarChart, ListItem},
      data: () => ({
          keyword: "",
          active_chip: 0,
          chips: ['전체', '의정부', '최근 1주'],
          check: false,
          dots: true
      }),
      methods: {
          color: function (index) {
              if(index === this.active_chip)
                  return 'primary'
          },
          onClickChip(index){
              this.active_chip = index
              // this.keyword = this.chips[index]
          }
      }
  }
</script>