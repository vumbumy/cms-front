<template>
    <v-data-table
        disable-sort
        hide-default-footer
        show-select

        :headers="headers"
        :items="items"
        :items-per-page="15"
        :loading="loading"

        @click:row="onClickRow"
    >
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

                this.$router.push({query: {id: item.id}});
            }
        }
    }
</script>
