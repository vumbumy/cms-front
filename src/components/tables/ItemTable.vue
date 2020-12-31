<template>
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="15"
        class="elevation-1"
        disable-sort
        hide-default-footer
        :loading="loading"

        @click:row="onClickRow"
    >
        <template v-slot:item.check="{ item }">
            <v-simple-checkbox
                v-model="item.check"
            ></v-simple-checkbox>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        props: {
            headers: {
                type: Array,
                default: () => {
                    return [
                        { text: 'id', value: 'id' },
                        { text: 'Label', value: 'label' },
                        {
                            text: 'Title',
                            align: 'start',
                            sortable: false,
                            value: 'title',
                        },
                        { text: 'Info', value: 'info' },
                        { text: 'Description', value: 'description' },
                    ]
                }
            },
            items: Array,
            loading: Boolean
        },
        // created() {
        //     console.log(this.headers)
        // },
        methods: {
            onClickRow(item) {
                // console.log(item)

                this.$router.replace({query: {id: item.id}});
            }
        }
    }
</script>
