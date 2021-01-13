<template>
    <div class="mb-2">
        <v-data-table
            class="elevation-1"
            dense

            :headers="headers"
            :items="desserts"
            :items-per-page="4"

            disable-sort
            hide-default-footer
        >
            <template v-slot:item.actions="{ item }">
                <v-btn text class="pa-0" @click="editItem(item)">
                    <v-icon small>mdi-eye</v-icon>보기
                </v-btn>
                <v-btn text class="pa-0" @click="deleteItem(item)">
                    <v-icon small>mdi-restore</v-icon>돌리기
                </v-btn>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
        <v-btn outlined block v-if="more">
            더보기
        </v-btn>
    </div>
</template>

<script>
    export default {
        props: {
            more: {type: Boolean, default: false},
            headers: {
                type: Array,
                default: () => ([
                    { text: 'Time', value: 'calories' },
                    { text: 'Editor', value: 'fat' },
                    { text: 'Note', value: 'name'},
                    { text: 'Actions', value: 'actions', sortable: false },
                ])
            },
        },
        data: () => ({
            desserts: [],
        }),
        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.desserts = [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                    },
                ]
            },

            editItem (item) {
                console.log('editItem', item)
            },

            deleteItem (item) {
                console.log('deleteItem', item)
            },
        },
    }
</script>

<style scoped>

</style>
