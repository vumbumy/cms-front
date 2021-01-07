<template>
    <div class="d-flex flex-column">
        <top-contents
            :readonly="readonly"

            :updated="Date.parse('2020-12-13')"
            :created="Date.parse('2020-12-01')"
        >
            <v-text-field
                label="계약양식명"

                class="text-h4 font-weight-bold pb-0"

                v-model="item.title"
                :readonly="readonly"
                hide-details
            />
        </top-contents>

        <!-- TOP UNDER CONTENTS -->
        <div class="d-flex">
            <div v-if="readonly" class="text-caption grey--text text--darken-2" v-text="item.url"/>
            <v-text-field v-else label="문서 URL" class="text-caption align-self-end" v-model="item.url"/>
            <v-spacer/>
            <div v-if="readonly" class="text-caption grey--text text--darken-2" v-text="'#' + item.tags.join(' #')"/>
            <v-text-field v-else label="Hashtags" v-model="item.tags" @change="onChangeTags"/>
        </div>
        <v-divider class="grey"/>
        <!--        -->

        <!-- COMMON -->
        <expansion-panel label="공통기본" :value="true">
            <multi-field-list
                class="caption"

                :items="commons"
                :readonly="readonly"

                v-on:append="commons.push(newCommon())"
                v-on:delete="index => commons.splice(index, 1)"
            >
                <template v-slot:item={item}>
                    <v-text-field dense :readonly="readonly" label="제목" class="text-caption col-2 pl-0" v-model="item.title"/>
                    <v-text-field dense :readonly="readonly" label="크기" class="text-caption col-1 pl-0" v-model="item.size"/>
                    <v-select dense :readonly="readonly" label="형식" class="text-caption col-2 pl-0" :items="types" v-model="item.type"/>
                    <v-select dense :readonly="readonly" label="필수" class="text-caption col-2 pl-0" :items="['Yes', 'No']" v-model="item.required" @click="onClickRequired"/>
                    <v-text-field dense :readonly="readonly" label="SUBSECTION" class="text-caption" v-model="item.subsection" placeholder="없음"/>
                </template>
            </multi-field-list>
        </expansion-panel>
        <!--        -->

        <!-- ADVANCED -->
        <expansion-panel label="Advanced" :value="true">
            <multi-field-list
                class="caption"

                :items="advances"
                :readonly="readonly"

                v-on:append="advances.push(newCommon())"
                v-on:delete="index => advances.splice(index, 1)"
            >
                <template v-slot:item={item}>
                    <v-text-field dense :readonly="readonly" label="제목" class="text-caption col-2 pl-0" v-model="item.title"/>
                    <v-text-field dense :readonly="readonly" label="크기" class="text-caption col-1 pl-0" v-model="item.size"/>
                    <v-select dense :readonly="readonly" label="형식" class="text-caption col-2 pl-0" :items="types" v-model="item.type"/>
                    <v-select dense :readonly="readonly" label="필수" class="text-caption col-2 pl-0" :items="['Yes', 'No']" v-model="item.required" @click="onClickRequired"/>
                    <v-text-field dense :readonly="readonly" label="SUBSECTION" class="text-caption" v-model="item.subsection" placeholder="없음"/>
                </template>
            </multi-field-list>
        </expansion-panel>
        <!--        -->

        <!-- HISTORY -->
        <expansion-panel label="수정이력" :value="true">
            <actions-table/>
        </expansion-panel>
        <!--        -->
    </div>
</template>

<script>
    import TopContents from "../../../../components/layouts/TopContents";
    import ExpansionPanel from "../../../../components/layouts/ExpansionPanel";
    import MultiFieldList from "../../../../components/layouts/MultiFieldList";
    import ActionsTable from "../../../../components/tables/ActionsTable";
    export default {
        components: {ActionsTable, MultiFieldList, ExpansionPanel, TopContents},
        props: {
            readonly: Boolean
        },
        data: () => ({
            item: {
                title: "일반광고계약template1",
                url: "https://gdocument/skdjhfs677878",
                tags: ["의정부", "디지털특가", "21년 신규"],
            },

            types: ["String", "Number", "Date"],

            commons: [
                {title: "계약명", size: 6, type: "String", required: "Yes", subsection: ""},
                {title: "금액", size: 12, type: "Number", required: "Yes", subsection: ""},
                {title: "기간(시작)", size: 6, type: "Date", required: "Yes", subsection: ""},
            ],

            advances: [
                {title: "연결데이터", size: 6, type: "String", required: "Yes", subsection: ""},
                {title: "입금기한, 금액", size: 12, type: "K-V", required: "Yes", subsection: "Content Package"},
                {title: "기간(시작)", size: 6, type: "Date", required: "Yes", subsection: ""},
            ],
        }),
        methods: {
            newCommon: () => ({
                title: "",
                size: 0,
                type: "String",
                required: "Yes",
                subsection: ""
            }),
            onClickRequired(){
                if(this.readonly)
                    return

                this.item.required = !this.item.required

                console.log(this.item.required)
            },
            onChangeTags(tags) {
                this.item.tags = tags.split(',')
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
