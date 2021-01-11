<template>
    <div>
        <date-field
            v-if="header.type === 'Date'"
            :label="header.title"
            :readonly="readonly"
            :rules="rules"

            v-model="item"
            @input="$emit('input', item)"/>
        <v-checkbox
            v-else-if="header.type === 'Boolean'"
            :label="header.title"
            :readonly="readonly"
            :rules="rules"

            v-model="item"
            @input="$emit('input', item)"/>
        <v-text-field
            v-else
            :label="header.title"
            :type="header.type"
            :readonly="readonly"
            :rules="rules"

            v-model="item"
            @input="$emit('input', item)"/>
    </div>
</template>

<script>
    import DateField from "./DateField";
    export default {
        components: {DateField},
        props: {
            header: Object,
            value: [Number, Array, String, Boolean],
            readonly: Boolean,
            rules: Array
        },
        data: () => ({
            item: Object
        }),
        created() {
            this.initialize()
        },
        watch: {
            value() {
                console.log(this.value)
                this.initialize()
            },
            readonly() {
                this.initialize()
            }
        },
        methods: {
            initialize(){
                this.item = this.value

                // console.log(this.item, typeof this.item)
            }
        }
    }
</script>

<style scoped>

</style>
