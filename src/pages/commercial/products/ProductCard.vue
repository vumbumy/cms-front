<template>
    <v-card outlined class="item-card d-flex flex-column" :to="{name: 'products:detail', params: {sku: product.sku}}">
        <div class="d-flex">
            <div class="col-4 pa-0 d-flex flex-column">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="product.name"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2" v-text="product.categoryName"/>
            </div>
            <v-img max-width="70" class="mt-auto grey lighten-2" aspect-ratio="1"/>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="product.stock"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    재고
                </div>
            </div>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="product.price"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    만원/월
                </div>
            </div>
        </div>
        <div class="d-flex align-center">
            <div class="text-caption" v-text="productUrl"/>
            <v-tag-field class="ml-auto" readonly v-model="product.tags"/>
        </div>
    </v-card>
</template>

<script>
    import {PRODUCT_SKU_PREFIX} from "../../../scripts/const";
    import VTagField from "../../../components/VTagField";

    export default {
        components: {
            VTagField,
        },
        props: {
            product: Object
        },
        data: () => ({
            PRODUCT_SKU_PREFIX: PRODUCT_SKU_PREFIX,
        }),
        computed: {
            productUrl() {
                return PRODUCT_SKU_PREFIX + this.product.sku
            },
        }
    }
</script>
