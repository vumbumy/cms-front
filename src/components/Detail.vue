<template>
  <v-container fluid class="ma-0 py-0">
<!--  <v-dialog v-model="dialog" overlay-opacity="0">-->
    <v-sheet>
      <v-row no-gutters>
        <v-col cols="12" class="text-right">
          <v-btn text @click="$router.push('/tabs/sub1')">닫기</v-btn>
          <v-btn text>저장</v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-row dense>
          <v-col
                  v-for="n in 9"
                  :key="n"
                  class="d-flex child-flex"
                  cols="4"
          >
            <v-img
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                >
                  <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-sheet>
<!--  </v-dialog>-->
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: true
    })
  }
</script>