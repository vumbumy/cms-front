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

    const TABLE_KEY = "TABLE"
    const CARD_KEY = "CARD"
    const TIME_KEY = "TIME"
    const DICT_KEY = "DICT"

    export default {

        components: {IconSelect},
        watch: {
            keyword(){
                this.$emit('search', this.keyword)
            },
            sort_icon(){
                this.$emit('update_order', this.sorts[this.sort_icon] === TIME_KEY)
            },
            view_icon(){
                this.$emit('update_view', this.views[this.view_icon] === CARD_KEY)
            }
        },
        data: () => ({
            keyword: "",
            sort_icon:'mdi-clock',
            sorts: {
                'mdi-clock': TIME_KEY,
                'mdi-sort-variant': DICT_KEY,
            },
            view_icon: "mdi-cards-variant",
            views: {
                'mdi-cards-variant': CARD_KEY,
                'mdi-table': TABLE_KEY,
            }
        })
    }
</script>