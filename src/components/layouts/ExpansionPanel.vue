<template>
    <div class="d-flex flex-column py-3">
        <v-list-item class="d-flex subtitle-1 px-0">
            <div class="d-flex align-center" v-if="type === 'checkbox'">
                {{label}}
                <v-simple-checkbox v-if="!readonly" class="ml-2" v-model="active" @input="onClickBox"/>
                <v-href v-else size="25px" :href="href"/>
            </div>
            <div class=" d-flex" v-else @click="active =! active" style="cursor: pointer">
                {{label}}
                <v-icon class="ml-auto flex-grow-0" :class="{'active':active}">mdi-chevron-down</v-icon>
            </div>
            <v-icon class="ml-auto pa-1" size="15px" :color="circle">mdi-circle</v-icon>
        </v-list-item>
        <v-divider/>
        <v-expand-transition>
            <v-card flat v-show="!readonly && active" class="text-left">
                <slot/>
            </v-card>
        </v-expand-transition>
    </div>
</template>

<script>
    import VHref from "../VHref";
    export default {
        components: {VHref},
        props: {
            type: String,
            value: Boolean,
            readonly: Boolean,
            label: String,
            circle: {
                type: String,
                default: "white"
            },
            href: String
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
