<template>
    <v-card class="item-card d-flex flex-column" :to="{name: 'orders:detail', params: {no: order.no}}">
        <div class="d-flex flex-wrap">
            <div class="d-flex col-6 pa-0 justify-space-between">
                <div class="d-flex flex-column">
                    <div class="text-h7 text-sm-h6 font-weight-bold" v-text="order.name"/>
                    <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2" v-text="productName"/>
                </div>
                <v-img max-width="70" class="mt-auto grey lighten-2" aspect-ratio="1"/>
            </div>
            <div class="d-flex col-6 pa-0 justify-end">
                <div class="d-flex flex-column text-center pr-10">
                    <div class="text-h7 text-sm-h6 font-weight-bold" v-text="3"/>
                    <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2 mt-auto">
                        보고서
                    </div>
                </div>
                <div class="d-flex flex-column text-center">
                    <div class="text-h7 text-sm-h6 font-weight-bold" v-text="'100/200'"/>
                    <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2 mt-auto">
                        임금/총금액
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-space-between">
<!--            <div class="text-caption">SKU</div>-->
            <v-tag-field readonly class="ml-auto" v-model="order.tags"/>
        </div>
        <stepper class="col-12 col-sm-6 pa-0 align-self-end" readonly/>
    </v-card>
</template>

<script>
    import {getProducts} from "../../../api/products";
    import VTagField from "../../../components/VTagField";
    import Stepper from "../../../components/Stepper";

    export default {
        components: {Stepper, VTagField},
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
