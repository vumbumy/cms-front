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

                    v-model="contract.templateId"
                />
            </div>
        </top-contents>
        <v-slide-y-reverse-transition>
            <v-slide-y-reverse-transition group v-if="contract.templateId">
                <expansion-panel v-for="(panel, pIndex) in rootSections" :key="pIndex" :label="panel.title" :value="true">
                    <div class="d-flex flex-wrap">
                        <div v-for="(field, fIndex) in fields(panel.title)" :key="fIndex" class="col-4 py-0">
                            <auto-field :header="field" v-model="contract.values[hash(field)]" :readonly="isReadOnly" :rules="field.required ? [rules.required] : []"/>
                        </div>
                        <div v-for="(section, sIndex) in subSections(panel.title)" :key="sIndex" class="d-flex flex-column col-4 py-0">
                            <div class="text-subtitle-2 font-weight-bold" v-text="section.title"/>
                            <div v-for="(field, fIndex) in fields(section.title)" :key="fIndex">
                                <auto-field :header="field" v-model="contract.values[hash(field)]" :readonly="isReadOnly" :rules="field.required ? [rules.required] : []"/>
                            </div>
                        </div>
                    </div>
                </expansion-panel>
            </v-slide-y-reverse-transition>
        </v-slide-y-reverse-transition>

        <!-- HISTORY -->
        <expansion-panel label="수정이력" :value="true">
            <actions-table/>
        </expansion-panel>
        <!--        -->
    </div>
</template>

<script>
    import CloseEditSave from "../../../components/CloseEditSave";
    import {dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../../../scripts/const";
    import TopContents from "../../../components/layouts/TopContents";
    import {getTemplates} from "../../../api/templates";
    import ExpansionPanel from "../../../components/layouts/ExpansionPanel";
    import AutoField from "../../../components/menus/AutoField";
    import ActionsTable from "../../../components/tables/ActionsTable";
    import {getContract, setContract} from "../../../api/contracts";
    import EventBus from "../../../plugins/eventBus";

    const hash = require('object-hash');

    export default {
        components: {
            ActionsTable,
            AutoField,
            ExpansionPanel,
            TopContents,
            CloseEditSave,
        },
        props: {
            value: Object
        },
        data: () => ({
            mode: READ_MODE,
            rules: {
                required: value => !!value || 'Required.',
            },

            contract: {
                templateId: 0,
                values: {}
            },
            templates: []
        }),
        created() {
            this.initialize()
        },
        watch: {
            $route(){
                this.initialize()
            }
        },
        computed: {
            isReadOnly(){
                return this.mode !== EDIT_MODE && this.mode !== Add_MODE
            },
            template(){
                console.log(this.contract.values)

                return this.templates.find(t => t.id === this.contract.templateId)
            },
            templateTitle(){
                if(this.template === undefined) return ""

                return this.template.title
            },
            rootSections(){
                let sections = this.template.sections.filter(section => section.parent == null)

                return sections.sort((a, b) => a.order - b.order)
            }
        },
        methods: {
            initialize(){
                let id = parseInt(this.$route.query.id)

                this.templates = getTemplates()

                if(id === 0 ){
                    this.mode = Add_MODE

                    this.contract = {
                        templateId: 0,
                        values: {}
                    }
                } else {
                    this.mode = READ_MODE
                    this.contract = getContract(id)
                }
            },
            onChangeTags(tags) {
                this.item.tags = tags.split(',')
            },
            onClickSave() {
                console.log('SAVE', this.contract)

                let id = setContract(this.contract)
                this.$router.replace({query: {id: id}})
                    .catch(() => ({}))

                EventBus.$emit('refresh')
            },
            onClickDelete: function(){
                console.log('DELETE')
            },
            subSections(section) {
                let sections = this.template.sections.filter(s => s.parent === section)

                return sections.sort((a, b) => a.order - b.order)
            },
            fields(section) {
                return this.template.fields.filter(f => f.section === section)
            },
            hash: hash,
            dateToDateTime: dateToDateTime,
        }
    }
</script>

<style lang="scss" scoped>

</style>
