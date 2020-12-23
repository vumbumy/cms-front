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
        <v-row justify="space-between">
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
                15 of 200
                <v-icon>mdi-chevron-left</v-icon>
                <v-icon>mdi-chevron-right</v-icon>
            </v-col>
        </v-row>
        <v-row v-for="item in items" :key="item.id" dense>
            <v-col v-if="isCardView">
                <sub1-list-item :item="item"/>
            </v-col>
            <v-col v-else>
                <item-table/>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>

    import ItemTable from "../../../components/ItemTable";
    import BarChart from "../../../components/BarChart";
    import Sub1ListItem from "./Sub1ListItem";
    import SortSearchView from "../../../components/SortSearchView";

    export default {
        components: {
            SortSearchView,
            Sub1ListItem,
            BarChart,
            ItemTable
        },
        data: () => ({
            // keyword: "",
            isCardView: true,
            active_tags: [],
            tags: ['의정부', '최근 1주'],
            check: false,
            dots: true,
            alertMsg: [
                '<strong>Section Warning</strong> (Notice)'
            ],
            // refreshId: 0,
            items: [
                {
                    id: 3,
                    label: "LABEL3",
                    title: "TITLE3",
                    info: "INFO3",
                    value: "30"
                }
            ],
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
                this.isCardView = param
            },
            onUpdateOrder: function (param) {
                console.log(param)
            }
        }
    }
</script>
