<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        offset-y
        min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :label="label"
                :value="datesToString(dates)"
                class="text-caption text-sm-subtitle-1"
                :class="{'font-weight-bold': bold}"
                readonly
                :loading="loading"
                v-bind="attrs"
                v-on="readonly ? null : on"
                :rules="rules"
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
    import {datesToString} from "../../scripts/util";

    export default {
        props: {
            label: String,
            value: Array,
            readonly: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            rules: Array,
            bold: Boolean
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

                this.$emit('input', this.dates)
            },
            datesToString: datesToString
        }
    }
</script>

<style scoped>

</style>
