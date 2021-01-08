<template>
    <div class="d-flex flex-column pa-2">
        <div class="d-flex">
            <div class="col-4 pa-0 d-flex flex-column">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="item.name"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    {{item.type}}
                </div>
            </div>
            <v-img max-width="70" class="mt-auto grey lighten-2" aspect-ratio="1"/>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="item.stock"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    재고
                </div>
            </div>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="item.stock"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    가격월
                </div>
            </div>
        </div>
        <div class="d-flex justify-space-between">
            <div class="text-caption">SKU</div>
            <div class="text-caption">#CAMP #TAGS #HASH</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object
        },
        data: () => ({})
    }
</script>
