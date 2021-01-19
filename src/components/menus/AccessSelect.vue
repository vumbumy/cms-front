<template>
    <v-menu offset-y v-model="menu">
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="pa-0" v-bind="attrs" v-on="on">
                <v-icon dense v-text="value"/>
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
