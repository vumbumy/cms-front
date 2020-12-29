<template>
    <!-- TODO: 컬러 보더 추가 -->
    <v-sheet class="pl-4 my-2 d-flex" style="border-left: 10px solid orange;">
        <div class="d-flex flex-column text-left">
            <div v-if="readonly" class="text-h5 text-sm-h4">
                <strong v-text="item.name"/>
            </div>
            <v-text-field v-else label="이름" v-model="item.name"/>
            <div v-if="readonly" class="text-h6 text-sm-h5 grey--text text--darken-2">
                <strong v-text="item.type"/>
            </div>
            <v-text-field v-else label="카테고리" v-model="item.type"/>
        </div>
        <div class="ml-auto d-flex flex-column text-right">
            <div class="caption" v-text="item.updated"/>
            <div class="caption grey--text text--darken-2" v-text="item.created"/>
            <permissions class="mt-auto"/>
        </div>
    </v-sheet>
</template>

<script>
    import Permissions from "./Permissions";
    import {dateToDateTime} from "../scripts/util";
    export default {
        components: {Permissions},
        props: {
            value: Object,
            readonly: Boolean
        },
        data: () => ({
            item: {
                name: "디지털01-의정부",
                type: "나임의 정부",
                updated: dateToDateTime(new Date()),
                created: "19.07.14 13:23"
            }
        })
    }
</script>

<style scoped>
    .draft {
        border-left: 10px solid lightgray;
    }
    .read {
        border-left: 10px solid orange;
    }
</style>
