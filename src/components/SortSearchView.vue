<template>
    <div class="d-flex">
        <icon-select :items="sorts" v-model="sort"/>
        <v-text-field dense prepend-icon="mdi-filter" placeholder="검색어" v-model="keyword"/>
        <icon-select :items="views" v-model="view" v-if="$vuetify.breakpoint.smAndUp"/>
    </div>
</template>

<script>
    import IconSelect from "./menus/IconSelect";
    import {TIME_ORDER, CARD_VIEW} from "../scripts/const";

    export default {

        components: {IconSelect},
        watch: {
            keyword(){
                this.$emit('search', this.keyword)
            },
            sort(){
                this.$emit('update_order', this.sort)
            },
            view(){
                this.$emit('update_view', this.view)
            }
        },
        data: () => ({
            keyword: "",
            sort: TIME_ORDER,
            sorts: {
                TIME: 'mdi-clock',
                DICT: 'mdi-sort-variant',
            },
            view: CARD_VIEW,
            views: {
                CARD: 'mdi-cards-variant',
                TABLE: 'mdi-table',
            }
        })
    }
</script>
