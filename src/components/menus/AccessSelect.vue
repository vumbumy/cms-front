<template>
    <v-menu offset-y v-model="menu">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="pa-0" text v-bind="attrs" v-on="on">
                <v-icon v-text="value"/>
                <v-icon :class="{'active': menu}">mdi-menu-down</v-icon>
            </v-btn>
        </template>
        <v-sheet class="d-flex flex-column">
            <slot/>
        </v-sheet>
    </v-menu>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: () => {
                    return ""
                }
            },
        },
        data: () => ({
            menu: null
        }),
    }
</script>

<style lang="scss" scoped>
    .active {
        transform: rotate(-180deg)
    }
</style>
