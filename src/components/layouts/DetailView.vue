<template>
    <v-container fluid class="ma-0">
        <close-edit-save/>
        <v-row align="center">
            <v-col class="text-left">
                <v-btn height="30">PERMISSION</v-btn>
            </v-col>
            <v-col class="text-right">
                {{dateToDateTime(new Date())}}
            </v-col>
        </v-row>
        <v-alert class="mb-1" dense outlined type="error" dismissible>
            <strong>Main Warning</strong> (Reminder)
        </v-alert>
        <slot name="detail" :item="item"/>
    </v-container>
</template>

<script>
    import {dateToDateTime} from "../../scripts/util";
    import CloseEditSave from "../CloseEditSave";

    export default {
        components: {CloseEditSave},
        props: {
            item: Object
        },
        methods: {
            dateToDateTime: dateToDateTime
        }
    }
</script>

<style scoped>

</style>
