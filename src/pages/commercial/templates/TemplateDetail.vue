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
            <v-text-field
                label="계약양식명"

                class="text-h4 font-weight-bold pb-0"

                v-model="template.title"
                :readonly="isReadOnly"
                hide-details
            />
        </top-contents>

        <!-- TOP UNDER CONTENTS -->
<!--        <div class="d-flex">-->
<!--            <div v-if="isReadOnly" class="text-caption grey&#45;&#45;text text&#45;&#45;darken-2" v-text="template.url"/>-->
<!--            <v-text-field v-else label="문서 URL" class="text-caption align-self-end" v-model="template.url"/>-->
<!--            <v-spacer/>-->
<!--            <div v-if="isReadOnly" class="text-caption grey&#45;&#45;text text&#45;&#45;darken-2" v-text="'#' + template.tags.join(' #')"/>-->
<!--            <v-text-field v-else label="Hashtags" v-model="template.tags" @change="onChangeTags"/>-->
<!--        </div>-->
<!--        <v-divider class="grey"/>-->
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
                    <v-text-field dense :readonly="isReadOnly" label="제목" class="text-caption col-2 pl-0" v-model="item.title"/>
                    <v-text-field dense :readonly="isReadOnly" label="순서" class="text-caption col-2 pl-0" v-model="item.order" type="number"/>
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
                    <v-text-field dense :readonly="isReadOnly" label="제목" class="text-caption col-2 pl-0" v-model="item.title"/>
                    <v-text-field dense :readonly="isReadOnly" label="크기" class="text-caption col-1 pl-0" v-model="item.size"/>
                    <v-select dense :readonly="isReadOnly" label="형식" class="text-caption col-2 pl-0" :items="types" v-model="item.type"/>
                    <v-select dense :readonly="isReadOnly" label="필수" class="text-caption col-2 pl-0" :items="['Yes', 'No']" v-model="item.required" @click="onClickRequired"/>
                    <v-select dense :readonly="isReadOnly" label="SECTION" class="text-caption" v-model="item.section" :items="template.sections" item-text="title" item-value="title" placeholder="없음"/>
                </template>
            </multi-field-list>
        </expansion-panel>
        <!--        -->
    </div>
</template>

<script>
    import CloseEditSave from "../../../components/CloseEditSave";
    import {dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../../../scripts/const";
    import TopContents from "../../../components/layouts/TopContents";
    import ExpansionPanel from "../../../components/layouts/ExpansionPanel";
    import MultiFieldList from "../../../components/layouts/MultiFieldList";
    import {deleteTemplate, getTemplate, setTemplate} from "../../../api/templates";
    import EventBus from "../../../plugins/eventBus";

    export default {
        components: {
            MultiFieldList,
            ExpansionPanel,
            TopContents,
            CloseEditSave,
        },
        // props: {
        //     value: Object
        // },
        data: () => ({
            mode: READ_MODE,

            types: ["String", "Number", "Date"],

            template: {
                sections: [],
                fields: []
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
            }
        },
        methods: {
            initialize() {
                let id = parseInt(this.$route.query.id)

                if(id === 0 ) {
                    this.mode = Add_MODE

                    this.template = {
                        sections: [],
                        fields: []
                    }
                }
                else {
                    this.mode = READ_MODE

                    this.template = getTemplate(id)
                }
            },
            onChangeTags(tags) {
                this.template.tags = tags.split(',')
            },
            onClickSave() {
                console.log('SAVE')

                let id = setTemplate(this.template)

                this.$router.replace({query: {id: id}})
                    .catch(() => ({}))

                EventBus.$emit('refresh')
            },
            onClickDelete: function(){
                console.log('DELETE', this.template.id)

                deleteTemplate(this.template.id)

                this.$router.replace({'query': null})
                    .catch(() => ({}))

                EventBus.$emit('refresh')
            },
            newSection: (lastOrder) => ({
                title: "",
                order: lastOrder,
            }),
            newField: () => ({
                title: "",
                size: 0,
                type: "String",
                required: "Yes",
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
