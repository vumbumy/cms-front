<template>
    <v-card class="item-card d-flex flex-column" :to="{name: 'templates:detail', params: {no: item.no}}">
        <div class="d-flex">
            <div class="col-4 pa-0 d-flex flex-column">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="item.title"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 indigo--text text--lighten-1">
                    계약서 템플레이트
                </div>
            </div>
            <div class="d-flex flex-column ml-auto text-center">
                <div class="text-h7 text-sm-h6 font-weight-bold" v-text="item.contractsNum"/>
                <div class="text-subtitle-2 text-sm-subtitle-1 grey--text text--darken-2">
                    계약서
                </div>
            </div>
        </div>
        <div class="d-flex justify-space-between">
            <v-tag-field class="ml-auto" readonly :value="item.tags"/>
        </div>
    </v-card>
</template>

<script>
    import VTagField from "../../../components/VTagField";
    export default {
        components: {VTagField},
        props: {
            item: Object
        },
    }
</script>
