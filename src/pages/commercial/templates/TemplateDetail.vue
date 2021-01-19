<template>
    <v-sheet class="d-flex flex-column" :min-width="detailMinWidth">
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
            <v-text-field
                label="계약양식명"

                class="text-h4 font-weight-bold pb-0"

                v-model="template.title"
                :readonly="isReadOnly"
                hide-details
            />
        </top-contents>

        <!-- TOP UNDER CONTENTS -->
        <v-tag-field class="ml-auto" :readonly="isReadOnly" v-model="template.tags"/>
        <v-divider class="grey"/>
        <!--        -->

        <!-- Field -->
        <expansion-panel label="Section 정의" :value="true">
            <multi-field-list
                class="caption"

                :items="template.sections"
                :readonly="isReadOnly"

                v-on:append="template.sections.push(newSection(nextOrder))"
                v-on:delete="index => template.sections.splice(index, 1)"
            >
                <template v-slot:item={item}>
                    <v-text-field dense :readonly="isReadOnly" label="제목" class="text-caption col-2 pl-0" v-model="item.title" :rules="[rules.required]"/>
                    <v-text-field dense :readonly="isReadOnly" label="순서" class="text-caption col-2 pl-0" v-model="item.order" type="number"/>
                    <v-select
                        dense
                        :readonly="isReadOnly"
                        label="PARENT"
                        class="text-caption col-3 pl-0"
                        :items="sections(item.title)"
                        item-text="title"
                        item-value="title"
                        v-model="item.parent"
                        type="number"
                        placeholder="없음"
                        :clearable="!isReadOnly"
                    />
                </template>
            </multi-field-list>
        </expansion-panel>
        <!--        -->

        <!-- Field -->
        <expansion-panel label="Field 정의" :value="true">
            <multi-field-list
                class="caption"

                :items="template.fields"
                :readonly="isReadOnly"

                v-on:append="template.fields.push(newField())"
                v-on:delete="index => template.fields.splice(index, 1)"
            >
                <template v-slot:item={item}>
                    <v-text-field
                        dense
                        :readonly="isReadOnly"
                        label="제목"
                        class="text-caption col-3 pl-0"
                        v-model="item.title"
                        :rules="[rules.required]"
                    />
<!--                    <v-text-field dense :readonly="isReadOnly" label="크기" class="text-caption col-1 pl-0" v-model="item.size"/>-->
                    <v-select
                        dense
                        :readonly="isReadOnly"
                        label="형식"
                        class="text-caption col-2 pl-0"
                        :items="types"
                        v-model="item.type"
                        :rules="[rules.required]"
                    />
                    <v-select
                        dense
                        :readonly="isReadOnly"
                        label="필수"
                        class="text-caption col-2 pl-0"
                        :items="yesOrNo"
                        item-text="text"
                        item-value="value"
                        v-model="item.required"
                        @click="onClickRequired"
                    />
                    <v-select
                        dense
                        :readonly="isReadOnly"
                        label="SECTION"
                        class="text-caption"
                        v-model="item.section"
                        :items="template.sections"
                        item-text="title"
                        item-value="title"
                        placeholder="HEAD"
                        clearable
                    />
                </template>
            </multi-field-list>
        </expansion-panel>
        <!--        -->

        <!-- HISTORY -->
        <expansion-panel label="수정이력" :value="true">
            <actions-table more/>
        </expansion-panel>
        <!--        -->
    </v-sheet>
</template>

<script>
    import CloseEditSave from "../../../components/CloseEditSave";
    import {dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, NEW_ITEM_ID, READ_MODE} from "../../../scripts/const";
    import TopContents from "../../../components/layouts/TopContents";
    import ExpansionPanel from "../../../components/layouts/ExpansionPanel";
    import MultiFieldList from "../../../components/layouts/MultiFieldList";
    import {deleteTemplate, getTemplate, setTemplate} from "../../../api/templates";
    import {refresh, saved} from "../../../plugins/eventBus";
    import ActionsTable from "../../../components/tables/ActionsTable";
    import VTagField from "../../../components/VTagField";
    import {templateSample} from "../../../scripts/mock";

    export default {
        components: {
            VTagField,
            ActionsTable,
            MultiFieldList,
            ExpansionPanel,
            TopContents,
            CloseEditSave,
        },
        data: () => ({
            mode: READ_MODE,

            yesOrNo: [
                {text: 'Yes', value: true},
                {text: 'No', value: false}
                ],
            types: ["String", "Number", "Date", "Boolean"],

            template: {},
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
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
            nextOrder(){
                let lastOrder = 0

                this.template.sections.forEach(
                    (section) => lastOrder = Math.max(lastOrder, section.order)
                )

                return lastOrder + 1
            },
            rootSections(){
                return this.template.sections.filter(section => section.parent == null && section.title !== '')
            },
            detailMinWidth(){
                if(this.$vuetify.breakpoint.smAndUp)
                    return 625

                return 0
            },
        },
        methods: {
            initialize() {
                let no = this.$route.params.no
                if(no === NEW_ITEM_ID) {
                    this.mode = Add_MODE

                    this.template = templateSample
                }
                else {
                    this.mode = READ_MODE

                    this.template = getTemplate(no)
                }
            },
            onChangeTags(tags) {
                this.template.tags = tags.split(',')
            },
            onClickSave() {
                console.log('SAVE', this.template)

                let no = setTemplate(this.template)
                this.$router.push({name: this.$route.name, params: {no: no}})
                    .catch(() => ({}))

                saved()
            },
            onClickDelete: function(){
                console.log('DELETE', this.template.no)

                deleteTemplate(this.template.no)

                this.$router.push({name: 'templates'})
                    .catch(() => ({}))

                refresh()
            },
            newSection: (lastOrder) => ({
                title: "",
                order: lastOrder,
            }),
            sections(section){
                return this.rootSections.filter(s => s.title !== section)
            },
            newField: () => ({
                title: "",
                size: 0,
                type: "String",
                required: false,
                section: ""
            }),
            onClickRequired(){
                if(this.readonly)
                    return

                this.template.required = !this.template.required
            },
            dateToDateTime: dateToDateTime,
        }
    }
</script>

<style lang="scss" scoped>

</style>
