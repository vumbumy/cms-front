<template>
    <div class="d-flex flex-column">
        <!-- TODO: z-index 최상단 위치 -->
        <close-edit-save
            v-model="mode"
            v-on:save="onClickSave"
            v-on:delete="onClickDelete"
        />

        <!-- TOP CONTENTS -->
        <top-contents :readonly="isReadOnly"/>
        <!--        -->

        <!-- TOP UNDER CONTENTS -->
        <div class="d-flex" v-if="isReadOnly">
            <div class="caption grey--text text--darken-2 text-truncate">
                https://naim.ai/products/{{item.sku}}
            </div>
            <div
                class="d-flex text-caption grey--text text--darken-2 ml-auto text-truncate"
                v-text="'#' + item.tags.join(' #')"/>
        </div>
        <div v-else class="d-flex">
            <div class="col-3 pb-0">
                <v-text-field label="SKU" v-model="item.sku"/>
            </div>
            <div class="ml-auto col-8 pb-0">
                <v-text-field label="Hashtags" v-model="item.tags" @change="onChangeTags"/>
            </div>
        </div>
        <v-divider class="grey"/>
        <!--        -->

        <!-- HEAD CONTENTS -->
        <div class="d-flex justify-space-between flex-nowrap text-left mt-5">
            <div class="d-flex col-3 pa-0">
                <div class="d-flex flex-column">
                    <div class="text-subtitle-1 text-sm-h7 font-weight-bold">재고</div>
                    <div v-if="isReadOnly" class="text-h5 text-sm-h3 mt-auto">{{item.stock}}</div>
                    <v-text-field v-else v-model="item.stock"/>
                </div>
                <div v-if="isReadOnly" class="text-h5 text-sm-h3 mx-1 mt-auto">/</div>
                <div v-else class="mx-1"/>
                <div class="d-flex flex-column">
                    <div class="text-subtitle-1 text-sm-h7 font-weight-bold">수량</div>
                    <div v-if="isReadOnly" class="text-h5 text-sm-h3 mt-auto">{{item.amount}}</div>
                    <v-text-field v-else v-model="item.amount"/>
                </div>
            </div>
            <div class="d-flex col-3 pa-0">
                <div class="d-flex flex-column">
                    <div class="text-subtitle-1 text-sm-h7 font-weight-bold">가격</div>
                    <div v-if="isReadOnly" class="text-h5 text-sm-h3 font-weight-bold mt-auto">{{item.price}}</div>
                    <v-text-field v-else v-model="item.price" suffix="만원/월"/>
                </div>
                <div v-if="isReadOnly" class="mt-auto ml-1 mt-auto">만원/월</div>
            </div>
            <div class="d-flex flex-column col-4 pa-0">
                <div class="text-subtitle-1 text-sm-h7 font-weight-bold tex">기간</div>
                <div v-if="isReadOnly" class="text-subtitle-1 font-weight-medium mt-auto" v-text="dates1"/>
                <date-field v-else v-model="item.dates1"/>
            </div>
        </div>
        <!--        -->

        <stepper class="mb-3"/>
        <photo class="mb-2"/>

        <!-- ADVANCED -->
        <expansion-panel label="Advanced" :value="true">

                <div class="d-flex justify-space-between flex-wrap panel-content">
                    <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0">
                        <v-text-field :readonly="isReadOnly" label="계약서" value="DIGI-01001(D01클래스)"/>
                        <v-text-field :readonly="isReadOnly" label="상품타입1" value="일반"/>
                        <v-text-field :readonly="isReadOnly" label="환불보상조건" value="일반"/>
                    </div>
                    <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0">
                        <v-text-field :readonly="isReadOnly" label="정가" value="1500000" suffix="만원/월"/>
                        <pair-list
                            label="볼륨할인율"
                            class="caption"

                            :items="discounts"
                            :readonly="isReadOnly"
                            v-on:append="discounts.push({name: '', value: ''})"
                            v-on:delete="index => discounts.splice(index, 1)"
                        >
                            <template v-slot:item={item}>
                                <v-text-field class="pr-1 small" :readonly="isReadOnly" dense v-model="item.name"/>
                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value" suffix="만원이상"/>
                            </template>
                        </pair-list>
                        <pair-list
                            label="옵션"
                            class="caption"

                            :items="options"
                            :readonly="isReadOnly"
                            v-on:append="options.push({name: '', value: ''})"
                            v-on:delete="index => options.splice(index, 1)"
                        >
                            <template v-slot:item={item}>
                                <v-text-field class="pr-1 small" :readonly="isReadOnly" dense v-model="item.name"/>
                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value"/>
                            </template>
                        </pair-list>
                    </div>
                    <div class="d-flex flex-column col-12 col-sm-4 ml-auto py-0 pl-0">
