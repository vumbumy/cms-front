<template>
    <div class="d-flex flex-column">
        <close-edit-save
            class="header"
            v-model="mode"
            v-on:save="onClickSave"
            v-on:delete="onClickDelete"
        />
        <top-contents
            :readonly="isReadOnly"

            :updated="Date.parse('2020-12-13')"
            :created="Date.parse('2020-12-01')"
        >
            <div v-if="isReadOnly">
                <div class="text-h4 font-weight-bold" v-text="contract.title"/>
                <div class="text-h6 font-weight-bold" v-text="templateTitle"/>
            </div>
            <div v-else>
                <v-text-field
                    label="계약명"
                    class="text-h4 font-weight-bold"

                    v-model="contract.title"
                />
                <v-select
                    label="계약양식명"
                    class="text-h6 font-weight-bold"
                    clearable

                    :items="templates"
                    item-text="title"
                    item-value="id"

                    v-model="templateId"
                />
            </div>
        </top-contents>
        <v-slide-y-reverse-transition>
            <v-slide-y-reverse-transition group v-if="templateId">
                <expansion-panel v-for="(section, sIndex) in template.sections" :key="sIndex" :label="section.title">
                    <div v-for="(field, fIndex) in fields(section.title)" :key="fIndex">
                        <date-field v-if="field.type === 'Date'" :label="field.title" v-model="values[sIndex * 100 + fIndex]"/>
                        <v-text-field v-else :label="field.title" v-model="values[sIndex * 100 + fIndex]"/>
                    </div>
                </expansion-panel>
            </v-slide-y-reverse-transition>
        </v-slide-y-reverse-transition>
    </div>
</template>

<script>
    import CloseEditSave from "../../../components/CloseEditSave";
    import {dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../../../scripts/const";
    import TopContents from "../../../components/layouts/TopContents";
    import {getTemplates} from "../../../api/templates";
    import ExpansionPanel from "../../../components/layouts/ExpansionPanel";
    import DateField from "../../../components/menus/DateField";

    export default {
        components: {
            DateField,
            ExpansionPanel,
            TopContents,
            CloseEditSave,
        },
        props: {
            value: Object
        },
        data: () => ({
            mode: READ_MODE,
            templateId: 0,
            values: {},

            contract: {},
            templates: []
        }),
        created() {
            this.initialize()
        },
        watch: {
            $route(){
                this.initialize()
            },
            templateId(){
                this.contract.templateId = this.templateId
                this.values = {}
            }
        },
        computed: {
            isReadOnly(){
                return this.mode !== EDIT_MODE && this.mode !== Add_MODE
            },
            template(){
                return this.templates.find(t => t.id === this.templateId)
            },
            templateTitle(){
                if(this.template === undefined) return ""

                return this.template.title
            },
        },
        methods: {
            initialize(){
                this.templates = getTemplates()

                if(this.$route.query.id === '0')
                    this.mode = Add_MODE
                else
                    this.mode = READ_MODE
            },
            onChangeTags(tags) {
                this.item.tags = tags.split(',')
            },
            onClickSave() {
                console.log('SAVE')

                // for(const [key, value] of Object.entries(this.values)){
                //     console.log(key, value)
                // }

                this.contract.values = this.values

                console.log(this.contract)
            },
            onClickDelete: function(){
                console.log('DELETE')
            },
            fields(section) {
                return this.template.fields.filter(field => field.section === section)
            },
            dateToDateTime: dateToDateTime,
        }
    }
</script>

<style lang="scss" scoped>

</style>
