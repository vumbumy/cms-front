<template>
    <v-list-item>
        <v-list-item-avatar
            tile
            size="80"
            color="grey"
        />
        <v-list-item-content>
            <v-row justify="space-between">
                <v-col class="py-0">
                    <div class="overline my-0">
                        {{item.type}}
                    </div>
                    <v-list-item-title class="headline mb-1">
                        {{item.name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
                </v-col>
                <v-spacer/>
                <v-col class="py-0" v-if="!$vuetify.breakpoint.xs">
                    <div class="overline my-0">
                        LABEL
                    </div>
                    <v-list-item-title class="headline mb-1">
                        {{item.stock}}
                    </v-list-item-title>
                    <v-list-item-subtitle>INFO</v-list-item-subtitle>
                </v-col>
            </v-row>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    export default {
        props: {
            item: Object
        },
    }
</script>
