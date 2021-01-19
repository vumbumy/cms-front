<template>
    <v-sheet class="d-flex flex-column" :min-width="detailMinWidth">
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

                :updated="order.updated"
                :created="order.created"
            >
                <div v-if="isReadOnly">
                    <div class="text-h4 font-weight-bold" v-text="order.name"/>
                    <div class="d-flex align-center" v-if="order.productSKU">
                        <div class="text-h6 font-weight-bold">{{productTitle}}</div>
                        <v-href :to="{name:'products:detail' ,params: {sku: order.productSKU}}" size="20px"/>
                    </div>
                </div>
                <div v-else>
                    <v-text-field
                        label="주문명"
                        class="text-h4 font-weight-bold"

                        v-model="order.name"
                    />
                    <v-select
                        label="상품명"
                        class="text-h6 font-weight-bold"
                        clearable

                        :items="products"
                        item-text="name"
                        item-value="sku"

                        v-model="order.productSKU"
                    />
                </div>
            </top-contents>
            <!--        -->

            <!-- TOP UNDER CONTENTS -->
            <div v-if="isReadOnly" class="text-caption grey--text text--darken-2 align-self-end text-truncate" v-text="'#' + order.tags.join(' #')"/>
            <div v-else class="d-flex align-end">
                <v-text-field class="flex-grow-1" label="Hashtags" v-model="order.tags" @change="onChangeTags"/>
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
                        :append-icon="order.contractNo > 0 ? 'mdi-arrow-top-right' : null"
                        @click:append="onClickContract"
                    />
                    <v-select label="계약서" v-else :items="contracts" item-value="no" item-text="title" v-model="order.contractNo" placeholder="없음"/>

<!--                    <v-text-field-->
<!--                        label="계약서"-->
<!--                        v-if="isReadOnly"-->
<!--                        readonly-->
<!--                        value="견적서-1"-->
<!--                        append-icon="mdi-arrow-top-right"-->
<!--                    />-->
<!--                    <v-select label="견적서" v-else :readonly="isReadOnly" :items="['견적서-1', '견적서-2']" value="견적서-1"/>-->
                </div>
            </expansion-panel>
            <!--        -->

            <!-- CONTENT PACKAGE -->
            <expansion-panel label="Content Package" circle="green" :value="true">
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
    </v-sheet>
</template>

<script>
    import Photo from "../../../components/Photo";
    import CloseEditSave from "../../../components/CloseEditSave";
    import {datesToString, dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, NEW_ITEM_ID, READ_MODE} from "../../../scripts/const";
    import Stepper from "../../../components/Stepper";
    import TopContents from "../../../components/layouts/TopContents";
    import DateField from "../../../components/menus/DateField";
    import ActionsTable from "../../../components/tables/ActionsTable";
    import {SAMPLE_TEXT} from "../../../scripts/mock";
    import ExpansionPanel from "../../../components/layouts/ExpansionPanel";
    import {getContracts} from "../../../api/contracts";
    import {getProducts} from "../../../api/products";
    import {deleteOrder, getOrder, newOrder, setOrder} from "../../../api/orders";
    import {refresh, saved} from "../../../plugins/eventBus";
    import VHref from "../../../components/VHref";
    // import MultiFieldList from "../../../components/layouts/MultiFieldList";

    export default {
        components: {
            VHref,
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
            order: {},
            products: [],
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
        computed: {
            isReadOnly(){
                return this.mode !== EDIT_MODE && this.mode !== Add_MODE
            },
            datesString(){
                return datesToString(this.order.dates)
            },
            product(){
                return this.products.find(product => product.sku === this.order.productSKU)
            },
            productTitle(){
                if(this.product === undefined) return ""

                return this.product.name
            },
            contract(){
                return this.contracts.find(c => c.no === this.order.contractNo)
            },
            contractTitle(){
                if(this.contract === undefined)
                    return "없음"

                return this.contract.title
            },
            detailMinWidth(){
                if(this.$vuetify.breakpoint.smAndUp)
                    return 700

                return 0
            },
        },
        watch: {
            $route(){
                this.initialize()
            }
        },
        methods: {
            initialize(){
                this.contracts = getContracts()
                this.products = getProducts()

                let no = this.$route.params.no
                if(no === NEW_ITEM_ID){
                    this.mode = Add_MODE

                    this.order = newOrder()
                }
                else{
                    this.mode = READ_MODE

                    this.order = getOrder(no)
                }
            },
            onChangeTags(tags) {
                this.tags = tags.split(',')
            },
            onClickSave() {
                let no = setOrder(this.order)

                this.$router.push({name: this.$route.name, params: {no: no}})
                    .catch(() => ({}))

                saved()
            },
            onClickDelete: function(){
                deleteOrder(this.order.no)

                this.$router.push({name: 'orders'})
                    .catch(() => ({}))

                refresh()
            },
            // onClickProduct(){
            //     if(this.order.productSKU <= 0) return
            //
            //     let productPath = {
            //         path: "/commercial/contracts",
            //         query: {id: this.order.productNo}
            //     }
            //     this.$router.push(productPath)
            //         .catch(() => ({}))
            // },
            onClickContract() {
                if(this.order.contractNo <= 0) return

                let contractPath = {
                    name: "contracts",
                    params: {no: this.order.contractNo}
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
