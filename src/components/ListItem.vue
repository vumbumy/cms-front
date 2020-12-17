<template>
    <v-list-item link to="/tabs/sub1/1">
        <v-list-item-avatar
                tile
                size="80"
                color="grey"
        ></v-list-item-avatar>
        <v-list-item-content>
            <v-row justify="space-between">
                <v-col class="py-0">
                    <div class="overline my-0">
                        LABLE
                    </div>
                    <v-list-item-title class="headline mb-1">
                        TITLE
                    </v-list-item-title>
                    <v-list-item-subtitle>DESCRIPTION</v-list-item-subtitle>
                </v-col>
                <v-spacer/>
                <v-col class="py-0" v-if="!this.$vuetify.breakpoint.xs">
                    <div class="overline my-0">
                        INFO
                    </div>
                    <v-list-item-title class="headline mb-1">
                        VALUE
                    </v-list-item-title>
                    <v-list-item-subtitle>DESCRIPTION</v-list-item-subtitle>
                </v-col>
            </v-row>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
    export default {
        // mounted() {
        //     console.log(this.$route.query.id)
        // }
    }
</script>