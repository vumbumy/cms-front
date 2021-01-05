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
            :items-length="itemsLength"
        >
            <template v-slot:item="{item}">
                <agreement-card :item="item"/>
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
    import AgreementCard from "./AgreementCard";


    export default {
        components: {
            AgreementCard,
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
            items: [
                {
                    id: 10,
                    name: '일반광고계약-34',
                    template: '일반광고계약template1',
                    document: 'https://gdocument/skdjhfs677878',
                }
            ],
        }),
        computed: {
            // items() {
            //     let items = []
            //     let textList = sampleTextList(this.page)
            //
            //     for(let i=0; i<textList.length; i++){
            //         let id = this.page * ITEMS_PER_PAGE + i + 1
            //         items.push(
            //             {
            //                 id: id,
            //                 name: textList[i],
            //                 type: textList[i],
            //                 description: textList[i],
            //                 stock: i % 10 * 10,
            //             }
            //         )
            //     }
            //
            //     return items
            // },
            itemsLength() {
                return 1
            }
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
            }
        }
    }
</script>
