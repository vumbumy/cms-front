<template>
    <v-menu offset-y v-model="menu">
        <template v-slot:activator="{ on, attrs, value }">
            <v-text-field readonly :label="textLabel" :class="textClass" text v-bind="attrs" v-on="on" v-model="text" v-on:append="on">
                <template v-slot:append>
                    <v-icon v-bind="attrs" v-on="on" :class="{'active': value}">mdi-menu-down</v-icon>
                </template>
            </v-text-field>
        </template>
        <v-sheet class="d-flex flex-column">
            <v-list-item v-for="(item, key) in items" :key="key" :class="textClass" @click="onClickItem(item[itemValue])" block>
                {{item[itemText]}}
            </v-list-item>
            <v-list-item :class="textClass" @click="$emit('append')" block>
                <div class="grey--text">신규입력</div>
            </v-list-item>
            <slot/>
        </v-sheet>
    </v-menu>
</template>

<script>
    export default {
        props: {
            value: [String, Number],
            items: Array,
            itemValue: String,
            itemText: String,

            textLabel: String,
            textClass: String,
        },
        data: () => ({
            selected: null,
            menu: null
        }),
        created() {
            this.selected = this.value
        },
        computed: {
            item() {
                return this.items.find(item => item[this.itemValue] === this.selected)
            },
            text() {
                if(this.item === undefined) return ""

                return this.item[this.itemText]
            }
        },
        methods: {
            onClickItem(value){
                this.selected = value
                this.$emit('input', value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .active {
        transform: rotate(-180deg)
    }
</style>
