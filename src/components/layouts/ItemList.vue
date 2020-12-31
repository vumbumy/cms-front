<template>
    <div class="d-flex flex-column">
        <div class="d-flex align-center">
            <div>
                <v-icon class="mr-2" @click="check=!check" v-if="!check">mdi-checkbox-blank-outline</v-icon>
                <v-icon class="mr-2" @click="check=!check" v-else>mdi-check-box-outline</v-icon>
                <v-icon class="mr-2" @click="onClickAdd">mdi-plus</v-icon>
                <v-icon class="mr-2" @click="dots=false" v-if="dots">mdi-dots-vertical</v-icon>
                <v-icon class="mr-2" v-if="!dots">mdi-refresh</v-icon>
                <v-icon class="mr-2" v-if="!dots">mdi-download</v-icon>
                <v-icon v-if="!dots">mdi-trash-can-outline</v-icon>
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
            <v-card
                width="100%"
                class="my-1"
                v-for="item in items" :key="item.id"
                :class="{'selected': $route.query.id === String(item.id)}"
                outlined
                @click="onClickItem(item.id)"
            >
                <slot name="item" :item="item"/>
            </v-card>
        </div>
        <div v-else-if="isTableView">
            <v-row dense>
                <v-col>
                    <item-table :headers="headers" :items="items"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>

    import {CARD_VIEW, ITEMS_PER_PAGE, TABLE_VIEW} from "../../scripts/const";
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
            value: Number
        },
        data: () => ({
            check: false,
            dots: true,

            page: 1,

            maxPage: 1
        }),
        created() {
            this.page = this.value
            this.maxPage = Math.trunc(this.itemsLength / ITEMS_PER_PAGE);

            console.log('maxPage', this.maxPage)
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
            }
        },
        methods: {
            onClickAdd: function () {
                this.onClickItem(0)
            },
            onClickItem: function (id) {
                if(this.$route.query.id !== String(id))
                    this.$router.replace({query: {id: id}});
            },
            onMovePage(add){
                this.page = Math.max(this.page + add, 0)
                this.page = Math.min(this.page, this.maxPage)

                this.$emit('input', this.page)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-card {
        border-left: 10px solid orange !important
    }

    .selected {
        border-left: 10px solid blue !important
    }
</style>
