<template>
    <div class="pb-3">
        <div class="d-flex align-center">
            <div v-text="label"/>
            <v-btn class="ml-auto" v-if="!readonly" icon @click="onClickPlus">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
        <div class="d-flex flex-column">
            <div v-for="(item, index) in rows" :key="index" class="d-flex justify-space-between">
                <v-btn v-if="!readonly" icon><v-icon @click="onClickMinus(index)">mdi-minus-circle-outline</v-icon></v-btn>
                <slot name="item" :item="item" class="d-flex"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            readonly: Boolean,
            label: String,
            items: Array
        },
        data: () => ({
            rows: null
        }),
        created() {
            this.rows = this.items
        },
        watch: {
            items(){
                this.rows = this.items
            }
        },
        methods: {
            onClickPlus: function () {
                this.$emit('append')
            },
            onClickMinus: function (index) {
                this.$emit('delete', index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-text-field {
        font-size: 0.8rem;
    }
</style>
