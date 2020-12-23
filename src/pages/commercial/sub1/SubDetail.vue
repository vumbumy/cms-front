<template>
    <v-container fluid class="ma-0 pa-0">
        <v-row dense>
            <v-col cols="12" sm="6">
                <photo/>
            </v-col>
            <v-col cols="12" sm="5">
                <v-text-field label="NAME"/>
                <v-text-field label="DESCRIPTION"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-expansion-panels flat dark>
                    <v-expansion-panel>
                        <v-expansion-panel-header color="#666">ADVANCED</v-expansion-panel-header>
                        <v-expansion-panel-content color="#999">
                            <v-text-field label="A"/>
                            <v-text-field label="B"/>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col>
                <v-tabs height="40" grow>
                    <v-tab v-for="(tab, index) in tabs" :key="index">
                        {{tab}}
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Photo from "../../../components/Photo";

    export default {
        components: {Photo},
        data: () => ({
            dialog: true,
            tabs: ['ses x', 'ses y' ,'ses z']
        }),
        mounted() {
            console.log(this.$route)
        },

    }
</script>

<!--<style lang="scss" scoped>-->
<!--  .v-tab{-->
<!--    font-size: 5px;-->
<!--  }-->
<!--</style>-->
