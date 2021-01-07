<template>
    <div class="d-flex flex-column">
        <top-contents
            :readonly="readonly"

            :updated="Date.parse('2020-12-13')"
            :created="Date.parse('2020-12-01')"
        >
            <div v-if="readonly">
                <div class="text-h4 font-weight-bold" v-text="item.title"/>
                <div class="text-h6 font-weight-bold" v-text="templateName"/>
            </div>
            <div v-else>
                <v-text-field
                    label="계약명"
                    class="text-h4 font-weight-bold"

                    v-model="item.title"
                />
                <v-select
                    label="계약양식명"
                    class="text-h6 font-weight-bold"

                    :items="templates"
                    v-model="item.templateId"
                    item-value="id"
                    item-text="name"
                />
            </div>
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
            <div class="d-flex">
                <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0 mb-auto">
                    <v-text-field class="text-caption" label="계약명" value="의정부-xy"/>
                    <v-text-field class="text-caption" label="계약금액(원)" value="2,000,000"/>
                    <div class="d-flex">
                        <v-text-field class="text-caption col-6 pl-0" label="시작일" value="의정부-xy"/>
                        <v-text-field class="text-caption col-6 px-0" label="종료일" value="의정부-xy"/>
                    </div>
                    <div class="d-flex">
                        <v-text-field class="text-caption col-6 py-0 pl-0" label="대표매체명" value="의정부-xy"/>
                        <v-text-field class="text-caption col-6 py-0 px-0" label="수량" value="의정부-xy"/>
                    </div>
                </div>
                <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0">
                    <v-text-field class="text-caption" label="계약자(갑)" value="나임에이아이"/>
                    <v-text-field class="text-caption" label="사업자번호/주민번호(갑)" value="123-1234-123"/>
                    <v-text-field class="text-caption" label="주소(갑)" value="서울시 강남구 강남대로"/>
                    <v-text-field class="text-caption" label="담당자(갑)" value="홍길동"/>
                    <v-text-field class="text-caption" label="전화번호(갑)" value="010-1234-1234"/>
                    <v-text-field class="text-caption" label="이메일(갑)" value="user@example.com"/>
                </div>
                <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0">
                    <v-text-field class="text-caption" label="계약자(을)" value="고객명"/>
                    <v-text-field class="text-caption" label="사업자번호/주민번호(을)" value="123-1234-123"/>
                    <v-text-field class="text-caption" label="주소(갑)" value="서울시 강남구 강남대로"/>
                    <v-text-field class="text-caption" label="담당자(을)" value="홍길동"/>
                    <v-text-field class="text-caption" label="전화번호(을)" value="010-1234-1234"/>
                    <v-text-field class="text-caption" label="이메일(을)" value="user@example.com"/>
                </div>
            </div>
        </expansion-panel>
        <!--        -->

        <!-- ADVANCED -->
        <expansion-panel label="Advanced" :value="true">
            <div class="d-flex">
                <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0 mb-auto">
                    <div class="text-subtitle-1 font-weight-bold"><strong>연결데이터</strong></div>
                    <v-text-field class="text-caption" label="계약명" value="의정부-xy"/>
                    <v-text-field class="text-caption" label="계약금액(원)" value="2,000,000"/>
                    <div class="d-flex">
                        <v-text-field class="text-caption col-6 pl-0" label="시작일" value="의정부-xy"/>
                        <v-text-field class="text-caption col-6 px-0" label="종료일" value="의정부-xy"/>
                    </div>
                    <div class="d-flex">
                        <v-text-field class="text-caption col-6 py-0 pl-0" label="대표매체명" value="의정부-xy"/>
                        <v-text-field class="text-caption col-6 py-0 px-0" label="수량" value="의정부-xy"/>
                    </div>
                </div>
                <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0">
                    <div class="text-subtitle-1 font-weight-bold"><strong>입금 스케쥴</strong></div>
                    <div class="d-flex">
                        <v-text-field class="text-caption col-6 pl-0" label="게시일전" value="15"/>
                        <v-text-field class="text-caption col-6 px-0" label="활불비율" value="100%"/>
                    </div>
                    <div class="d-flex">
                        <v-text-field class="text-caption col-6 pl-0" label="게시일전" value="15"/>
                        <v-text-field class="text-caption col-6 px-0" label="활불비율" value="100%"/>
                    </div>
                    <div class="d-flex">
                        <v-text-field class="text-caption col-6 pl-0" label="게시일전" value="15"/>
                    </div>
                </div>
                <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0">
                    <div class="text-subtitle-1 font-weight-bold"><strong>환불취소조건</strong></div>
                    <div class="d-flex">
                        <v-text-field class="text-caption col-6 pl-0" label="게시일전" value="15"/>
                        <v-text-field class="text-caption col-6 px-0" label="활불비율" value="100%"/>
                    </div>
                </div>
            </div>
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
    import ActionsTable from "../../../../components/tables/ActionsTable";
    export default {
        components: {ActionsTable, ExpansionPanel, TopContents},
        props: {
            readonly: Boolean
        },
        data: () => ({
            item: {
                title: "일반광고계약-34",
                templateId: 1,
                tags: ["의정부", "디지털특가", "21년 신규"],
                url: "https://gdocument/skdjhfs677878"
            },
            templates: [
                {
                    id: 1,
                    name: "일반광고계약template1"
                }
            ]
        }),
        methods: {
            onChangeTags(tags) {
                this.item.tags = tags.split(',')
            },
        },
        computed: {
            templateName(){
                return this.templates.find(e => e.id === this.item.templateId).name
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
