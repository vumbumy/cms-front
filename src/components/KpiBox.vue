<template>
    <v-container class="px-0">
        <v-row dense>
            <v-col cols="3">
                <v-card>
                    <v-responsive :aspect-ratio="5/6" class="pa-3">
                        <div class="overline pa-0">
                            LABEL
                        </div>
                        <v-list-item-title class="headline mb-1">
                            <strong>VALUE</strong>
                        </v-list-item-title>
                        <v-list-item-subtitle>DESCRIPTION</v-list-item-subtitle>
                    </v-responsive>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card>
                    <v-responsive :aspect-ratio="5/6" class="pa-3">
                        <div class="overline pa-0">
                            LABEL
                        </div>
                        <v-list-item-title class="headline mb-1">
                            <strong>VALUE</strong>
                        </v-list-item-title>
                        <v-list-item-subtitle>DESCRIPTION</v-list-item-subtitle>
                    </v-responsive>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card>
                    <v-responsive :aspect-ratio="5/6" class="pa-3">
                        <div class="overline pa-0">
                            LABEL
                        </div>
                        <v-list-item-title class="headline mb-1">
                            <strong>VALUE</strong>
                        </v-list-item-title>
                        <v-list-item-subtitle>DESCRIPTION</v-list-item-subtitle>
                    </v-responsive>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card>
                    <v-responsive :aspect-ratio="5/6" class="pa-3">
                        <div class="overline pa-0">
                            LABEL
                        </div>
                        <v-list-item-title class="headline mb-1">
                            <strong>VALUE</strong>
                        </v-list-item-title>
                        <v-list-item-subtitle>DESCRIPTION</v-list-item-subtitle>
                    </v-responsive>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
      props: {
          tabs: {
              type: Array,
              default: function () {
                  return []
              }
          }
      },
      data() {
          return {
              title: this.$route.name,

              active_tab: 0,
          };
      }
  }
</script>