<!--                        <v-text-field :readonly="isReadOnly" label="상품 노출 기간" value="20/07/01 20/11/30"/>-->
                        <date-field :readonly="isReadOnly" label="상품 노출 기간" :value="['2020-07-01', '2020-11-30']"/>
                        <v-text-field :readonly="isReadOnly" label="최소판매기간" value="Week"/>
                        <v-text-field :readonly="isReadOnly" label="입금형식" value="선입/할부/후불/가능"/>
                    </div>
                </div>

        </expansion-panel>

        <!-- CONTENT PACKAGE -->
        <expansion-panel label="Content Package" :value="true">

                <div class="d-flex justify-space-between flex-wrap panel-content">
                    <div class="d-flex flex-column col-12 col-sm-5 pa-0">
                        <div class="d-flex">
                            <v-text-field :readonly="isReadOnly" label="접수마감" value="04"/>
                            <div class="text-left mt-3 ml-5">시작일<br>일전</div>
                        </div>
                        <pair-list
                            label="매체"
                            class="caption indigo--text accent-3"

                            :items="[{name: 'UJ-DID(의정부경전철)', value: '(spec json value)'}]"
                            :readonly="isReadOnly"
                        >
                            <template v-slot:item={item}>
                                <v-text-field class="pr-1" :readonly="isReadOnly" dense v-model="item.name"/>
                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value"/>
                            </template>
                        </pair-list>
                    </div>
                    <div class="d-flex flex-column justify-end col-12 pa-0 col-sm-6 mt-auto">
                        <pair-list
                            label="컨텐츠 포맷"
                            class="caption indigo--text accent-3"

                            :items="[{name: '항목', value: '(spec json value)'}]"
                            :readonly="isReadOnly"
                        >
                            <template v-slot:item={item}>
                                <v-text-field class="pr-1" :readonly="isReadOnly" dense v-model="item.name"/>
                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value"/>
                            </template>
                        </pair-list>
                    </div>
                </div>
        </expansion-panel>
        <!--        -->

        <!-- WEB PAGE -->
        <expansion-panel label="웹페이지 보기" v-model="webPage" :readonly="isReadOnly" type="checkbox">
                <v-select class="col-12 col-sm-4 px-0" label="테마" placeholder="일반광고상품1"/>
                <pair-list
                    label="섹션 추가(html)"
                    class="caption indigo--text accent-3"
                    :items="sections"
                    :readonly="isReadOnly"

                    v-on:append="sections.push({name: '', value: ''})"
                    v-on:delete="index => sections.splice(index, 1)"
                >
                    <template v-slot:item={item}>
                        <v-text-field class="col-2 py-0 pl-0" dense v-model="item.name"/>
                        <v-textarea outlined dense v-model="item.value" :rows="2"/>
                    </template>
                </pair-list>
        </expansion-panel>
        <!--        -->

        <!-- HISTORY -->
        <expansion-panel label="수정이력" :value="true">
            <actions-table/>
        </expansion-panel>
        <!-- HISTORY & REVIEWS -->

        <!-- REVIEWS -->
        <expansion-panel label="고객리뷰" :value="true">
                <div class="d-flex flex-column mb-3">
                    <div class="d-flex mb-5">
                        <v-icon>mdi-tag-outline</v-icon>
                        <v-chip
                            class="my-2 mx-1" close close-icon="mdi-close" color="primary"
                            v-for="(chip, index) in chips" :key="index">{{chip}}</v-chip>
                    </div>
                    <div class="d-flex flex-column" v-for="(review, index) in reviews" :key="index">
                        <div class="d-flex justify-space-between">
                            <p v-text="review.user1"/>
                            <p v-text="review.user2"/>
                        </div>
                        <div class="d-flex justify-space-between ">
                            <p class="text-caption grey--text text--darken-2" v-text="review.created"/>
                            <div
                                class="text-caption grey--text text--darken-2 ml-auto"
                                v-text="'#' + item.tags.join(' #')"/>
                        </div>
                        <div class="text-justify">
                            {{review.comment}}<v-divider/>
                        </div>
                    </div>
                </div>
                <v-btn outlined block>
                    더보기
                </v-btn>
        </expansion-panel>
        <!--        -->

        <div v-if="isReadOnly" class="d-flex flex-column elevation-0 py-3">
            <div class="d-flex pt-3">
                <v-select label="기간" class="col-3 pa-0 mr-1" placeholder="20.12.01 20.12.31"/>
                <v-select label="옵션" class="col-3 pa-0 ml-1" placeholder="기본"/>
                <v-select label="금액" class="col-3 pa-0 ml-auto" placeholder="100,000원"/>
            </div>
            <div class="d-flex justify-space-between">
                <v-btn
                    class="text-h5 font-weight-bold col-6 rounded-0"
                    style="color: blue;"
                    outlined>장바구니</v-btn>
                <v-btn
                    class="text-h5 font-weight-bold col-6 rounded-0"
                    style="background-color: blue"
                    text
                    dark>구매하기</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import Photo from "../../../components/Photo";
    import CloseEditSave from "../../../components/CloseEditSave";
    import {datesToString, dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../../../scripts/const";
    import Stepper from "../../../components/Stepper";
    import TopContents from "../../../components/TopContents";
    import DateField from "../../../components/DateField";
    import ActionsTable from "../../../components/tables/ActionsTable";
    import {SAMPLE_TEXT} from "../../../scripts/mock";
    import ExpansionPanel from "../../../components/layouts/ExpansionPanel";
    import PairList from "../../../components/layouts/PairList";

    export default {
        components: {
            PairList,
            ExpansionPanel,
            ActionsTable,
            DateField,
            TopContents,
            Stepper,
            CloseEditSave,
            Photo},
        props: {
            value: Object
        },
        data: () => ({
            dialog: true,
            tabs: ['ses x', 'ses y' ,'ses z'],
            mode: READ_MODE,

            item: {
                sku: 'uj10-21',
                stock: 2,
                amount: 10,
                price: 100,
                dates1: ["2020-10-01", "2020-12-30"],
                tags: ["의정부", "디지털특가", "21년 신규"]
            },
            sections: [
                {name: "설명", value: null},
                {name: "항목", value: null}
            ],
            options: [
                {name: '회룡역만', value: '+100000'},
            ],
            discounts: [{name: '15%', value: '200'}],
            webPage: true,
            chips: ["의정부", "디지털", "2020년 처음"],
            reviews: [
                {
                    user1: "vumbumy",
                    user2: "digi01",
                    created: "20.12.14 11:14:21",
                    tags: ["의정부 디지털"],
                    comment: SAMPLE_TEXT
                }
            ]
        }),
        created() {
            this.updateMode()
        },
        watch: {
            $route(){
                this.updateMode()
            }
        },
        computed: {
            isReadOnly(){
                return this.mode !== EDIT_MODE && this.mode !== Add_MODE
            },
            dates1(){
                return datesToString(this.item.dates1)
            }
        },
        methods: {
            updateMode(){
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
            },
            onClickDelete: function(){
                console.log('DELETE')
            },
            dateToDateTime: dateToDateTime,
        }
    }
</script>

<style lang="scss" scoped>
    .panel-content > div > .v-text-field {
        font-size: 0.8rem;
    }
    .panel-content > div > div > .v-text-field {
        font-size: 0.8rem;
    }
    .panel-content > div > div > div {
        font-size: 0.8rem;
    }
</style>
