<template>
    <v-card outlined class="d-flex flex-column pa-2" :to="{name: 'products:detail', params: {sku: product.sku}}">
        <div class="d-flex">
            <div class="col-4 pa-0 d-flex flex-column">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="product.name"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    {{product.categoryNo}}
                </div>
            </div>
            <v-img max-width="70" class="mt-auto grey lighten-2" aspect-ratio="1"/>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="product.stock"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    재고
                </div>
            </div>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="product.stock"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    가격월
                </div>
            </div>
        </div>
        <div class="d-flex">
<!--            <v-btn text :href="productUrl" class="d-flex text-caption pa-0">-->
<!--                <div v-text="productUrl"/>-->
<!--                <href-btn size="15px"/>-->
<!--            </v-btn>-->
            <v-href label :href="productUrl" size="15px" text-class="text-caption"/>
            <div class="text-caption ml-auto" v-if="product.tags.length > 0" v-text="'#' + product.tags.join(' #')"/>
        </div>
    </v-card>
</template>

<script>
    import {PRODUCT_SKU_PREFIX} from "../../../scripts/const";
    import VHref from "../../../components/VHref";

    export default {
        components: {VHref},
        props: {
            product: Object
        },
        computed: {
            productUrl() {
                return PRODUCT_SKU_PREFIX + this.product.sku
            }
        },
        data: () => ({
            PRODUCT_SKU_PREFIX: PRODUCT_SKU_PREFIX,
        })
    }
</script>

<style lang="scss" scoped>
    .v-card {
        border-left: 10px solid orange !important
    }
</style>
