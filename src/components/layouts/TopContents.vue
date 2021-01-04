<template>
    <div class="d-flex">
        <div :class="colors[colorIndex]" style="width: 10px;" @click="colorIndex = (colorIndex + 1) % colors.length"/>
        <v-sheet class="pl-4 d-flex flex-grow-1">
            <div class="d-flex flex-column text-left">
                <slot/>
            </div>
            <div class="ml-auto d-flex flex-column text-right">
                <div class="caption" v-text="dateToDateTime(updated)"/>
                <div class="caption grey--text text--darken-2" v-text="dateToDateTime(created)"/>
                <permissions class="mt-auto"/>
            </div>
        </v-sheet>
    </div>
</template>

<script>
    import Permissions from "../Permissions";
    import {dateToDateTime} from "../../scripts/util";

    export default {
        components: {Permissions},
        props: {
            readonly: Boolean,
            updated: {
                type: Number,
                default: new Date()
            },
            created: {
                type: Number,
                default: new Date()
            },
        },
        data: () => ({
            colorIndex: 0,
            colors: ["orange", "grey"],
        }),
        methods: {
            dateToDateTime: dateToDateTime
        }
    }
</script>
