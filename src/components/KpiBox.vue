<template>
    <v-sheet dense height="140" class="d-flex justify-space-between">
        <div v-for="(item, index) in items" :key="index">
            <v-card class="text-center">
                <v-responsive :aspect-ratio="5/6" class="pa-3">
                    <div class="overline pa-0" v-text="item.label"/>
                    <v-list-item-title class="headline mb-1">
                        <strong v-text="item.value"/>
                    </v-list-item-title>
                    <v-list-item-subtitle v-text="item.description"/>
                </v-responsive>
            </v-card>
        </div>
    </v-sheet>
</template>

<script>
  export default {
      props: {
          items: {
              type: Array,
              default: () => ([])
              // default: () => ([
              //     {
              //         label: 'LABEL',
              //         value: 'VALUE',
              //         description: 'DESCRIPTION'
              //     },
              //     {
              //         label: 'LABEL',
              //         value: 'VALUE',
              //         description: 'DESCRIPTION'
              //     },
              //     {
              //         label: 'LABEL',
              //         value: 'VALUE',
              //         description: 'DESCRIPTION'
              //     },
              //     {
              //         label: 'LABEL',
              //         value: 'VALUE',
              //         description: 'DESCRIPTION'
              //     }
              // ])
          }
      }
  }
</script>
