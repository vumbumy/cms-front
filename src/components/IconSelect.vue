<template>
    <v-menu offset-y v-model="menu">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
            >
                <v-icon>{{value}}</v-icon>
                <v-icon v-if="menu">
                    mdi-menu-up
                </v-icon>
                <v-icon v-else>
                    mdi-menu-down
                </v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-btn v-for="(value, key) in items"
                   :key="value" text @click="$emit('input', key)">{{ value }}</v-btn>
        </v-list>
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
            items: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data: () => ({
            menu: null
        })
    }
</script>