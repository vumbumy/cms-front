<template>
    <div class="d-flex">
        <div :class="borders[index]" @click="index = (index + 1) % borders.length"/>
        <v-sheet class="d-flex col-12 py-0">
            <div class="d-flex flex-column text-left">
                <slot/>
            </div>
            <v-spacer/>
            <div class="d-flex flex-column text-right">
                <div class="caption" v-text="dateToDateTime(updated)"/>
                <div class="caption grey--text text--darken-2" v-text="dateToDateTime(created)"/>
                <permissions/>
            </div>
        </v-sheet>
    </div>
</template>

<script>
    import Permissions from "../Permissions";
    import {dateToDateTime} from "../../scripts/util";

    export default {
        components: {
            Permissions
        },
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
            index: 0,
            borders: [
                "border-grey",
                "border-orange",
                "border-blue",
                "border-green",
            ],
        }),
        // mounted() {
        //     console.log(this.borders.length)
        // },
        methods: {
            dateToDateTime: dateToDateTime
        }
    }
</script>

<style lang="scss" scoped>
    .border-orange {
        border-left: orange 10px solid;
    }
    .border-grey {
        border-left: lightgray 10px solid;
    }
    .border-blue {
        border-left: blue 10px solid;
    }
    .border-green {
        border-left: green 10px solid;
    }
</style>
