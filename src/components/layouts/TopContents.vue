<template>
    <div class="d-flex">
        <div :class="borders[index]" @click="index = (index + 1) % borders.length"/>
        <v-sheet class="d-flex col-12 py-0">
            <div class="d-flex flex-column text-left col-8 pa-0">
                <slot/>
            </div>
            <v-spacer/>
            <div class="d-flex flex-column text-right">
                <div v-if="updated" class="text-caption" v-text="timestampToString(updated)"/>
                <div v-if="created" class="text-caption grey--text text--darken-2" v-text="timestampToString(created)"/>
                <permissions/>
            </div>
        </v-sheet>
    </div>
</template>

<script>
    import Permissions from "../Permissions";
    import {timestampToString} from "../../scripts/util";

    export default {
        components: {
            Permissions
        },
        props: {
            readonly: Boolean,
            updated: Number,
            created: Number,
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
            timestampToString: timestampToString
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
