<template>
    <v-card class="mx-auto" outlined link :to="{ query: {id: item.id} }">
        <v-list-item>
            <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
            ></v-list-item-avatar>
            <v-list-item-content>
                <v-row justify="space-between">
                    <v-col class="py-0">
                        <div class="overline my-0">
                            {{item.label}}
                        </div>
                        <v-list-item-title class="headline mb-1">
                            {{item.title}}
                        </v-list-item-title>
                        <v-list-item-subtitle>DESCRIPTION</v-list-item-subtitle>
                    </v-col>
                    <v-spacer/>
                    <v-col class="py-0" v-if="!$vuetify.breakpoint.xs">
                        <div class="overline my-0">
                            {{item.info}}
                        </div>
                        <v-list-item-title class="headline mb-1">
                            {{item.value}}
                        </v-list-item-title>
                        <v-list-item-subtitle>DESCRIPTION</v-list-item-subtitle>
                    </v-col>
                </v-row>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: function () {
                    return null
                }
            }
        },
    }
</script>
