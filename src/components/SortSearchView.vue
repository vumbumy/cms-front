<template>
    <v-row no-gutters class="pt-2">
        <template>
            <div class="text-center">

            </div>
        </template>
        <v-col cols="2" sm="1" class="pl-2">
            <icon-select :items="sorts" v-model="sort_icon"/>
        </v-col>
        <v-col sm="10">
            <v-text-field dense prepend-icon="mdi-filter" placeholder="검색어" v-model="keyword"/>
        </v-col>
        <v-col cols="1" class="pl-2"  v-if="$vuetify.breakpoint.smAndUp">
            <icon-select :items="views" v-model="view_icon"/>
        </v-col>
    </v-row>
</template>

<script>
    import IconSelect from "./IconSelect";
    import {DICT_ORDER, TIME_ORDER, CARD_VIEW, TABLE_VIEW} from "../scripts/const";

    export default {

        components: {IconSelect},
        watch: {
            keyword(){
                this.$emit('search', this.keyword)
            },
            sort_icon(){
                this.$emit('update_order', this.sorts[this.sort_icon])
            },
            view_icon(){
                this.$emit('update_view', this.views[this.view_icon])
            }
        },
        data: () => ({
            keyword: "",
            sort_icon:'mdi-clock',
            sorts: {
                'mdi-clock': TIME_ORDER,
                'mdi-sort-variant': DICT_ORDER,
            },
            view_icon: "mdi-cards-variant",
            views: {
                'mdi-cards-variant': CARD_VIEW,
                'mdi-table': TABLE_VIEW,
            }
        })
    }
</script>
