<template>
    <v-sheet class="my-2">
        <v-alert dense outlined type="warning" border="left" class="mb-2" v-for="(msg, index) in alertMsg" :key="index" dismissible>
            <div v-html="msg"/>
        </v-alert>
        <bar-chart/>
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
        <list-view
            v-model="page"
            :headers="headers"
            :items="items"
            :view="view"
            :items-length="itemsLength"
        >
            <template v-slot:item="{item}">
                <sub1-list-item :item="item"/>
            </template>
        </list-view>
    </v-sheet>
</template>

<script>

    import BarChart from "../../../components/BarChart";
    import SortSearchView from "../../../components/SortSearchView";
    import ListView from "../../../components/layouts/ListView";
    import {CARD_VIEW, ITEMS_PER_PAGE} from "../../../scripts/const";
    import Sub1ListItem from "./Sub1ListItem";
    import {sampleTextList, sampleTextListLength} from "../../../scripts/mock";


    export default {
        components: {
            Sub1ListItem,
            ListView,
            SortSearchView,
            BarChart
        },
        data: () => ({
            view: CARD_VIEW,
            active_tags: [],
            tags: ['의정부', '최근 1주'],
            alertMsg: [
                '<strong>Section Warning</strong> (Notice)'
            ],
            headers: [
                { value: 'check' },
                { text: '#', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Type', value: 'type' },
                { text: 'Description', value: 'description' },
                { text: 'Stock', value: 'stock' },
            ],
            page: 0
            // items: [],
        }),
        computed: {
            items() {
                let items = []
                let textList = sampleTextList(this.page)

                for(let i=0; i<ITEMS_PER_PAGE; i++){
                    let id = this.page * ITEMS_PER_PAGE + i
                    items.push(
                        {
                            id: id,
                            name: textList[i],
                            type: textList[i],
                            description: textList[i],
                            stock: i % 10 * 10,
                            check: false
                        }
                    )
                }

                return items
            },
            itemsLength() {
                return sampleTextListLength()
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
