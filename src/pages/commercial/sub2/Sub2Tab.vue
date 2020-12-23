<template>
    <v-sheet class="my-2">
        <v-alert dense outlined type="warning" border="left" class="mb-2" v-for="(msg, index) in alertMsg" :key="index" dismissible>
            <div v-html="msg"/>
        </v-alert>
        <bar-chart style="background: dimgray"/>
        <sort-search-view
            @search="onSearch"
            @update_order="onUpdateOrder"
            @update_view="onUpdateView"
        />
        <v-chip-group multiple active-class="primary" v-model="active_tags">
            <v-chip class="py-0 my-0 mr-1" @click="onClickAll">전체</v-chip>
            <v-chip class="mr-1 py-0 my-0" v-for="(tag, index) in tags" :key="index" @click="onClickTag">
                {{tag}}
            </v-chip>
        </v-chip-group>
        <list-view :items="items" :view="view">
            <template v-slot:item="{item}">
                <sub2-list-item :item="item"/>
            </template>
        </list-view>
    </v-sheet>
</template>

<script>

    import BarChart from "../../../components/BarChart";
    import SortSearchView from "../../../components/SortSearchView";
    import ListView from "../../../components/layouts/ListView";
    import {CARD_VIEW} from "../../../scripts/const";
    import Sub2ListItem from "./Sub2ListItem";


    export default {
        components: {
            Sub2ListItem,
            ListView,
            SortSearchView,
            BarChart
        },
        data: () => ({
            // keyword: "",
            view: CARD_VIEW,
            active_tags: [],
            tags: ['의정부', '최근 1주'],
            alertMsg: [
                '<strong>Section Warning</strong> (Notice)'
            ],
            // refreshId: 0,
            items: [
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
        }),
        methods: {
            onClickAll(){
                let index = Object.values(this.active_tags).indexOf(0)
                if (index === -1) {
                    this.active_tags.splice(0, this.active_tags.length)
                }
            },
            onClickTag(){
                let index = Object.values(this.active_tags).indexOf(0)
                if (index > -1) {
                    this.active_tags.splice(index, 1)
                }
            },
            onSearch: function(param){
                console.log(param)
            },
            onUpdateView: function (param) {
                this.view = param
            },
            onUpdateOrder: function (param) {
                console.log(param)
            }
        }
    }
</script>
