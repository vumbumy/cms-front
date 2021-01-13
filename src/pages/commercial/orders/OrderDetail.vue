<template>
    <div class="d-flex flex-column">
        <close-edit-save
            class="header"
            v-model="mode"
            v-on:save="onClickSave"
            v-on:delete="onClickDelete"
        />
        <div class="d-flex flex-column">
            <!-- TOP CONTENTS -->
            <top-contents
                :readonly="isReadOnly"

                :updated="Date.parse('2020-12-13')"
                :created="Date.parse('2020-12-01')"
            >
                <div v-if="isReadOnly">
                    <div class="text-h4 font-weight-bold" v-text="item.title"/>
                    <div class="d-flex align-center" v-if="item.productId > 0">
                        <div class="text-h6 font-weight-bold">{{productTitle}}</div>
                        <v-btn icon @click="onClickProduct" color="indigo">
                            <v-icon size="20px">mdi-arrow-top-right</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div v-else>
                    <v-text-field
                        label="주문명"
                        class="text-h4 font-weight-bold"

                        v-model="item.title"
                    />
                    <v-select
                        label="상품명"
                        class="text-h6 font-weight-bold"
                        clearable

                        :items="products"
                        item-text="title"
                        item-value="id"

                        v-model="item.productId"
                    />
                </div>
            </top-contents>
            <!--        -->

            <!-- TOP UNDER CONTENTS -->
            <div v-if="isReadOnly" class="text-caption grey--text text--darken-2 align-self-end text-truncate" v-text="'#' + item.tags.join(' #')"/>
            <div v-else class="d-flex align-end">
                <v-text-field class="flex-grow-1" label="Hashtags" v-model="item.tags" @change="onChangeTags"/>
            </div>
            <v-divider class="grey"/>
            <!--        -->

            <!-- HEAD CONTENTS -->
            <div class="d-flex justify-space-between text-left mt-5 flex-wrap">
                <div class="d-flex col-12 col-sm-6 pa-0 mb-auto justify-space-between">
                    <div class="d-flex col-8 pa-0">
                        <div class="d-flex flex-column">
                            <div class="text-subtitle-1 text-sm-h7 font-weight-bold">임금액</div>
                            <div class="text-h5 text-sm-h4 font-weight-bold mt-auto">100</div>
                        </div>
                        <div class="text-h5 text-sm-h4 mx-1 mt-auto">/</div>
                        <div class="d-flex flex-column">
                            <div class="text-subtitle-1 text-sm-h7 font-weight-bold">총금액</div>
                            <div class="text-h5 text-sm-h4 font-weight-bold mt-auto">200</div>
                        </div>
                        <div class="mt-auto ml-1 text-caption">만원/월</div>
                    </div>
                    <div class="d-flex flex-column pr-sm-6">
                        <div class="text-subtitle-1 text-sm-h7 font-weight-bold">보고서</div>
                        <div class="text-h5 text-sm-h4 font-weight-bold mt-auto">3</div>
                    </div>
                </div>
                <div class="d-flex col-12 col-sm-6 pa-0 justify-end">
                    <div class="d-flex flex-column col-6 pa-0">
                        <div class="text-subtitle-1 text-sm-h7 font-weight-bold">컨텐츠</div>
                        <div class="d-flex text-h5 text-sm-h4 mt-auto">
                            <div class="font-weight-bold">3</div>
                            <div>/</div>
                            <div class="font-weight-bold">3</div>
                        </div>
                    </div>
                    <div class="d-flex flex-column col-6 pa-0 text-right">
                        <div class="text-subtitle-1 text-sm-h7 font-weight-bold tex">기간</div>
                        <div class="text-subtitle-1 font-weight-medium" v-text="datesString"/>
                    </div>
                </div>
            </div>
            <!--        -->
            <stepper/>
            <photo class="mb-2"/>

            <!-- ADVANCED -->
            <expansion-panel label="Advanced" :value="true">
                <div class="d-flex justify-space-between flex-wrap">
                    <div class="d-flex flex-column col-12 col-sm-4 pa-0 mb-auto">
                        <v-text-field :readonly="isReadOnly" label="광고 상품명" value="DIGI-01001(D01클래스)"/>
                        <v-text-field :readonly="isReadOnly" label="광고주 담당자 연락처" value="일반"/>
                        <v-text-field :readonly="isReadOnly" label="매체사 담당자 연락처" value="일반"/>
                    </div>
                    <div class="d-flex flex-column col-12 col-sm-4 py-0 px-2 mb-auto">
                        <v-text-field :readonly="isReadOnly" label="계약금액" value="3,000,000"/>
                        <v-text-field :readonly="isReadOnly" label="주문자" value="이름(user_id)"/>
                    </div>
                    <div class="d-flex flex-column col-12 col-sm-4 pa-0 mb-auto">
                        <v-select label="진행상태" :items="['게첨중']" value="게첨중"/>
                        <date-field :readonly="isReadOnly" label="시작/종료일" :value="['2020-07-01', '2020-11-30']"/>
                        <div class="d-flex">
                            <v-text-field :readonly="isReadOnly" label="수량" value="3"/>
                            <v-spacer class="mx-1"/>
                            <v-text-field :readonly="isReadOnly" label="매체명" value="의정부DID"/>
                        </div>
                    </div>
                </div>
            </expansion-panel>

            <!-- CONTRACT -->
            <expansion-panel label="계약서" :value="true">
                <div class="d-flex flex-column col-4 py-0 pl-0">
                    <v-text-field
                        label="계약서"
                        v-if="isReadOnly"
                        readonly
                        :value="contractTitle"
                        append-icon="mdi-arrow-top-right"
                        @click:append="onClickContract"
                    />
                    <v-select label="계약서" v-else :items="contracts" item-value="id" item-text="title" v-model="item.contractId" placeholder="없음"/>

                    <v-text-field
                        label="계약서"
                        v-if="isReadOnly"
                        readonly
                        value="견적서-1"
                        append-icon="mdi-arrow-top-right"
                    />
                    <v-select label="견적서" v-else :readonly="isReadOnly" :items="['견적서-1', '견적서-2']" value="견적서-1"/>
                </div>
            </expansion-panel>
            <!--        -->

            <!-- CONTENT PACKAGE -->
            <expansion-panel label="Content Package" :readonly="isReadOnly" circle="green" :value="true">
                <div class="d-flex">
                    <v-text-field class="col-8 px-0" :readonly="isReadOnly" label="컨텐츠형식" value="(DID스크린) w:1902, h:1080, l:15 (포스터) w:1902, h:1080, format:’pdf,png’"/>
                    <v-select class="col-3 px-0 ml-auto" :readonly="isReadOnly" :items="['정상', '비정상']" value="정상" />
                </div>
                <actions-table/>
            </expansion-panel>
            <!--        -->

            <!-- HISTORY -->
            <expansion-panel label="수정이력" :value="true">
                <actions-table more/>
            </expansion-panel>
            <!--        -->

        </div>
    </div>
