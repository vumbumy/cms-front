<template>
    <div class="d-flex flex-column py-3">
        <div class="d-flex subtitle-1 font-weight-bold py-2">
            <div class="d-flex" v-if="type === 'checkbox'">
                {{label}}<v-simple-checkbox v-if="!readonly" class="ml-2" v-model="active" @input="onClickBox"/>
            </div>
            <div class=" d-flex" v-else @click="active =! active" style="cursor: pointer">
                {{label}}
                <v-icon class="ml-auto flex-grow-0" :class="{'active':active}">mdi-chevron-down</v-icon>
            </div>
        </div>
        <v-divider/>
        <v-expand-transition>
            <v-card flat v-show="!readonly && active" class="text-left">
                <slot name="item" :item="item"/>
            </v-card>
        </v-expand-transition>
    </div>
</template>

<script>
    export default {
        props: {
            type: String,
            value: Boolean,
            readonly: Boolean,
            label: String,
            item: Object
        },
        data: () => ({
            active: true
        }),
        created() {
            this.updateEnable()
        },
        watch: {
            value() {
                this.updateEnable()
            }
        },
        methods: {
            updateEnable(){
                this.active = this.value
            },
            onClickBox(item){
                this.$emit('input', item)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .active {
        transform: rotate(-180deg)
    }
</style>
