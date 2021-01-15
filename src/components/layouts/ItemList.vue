<template>
    <div class="d-flex flex-column">
        <div class="d-flex align-center">
            <div>
                <v-icon class="mr-2" @click="onClickAdd">mdi-plus</v-icon>
                <v-icon class="mr-2" @click="onClickRefresh">mdi-refresh</v-icon>
                <v-icon class="mr-2" v-if="isTableView">mdi-download</v-icon>
                <v-icon v-if="isTableView">mdi-trash-can-outline</v-icon>
            </div>

            <div class="ml-auto">
                {{itemsNumber}} of {{itemsLength}}
            </div>
            <v-btn text icon @click="onMovePage(-1)">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn text icon @click="onMovePage(1)">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </div>
        <div v-if="isCardView" class="d-flex flex-column">
            <v-progress-linear
                :active="loading"
                indeterminate
            />
            <div class="my-1" v-for="(item, index) in items" :key="index">
                <slot name="item" :item="item"/>
            </div>
        </div>
        <div v-else-if="isTableView">
            <item-table :headers="headers" :items="items" :loading="loading"/>
        </div>
    </div>
</template>

<script>

    import {CARD_VIEW, ITEMS_PER_PAGE, NEW_ITEM_ID, TABLE_VIEW} from "../../scripts/const";
    import ItemTable from "../tables/ItemTable";

    export default {
        components: {ItemTable},
        props: {
            headers: Array,
            items: Array,
            itemsLength: {
                type: Number,
                default: () => {
                    return 200
                }
            },
            view: String,
            value: Number,
            loading: Boolean
        },
        data: () => ({
            check: false,
            // dots: true,
            // loading: false,

            page: 1,

            maxPage: 1
        }),
        created() {
            this.page = this.value
            this.maxPage = Math.trunc(this.itemsLength / ITEMS_PER_PAGE);

            // console.log('maxPage', this.maxPage)
        },
        computed: {
            isCardView(){
                return this.view === CARD_VIEW
            },
            isTableView(){
                return this.view === TABLE_VIEW
            },
            itemsNumber(){
                return Math.min(this.itemsLength, (this.value + 1) * ITEMS_PER_PAGE)
            },
            // parentPath(){
            //     return this.$route.matched[0].path
            // },
        },
        methods: {
            onClickAdd: function () {
                let path = `${this.$route.name}/${NEW_ITEM_ID}`
                this.$router.push(path).catch(() => {});
            },
            onClickRefresh: function() {
                this.$emit('refresh')
            },
            // onClickItem: function (id) {
            //     let path = `${this.parentPath}/${this.$route.name}/${id}`
            //     this.$router.push(path).catch(() => {});
            // },
            onMovePage(add){
                this.page = Math.max(this.page + add, 0)
                this.page = Math.min(this.page, this.maxPage)

                this.$emit('input', this.page)
            }
        }
    }
</script>
