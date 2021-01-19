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
        >
            <template v-slot:item="{item}">
                <contract-card :item="item"/>
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
    import ContractCard from "./ContractCard";
    import {registerRefresh} from "../../../plugins/eventBus";
    import {getContracts} from "../../../api/contracts";
    import {getTemplates} from "../../../api/templates";


    export default {
        components: {
            ContractCard,
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

            loading: false
        }),
        created() {
            registerRefresh(this.loadItemList)

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

                this.items = getContracts()

                this.setTemplateTitles()

                this.loading = false
            },
            setTemplateTitles(){
                let templates = getTemplates()

                for(let item of this.items.filter(i => i.templateNo > 0)){
                    item.templateTitle = templates.find(t => t.no === item.templateNo).title
                }
            }
        }
    }
</script>
