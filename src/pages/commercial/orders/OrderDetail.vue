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
<!--                <div v-if="isReadOnly" class="text-h5 text-sm-h4">-->
<!--                    <strong v-text="item.title"/>-->
<!--                </div>-->
<!--                <v-text-field v-else label="이름" v-model="item.title"/>-->
<!--                <div v-if="isReadOnly" class="text-h7 text-sm-h6 grey&#45;&#45;text text&#45;&#45;darken-2 text-truncate">-->
<!--                    <strong v-text="item.subtitle"/>-->
<!--                </div>-->
<!--                <v-text-field v-else label="카테고리" v-model="item.subtitle"/>-->
                <div v-if="isReadOnly">
                    <div class="text-h4 font-weight-bold" v-text="item.title"/>
                    <div class="d-flex align-center" v-if="item.productId > 0">
                        <div class="text-h6 font-weight-bold">{{productTitle}}</div>
                        <v-btn icon :href="productPath" color="indigo">
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
                        @click:append="item.contractId > 0 ? onClickContract: null"
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
<!--                    <div class="d-flex flex-column col-12 col-sm-5 pa-0">-->
<!--                        <div class="d-flex">-->
<!--                            <v-text-field :readonly="isReadOnly" label="접수마감" value="04"/>-->
<!--                            <div class="text-left mt-2 ml-5">시작일<br>일전</div>-->
<!--                        </div>-->
<!--                        <multi-field-list-->
<!--                            label="매체"-->
<!--                            class="caption indigo&#45;&#45;text accent-3"-->

<!--                            :items="[{name: 'UJ-DID(의정부경전철)', value: '(spec json value)'}]"-->
<!--                            :readonly="isReadOnly"-->
<!--                        >-->
<!--                            <template v-slot:item={item}>-->
<!--                                <v-text-field class="pr-1" :readonly="isReadOnly" dense v-model="item.name"/>-->
<!--                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value"/>-->
<!--                            </template>-->
<!--                        </multi-field-list>-->
<!--                    </div>-->
<!--                    <div class="d-flex flex-column justify-end col-12 pa-0 col-sm-6 mt-auto">-->
<!--                        <multi-field-list-->
<!--                            label="컨텐츠 포맷"-->
<!--                            class="caption indigo&#45;&#45;text accent-3"-->

<!--                            :items="[{name: '항목', value: '(spec json value)'}]"-->
<!--                            :readonly="isReadOnly"-->
<!--                        >-->
<!--                            <template v-slot:item={item}>-->
<!--                                <v-text-field class="pr-1" :readonly="isReadOnly" dense v-model="item.name"/>-->
<!--                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value"/>-->
<!--                            </template>-->
<!--                        </multi-field-list>-->
<!--                    </div>-->
                </div>
        </expansion-panel>
        <!--        -->

        <!-- CONTENT PACKAGE -->
        <expansion-panel label="Content Package" :readonly="isReadOnly" circle="green">
<!--                <v-select class="col-12 col-sm-4 px-0" label="테마" placeholder="일반광고상품1"/>-->

        </expansion-panel>
        <!--        -->

        <!-- HISTORY -->
        <expansion-panel label="수정이력" :value="true">
            <actions-table/>
        </expansion-panel>
        <!-- HISTORY & REVIEWS -->

<!--        &lt;!&ndash; REVIEWS &ndash;&gt;-->
<!--        <expansion-panel label="고객리뷰" :value="true">-->
<!--                <div class="d-flex flex-column mb-3">-->
<!--                    <div class="d-flex mb-5">-->
<!--                        <v-icon>mdi-tag-outline</v-icon>-->
<!--                        <v-chip-->
<!--                            class="my-2 mx-1" close close-icon="mdi-close" color="primary"-->
<!--                            v-for="(chip, index) in chips" :key="index">{{chip}}</v-chip>-->
<!--                    </div>-->
<!--                    <div class="d-flex flex-column" v-for="(review, index) in reviews" :key="index">-->
<!--                        <div class="d-flex justify-space-between">-->
<!--                            <p v-text="review.user1"/>-->
<!--                            <p v-text="review.user2"/>-->
<!--                        </div>-->
<!--                        <div class="d-flex justify-space-between ">-->
<!--                            <p class="text-caption grey&#45;&#45;text text&#45;&#45;darken-2" v-text="review.created"/>-->
<!--                            <div-->
<!--                                class="text-caption grey&#45;&#45;text text&#45;&#45;darken-2 ml-auto"-->
<!--                                v-text="'#' + item.tags.join(' #')"/>-->
<!--                        </div>-->
<!--                        <div class="text-justify">-->
<!--                            {{review.comment}}<v-divider/>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <v-btn outlined block>-->
<!--                    더보기-->
<!--                </v-btn>-->
<!--        </expansion-panel>-->
<!--        &lt;!&ndash;        &ndash;&gt;-->

<!--        <v-sheet v-if="isReadOnly" class="footer d-flex flex-column elevation-0 py-3 pr-3 px-sm-3">-->
<!--            <div class="d-flex pt-3">-->
<!--                <v-select label="기간" class="col-3 pa-0 mr-1" placeholder="20.12.01 20.12.31"/>-->
<!--                <v-select label="옵션" class="col-3 pa-0 ml-1" placeholder="기본"/>-->
<!--                <v-select label="금액" class="col-3 pa-0 ml-auto" placeholder="100,000원"/>-->
<!--            </div>-->
<!--            <div class="d-flex justify-space-between">-->
<!--                <v-btn-->
<!--                    class="text-h5 font-weight-bold col-6 rounded-0"-->
<!--                    style="color: blue;"-->
<!--                    outlined>장바구니</v-btn>-->
<!--                <v-btn-->
<!--                    class="text-h5 font-weight-bold col-6 rounded-0"-->
<!--                    style="background-color: blue"-->
<!--                    text-->
<!--                    dark>구매하기</v-btn>-->
<!--            </div>-->
<!--        </v-sheet>-->
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
            onClickContract() {
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