</template>

<script>
    import Photo from "../../../components/Photo";
    import CloseEditSave from "../../../components/CloseEditSave";
    import {datesToString, dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../../../scripts/const";
    import Stepper from "../../../components/Stepper";
    import TopContents from "../../../components/layouts/TopContents";
    import DateField from "../../../components/menus/DateField";
    import ActionsTable from "../../../components/tables/ActionsTable";
    import {SAMPLE_TEXT} from "../../../scripts/mock";
    import ExpansionPanel from "../../../components/layouts/ExpansionPanel";
    import {getContracts} from "../../../api/contracts";
    // import MultiFieldList from "../../../components/layouts/MultiFieldList";

    export default {
        components: {
            // MultiFieldList,
            ExpansionPanel,
            ActionsTable,
            DateField,
            TopContents,
            Stepper,
            CloseEditSave,
            Photo
        },
        props: {
            value: Object
        },
        data: () => ({
            mode: READ_MODE,
            item: {
                title: "디지털01-UJ-12",
                tags: ["의정부", "디지털특가", "21년 신규"],
                dates: ["2020-10-01", "2020-12-30"],
                productId: 0,
                contractId: 0,
            },
            products: [
                {
                    id: 1,
                    title: "디지털01-의정부(상품명)-123"
                }
            ],
            contracts: [],


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
            datesString(){
                return datesToString(this.item.dates)
            },
            product(){
                return this.products.find(p => p.id === this.item.productId)
            },
            productTitle(){
                return this.product.title
            },
            productPath(){
                return `#/${this.$route.matched[0].name}/products?id=${this.product.id}`
            },
            contract(){
                return this.contracts.find(c => c.id === this.item.contractId)
            },
            contractTitle(){
                if(this.contract === undefined)
                    return "없음"

                return this.contract.title
            }
        },
        methods: {
            initialize(){
                this.contracts = getContracts()

                if(this.$route.query.id === '0')
                    this.mode = Add_MODE
                else
                    this.mode = READ_MODE
            },
            onChangeTags(tags) {
                this.tags = tags.split(',')
            },
            onClickSave() {
                console.log('SAVE')
            },
            onClickDelete: function(){
                console.log('DELETE')
            },
            onClickProduct(){
                if(this.item.productId <= 0) return

                let productPath = {
                    path: "/commercial/agreements",
                    query: {id: this.item.productId}
                }
                this.$router.push(productPath)
                    .catch(() => ({}))
            },
            onClickContract() {
                if(this.item.contractId <= 0) return

                let contractPath = {
                    path: "/commercial/agreements",
                    query: {id: this.item.contractId}
                }

                this.$router.push(contractPath)
                    .catch(() => ({}))
            },
            dateToDateTime: dateToDateTime,
        }
    }
</script>

<style lang="scss" scoped>

</style>
