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
                <product-card :product="item"/>
            </template>
        </item-list>
    </v-sheet>
</template>

<script>

    // import BarChart from "../../../components/BarChart";
    import SortSearchView from "../../../components/SortSearchView";
    import {CARD_VIEW} from "../../../scripts/const";
    import ProductCard from "./ProductCard";
    import ItemList from "../../../components/layouts/ItemList";
    import Warning from "../../../components/alerts/Warning";
    import {registerRefresh} from "../../../plugins/eventBus";
    import {getProducts} from "../../../api/products";
    import {getCategories} from "../../../api/categories";


    export default {
        components: {
            ProductCard,
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
                { text: '상품명', value: 'name' },
                { text: '카테고리', value: 'categoryName' },
                { text: '상태', value: 'status' },
                { text: '업데이트', value: 'updated' },
                { text: '재고', value: 'stock' },
                { text: '수량', value: 'amount' },
                { text: '가격(만원/월)', value: 'price' },
            ],
            page: 0,
            items: [],
            loading: false,
            categories: getCategories(),
        }),
        created() {
            registerRefresh(this.loadItemList)

            this.loadItemList()
        },
        methods: {
            loadItemList(){
                this.loading = true

                this.items = getProducts()
                for(let item of this.items){
                    item.categoryName = this.categories.find(c => c.no === item.categoryNo).name
                }

                this.loading = false
            },
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
                this.view = param
            },
            onUpdateOrder: function (param) {
                console.log('onUpdateOrder', param)
            }
        }
    }
</script>
