<template>
    <v-sheet class="my-2">
        <warning :messages="warnings"/>
<!--        <bar-chart/>-->
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
        <item-list
            v-model="page"
            :headers="headers"
            :items="items"
            :view="view"
            :items-length="items.length"
            :loading="loading"

            v-on:refresh="loadItemList"
        >
            <template v-slot:item="{item}">
                <template-card :item="item"/>
            </template>
        </item-list>
    </v-sheet>
</template>

<script>

    // import BarChart from "../../../components/BarChart";
    import SortSearchView from "../../../components/SortSearchView";
    import {CARD_VIEW} from "../../../scripts/const";
    import ItemList from "../../../components/layouts/ItemList";
    import Warning from "../../../components/alerts/Warning";
    import TemplateCard from "./TemplateCard";
    import {getTemplates} from "../../../api/templates";
    import EventBus from "../../../plugins/eventBus";


    export default {
        components: {
            TemplateCard,
            Warning,
            ItemList,
            SortSearchView,
            // BarChart
        },
        data: () => ({
            view: CARD_VIEW,
            active_tags: [],
            tags: ['의정부', '최근 1주'],
            warnings: [],
            headers: [
                { text: '#', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Type', value: 'type' },
                { text: 'Description', value: 'description' },
                { text: 'Stock', value: 'stock' },
            ],
            page: 0,
            items: [],

            loading: true
        }),
        created() {
            EventBus.$on("refresh", this.loadItemList)

            this.loadItemList()
        },
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
                console.log('onSearch', param)
            },
            onUpdateView: function (param) {
                console.log('onUpdateView', param)

                this.view = param
            },
            onUpdateOrder: function (param) {
                console.log('onUpdateOrder', param)
            },
            loadItemList(){
                this.loading = true

                this.items = getTemplates()

                setTimeout(() => this.loading = false, 1000)
            }
        }
    }
</script>
