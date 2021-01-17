<template>
    <v-card class="d-flex flex-column pa-2" :to="{name: 'orders:detail', params: {no: order.no}}">
        <div class="d-flex">
            <div class="col-4 pa-0 d-flex flex-column">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="order.name"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2" v-text="productName"/>
            </div>
            <v-img max-width="70" class="mt-auto grey lighten-2" aspect-ratio="1"/>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="order.stock"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    재고
                </div>
            </div>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="order.stock"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    가격월
                </div>
            </div>
        </div>
        <div class="d-flex justify-space-between">
            <div class="text-caption">SKU</div>
            <div class="text-caption">#CAMP #TAGS #HASH</div>
        </div>
    </v-card>
</template>

<script>
    import {getProducts} from "../../../api/products";

    export default {
        props: {
            order: Object
        },
        computed: {
            product() {
                let products = getProducts()

                return products.find(product => product.sku === this.order.productSKU)
            },
            productName() {
                if(this.product === undefined) return ""
                return this.product.name
            }
        },
    }
</script>

<style lang="scss" scoped>
    .v-card {
        border-left: 10px solid orange !important
    }
</style>
