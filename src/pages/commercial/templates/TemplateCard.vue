<template>
    <v-card class="item-card d-flex flex-column" :to="{name: 'templates:detail', params: {no: item.no}}">
        <div class="d-flex">
            <div class="col-4 pa-0 d-flex flex-column">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="item.title"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2" v-text="item.template"/>
            </div>
        </div>
        <div class="d-flex justify-space-between">
            <div class="text-caption">SKU</div>
            <div class="text-caption">#CAMP #TAGS #HASH</div>
        </div>
    </v-card>
</template>

<script>
    export default {
        props: {
            item: Object
        },
    }
</script>
