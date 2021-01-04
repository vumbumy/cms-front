<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :label="label"
                :value="datesToString(dates)"
                readonly
                v-bind="attrs"
                v-on="readonly ? null : on"
            />
        </template>
        <v-date-picker
            v-model="dates"
            no-title
            scrollable
            range
        >
            <v-spacer/>
            <v-btn
                text
                color="primary"
                @click="menu = false"
            >
                Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="onClickOK"
            >
                OK
            </v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
    import {datesToString} from "../scripts/util";

    export default {
        props: {
            label: String,
            value: Array,
            readonly: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            dates: [],
            menu: false,
        }),
        created() {
            this.updateDates()
        },
        watch: {
            value(){
                this.updateDates()
            }
        },
        methods: {
            updateDates: function() {
                if(this.value == null)
                    return

                this.dates = this.value
            },
            onClickOK: function(){
                this.$refs.menu.save(this.dates)

                console.log(this.dates)
                this.$emit('input', this.dates)
            },
            onClickCancel: function(){},
            datesToString: datesToString
        }
    }
</script>

<style scoped>

</style>
