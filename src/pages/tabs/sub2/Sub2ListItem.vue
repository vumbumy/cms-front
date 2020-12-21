<template>
    <v-container fluid class="ma-0 pa-0">
        <v-row v-for="item in itemList" :key="item.id" dense>
            <v-col>
                <v-card class="mx-auto" outlined>
                    <v-list-item :to="`/tabs/sub2?id=` + item.id">
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            itemList: [
                {
                    id: 1,
                    label: "LABEL1",
                    title: "TITLE1",
                    info: "INFO1",
                    value: "10"
                },
                {
                    id: 2,
                    label: "LABEL2",
                    title: "TITLE2",
                    info: "INFO2",
                    value: "20"
                }
            ]
        })
    }
</script>