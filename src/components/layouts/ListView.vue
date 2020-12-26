<template>
    <div>
        <v-row>
            <v-col class="text-left">
                <v-icon class="mr-2" @click="check=!check" v-if="!check">mdi-checkbox-blank-outline</v-icon>
                <v-icon class="mr-2" @click="check=!check" v-else>mdi-check-box-outline</v-icon>
                <v-icon class="mr-2" @click="$router.push('/tabs/0')">mdi-plus</v-icon>
                <v-icon class="mr-2" @click="dots=false" v-if="dots">mdi-dots-vertical</v-icon>
                <v-icon class="mr-2" v-if="!dots">mdi-refresh</v-icon>
                <v-icon class="mr-2" v-if="!dots">mdi-download</v-icon>
                <v-icon v-if="!dots">mdi-trash-can-outline</v-icon>
            </v-col>
            <v-col class="text-right">
                15 of {{items.length}}
                <v-icon>mdi-chevron-left</v-icon>
                <v-icon>mdi-chevron-right</v-icon>
            </v-col>
        </v-row>
        <div v-if="isCardView">
            <v-row v-for="item in items" :key="item.id" dense>
                <v-col>
                    <v-card
                        class="mx-auto"
                        :class="{'selected': $route.query.id === String(item.id)}"
                        outlined
                        @click="onClickItem(item.id)"
                    >
                        <slot name="item" :item="item"/>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div v-else-if="isTableView">
            <v-row dense>
                <v-col>
                    <table-view :headers="headers" :items="items"/>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import TableView from "../TableView";
    import {CARD_VIEW, TABLE_VIEW} from "../../scripts/const";

    export default {
        components: {TableView},
        props: {
            headers: Array,
            items: Array,
            view: String,
        },
        data: () => ({
            check: false,
            dots: true,
        }),
        created() {
            console.log("ListView")
        },
        computed: {
            isCardView(){
                return this.view === CARD_VIEW
            },
            isTableView(){
                return this.view === TABLE_VIEW
            }
        },
        methods: {
            onClickItem: function (id) {
                if(this.$route.query.id !== String(id))
                    this.$router.replace({query: {id: id}});
            },
        }
    }
</script>

<style lang="scss" scoped>
    .v-card {
        border-left: 5px solid !important
    }

    .selected {
        border-left: 5px solid green !important
    }
</style>
