<template>
    <div class="d-flex flex-column">
        <!-- TODO: z-index 최상단 위치 -->
        <close-edit-save v-model="mode"/>

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
        <div class="d-flex justify-space-between flex-wrap text-left">
            <div class="d-flex col-3">
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
            <div class="d-flex col-4">
                <div class="d-flex flex-column">
                    <div class="text-subtitle-1 text-sm-h7 font-weight-bold">가격</div>
                    <div v-if="isReadOnly" class="text-h5 text-sm-h3 font-weight-bold mt-auto">{{item.price}}</div>
                    <v-text-field v-else v-model="item.price" suffix="만원/월"/>
                </div>
                <div v-if="isReadOnly" class="mt-auto ml-1 mt-auto">만원/월</div>
            </div>
            <div class="d-flex flex-column col-4">
                <div class="text-subtitle-1 text-sm-h7 font-weight-bold">기간</div>
                <div v-if="isReadOnly" class="text-caption font-weight-medium mt-auto" v-text="dates1"/>
<!--                <v-text-field-->
<!--                    v-else-->

<!--                    v-model="item.dates1"-->
<!--                    prepend-icon="mdi-calendar"/>-->
                <date-field v-else v-model="item.dates1"/>
            </div>
        </div>
        <!--        -->

        <stepper class="mb-3"/>
        <photo class="mb-2"/>

        <v-expansion-panels
            v-model="panel1"
            multiple
            flat
        >
            <v-expansion-panel>
                <v-expansion-panel-header class="pa-0">
                    <strong>Advanced</strong>
                </v-expansion-panel-header>
                <v-divider/>
                <v-expansion-panel-content>
                    <div class="d-flex justify-space-between flex-wrap panel-content">
                        <div class="d-flex flex-column col-12 pl-0 col-sm-4">
                            <v-text-field :readonly="isReadOnly" label="계약서" value="DIGI-01001(D01클래스)"/>
                            <v-text-field :readonly="isReadOnly" label="상품타입1" value="일반"/>
                            <v-text-field :readonly="isReadOnly" label="환불보상조건" value="일반"/>
                        </div>
                        <div class="d-flex flex-column col-12 pl-0 col-sm-3">
                            <v-text-field :readonly="isReadOnly" label="정가" value="1500000" suffix="만원/월"/>
                            <!-- TODO: 페어 텍스트 입력 폼 -->
                            <v-text-field :readonly="isReadOnly" label="볼륨할인율" value="15%" suffix="200만원 이상"/>
                            <!-- TODO: 페어 텍스트 입력 폼 -->
                            <v-text-field :readonly="isReadOnly" label="옵션" value="회룡역만" persistent-hint hint="+100,000원"/>
                        </div>
                        <div class="d-flex flex-column col-12 pl-0 col-sm-4 ml-auto">
                            <v-text-field :readonly="isReadOnly" label="상품 노출 기간" value="20/07/01 20/11/30"/>
                            <v-text-field :readonly="isReadOnly" label="최소판매기간" value="Week"/>
                            <v-text-field :readonly="isReadOnly" label="입금형식" value="선입/할부/후불/가능"/>
                        </div>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="pa-0">
                    <strong>Content Package</strong>
                </v-expansion-panel-header>
                <v-divider/>
                <v-expansion-panel-content>
                    <div class="d-flex justify-space-between flex-wrap panel-content">
                        <div class="d-flex flex-column col-12 col-sm-5 px-0">
                            <div class="d-flex">
                                <v-text-field :readonly="isReadOnly" label="접수마감" value="04"/>
                                <div class="text-left mt-3 ml-5">시작일<br>일전</div>
                            </div>
                            <v-text-field :readonly="isReadOnly" label="매체" value="UJ-DID(의정부경전철)"/>
                        </div>
                        <div class="d-flex flex-column justify-end col-12 px-0 col-sm-4 mt-auto">
                            <v-text-field :readonly="isReadOnly" label="컨텐츠 포맷" value="항목"/>
                        </div>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <div class="d-flex flex-column">
            <div class="d-flex justify-space-between">
                <div class="v-expansion-panel-header pa-0 font-weight-bold">
                    웹페이지 보기
                </div>
                <v-simple-checkbox v-model="webPage" :disabled="isReadOnly"/>
            </div>
            <v-divider/>
            <v-expand-transition>
                <v-card flat v-show="!isReadOnly && webPage" class="mx-auto text-left px-6" width="100%">
                    <v-select class="col-12 col-sm-4 px-0" label="테마" value="일반광고상품1"/>
                    <div class="text-caption">섹션 추가(html)</div>
                    <div class="d-flex" v-for="(section, index) in sections" :key="index">
                        <v-icon class="pr-2 pb-2">mdi-minus-circle-outline</v-icon>
                        <v-text-field dense :label="section.name" v-model="section.value"/>
                    </div>
                </v-card>
            </v-expand-transition>
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

    export default {
        components: {
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
            panel1: [],
            panel2: [0, 1],

            item: {
                sku: 'uj10-21',
                stock: 2,
                amount: 10,
                price: 100,
                dates1: ["2020-10-01", "2020-12-30"],
                tags: ["의정부", "디지털특가", "21년 신규"]
            },
            sections: [
                {
                    name: "설명",
                    value: null
                },
                {
                    name: "항목",
                    value: null
                }
            ],
            webPage: true
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

    .v-expansion-panel-content .v-expansion-panel-content__wrap {
        padding: 0;
    }
</style>
