<template>
    <div>
        <close-edit-save/>
        <v-row>
            <v-col class="text-left">
                <permissions/>
            </v-col>
            <v-col class="text-right">
                {{dateToDateTime(new Date())}}
            </v-col>
        </v-row>
        <v-alert class="mb-1" dense outlined type="error" dismissible>
            <strong>Main Warning</strong> (Reminder)
        </v-alert>
        <v-row dense>
            <v-col cols="12" sm="6">
                <photo/>
            </v-col>
            <v-col cols="12" sm="5">
                <v-text-field label="NAME"/>
                <v-text-field label="DESCRIPTION"/>
            </v-col>
        </v-row>
        <v-row dense>
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
                <v-tabs grow>
                    <v-tab v-for="(tab, index) in tabs" :key="index">
                        {{tab}}
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import Photo from "../../../components/Photo";
    import CloseEditSave from "../../../components/CloseEditSave";

    import Permissions from "../../../components/Permissions";
    import {dateToDateTime} from "../../../scripts/util";

    export default {
        components: {
            Permissions,
            CloseEditSave,
            Photo},
        data: () => ({
            dialog: true,
            tabs: ['ses x', 'ses y' ,'ses z']
        }),
        methods: {
            dateToDateTime: dateToDateTime
        }
    }
</script>

<!--<style lang="scss" scoped>-->
<!--  .v-tab{-->
<!--    font-size: 5px;-->
<!--  }-->
<!--</style>-->
