<template>
    <v-sheet class="d-flex flex-column" :min-width="detailMinWidth">
        <close-edit-save
            class="header"
            v-model="mode"
            v-on:save="onClickSave"
            v-on:delete="onClickDelete"
        />

        <v-form ref="form">
            <!-- TOP CONTENTS -->
            <top-contents
                :readonly="isReadOnly"
                :updated="Date.parse('2020-12-13')"
                :created="Date.parse('2020-12-01')"
            >
                <div v-if="isReadOnly">
                    <div class="text-h5 text-sm-h4 font-weight-bold" v-text="product.name"/>
                    <div class="text-h6 text-sm-h5 font-weight-bold" v-text="categoryName"/>
                </div>
                <div v-else>
                    <v-text-field
                        label="이름"
                        class="text-h5 text-sm-h4 font-weight-bold"

                        v-model="product.name"
                    />
                    <addable-select
                        text-label="카테고리"
                        text-class="text-h6 text-sm-h5 font-weight-bold"

                        :items="categories"
                        item-value="no"
                        item-text="name"
                        v-model="product.categoryNo"
                        @append="onClickCategoryAppend"
                    />
                </div>
            </top-contents>
            <!--        -->

            <!-- TOP UNDER CONTENTS -->
            <div class="d-flex justify-space-between align-center">
<!--                <div v-if="isReadOnly" class="caption grey&#45;&#45;text text&#45;&#45;darken-2 text-truncate" v-text="productUrl"/>-->
                <v-href v-if="isReadOnly" label text-class="text-caption" :href="productUrl" size="15px"/>
                <v-text-field v-else class="flex-grow-0" label="SKU" :prefix="PRODUCT_SKU_PREFIX" v-model="product.sku" :rules="[rules.required]"/>
                <v-hashtag-field :readonly="isReadOnly" v-model="product.tags"/>
            </div>
            <v-divider class="grey"/>
            <!--        -->

            <!-- HEAD CONTENTS -->
            <div class="d-flex justify-space-between">
                <div class="d-flex col-3 pb-0 px-0">
                        <v-text-field label="재고" :readonly="isReadOnly" class="text-h5 text-sm-h3 font-weight-bold" v-model="product.stock"/>
                    <div class="text-h5 text-sm-h3 mt-auto mb-7 mb-sm-8 mx-1">/</div>
                        <v-text-field label="수량" :readonly="isReadOnly" class="text-h5 text-sm-h3 font-weight-bold" v-model="product.amount"/>
                </div>
                <div class="d-flex col-4 pb-0 px-0">
                    <v-text-field label="가격" :readonly="isReadOnly" class="text-h5 text-sm-h3 font-weight-bold" v-model="product.price"/>
                    <div class="mt-auto ml-1 mb-7 mb-sm-9 text-no-wrap">만원/월</div>
                </div>
                <div class="d-flex flex-column col-4 pb-0 px-0 text-right">
                    <date-field bold :readonly="isReadOnly" label="기간" v-model="product.dates1"/>
                </div>
            </div>
            <!--        -->

            <stepper class="mb-3"/>
            <photo class="mb-2"/>

            <!-- ADVANCED -->
            <expansion-panel label="Advanced" :value="true">
                <div class="d-flex justify-space-between flex-wrap">
                    <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0 mb-auto">
                        <v-text-field :readonly="isReadOnly" label="계약서" value="DIGI-01001(D01클래스)"/>
                        <v-text-field :readonly="isReadOnly" label="상품타입1" value="일반"/>
                        <v-text-field :readonly="isReadOnly" label="환불보상조건" value="일반"/>
                    </div>
                    <div class="d-flex flex-column col-12 col-sm-4 py-0 pl-0">
                        <v-text-field :readonly="isReadOnly" label="정가" value="1500000" suffix="만원/월" class="flex-grow-0"/>
                        <multi-field-list
                            label="볼륨할인율"
                            class="text-caption"

                            :items="discounts"
                            :readonly="isReadOnly"
                            v-on:append="discounts.push({name: '', value: ''})"
                            v-on:delete="index => discounts.splice(index, 1)"
                        >
                            <template v-slot:item={item}>
                                <v-text-field :readonly="isReadOnly" dense class="pr-1" v-model="item.name"/>
                                <v-text-field :readonly="isReadOnly" dense class="pl-1" v-model="item.value" suffix="만원이상"/>
                            </template>
                        </multi-field-list>
                        <multi-field-list
                            label="옵션"
                            class="text-caption"

                            :items="options"
                            :readonly="isReadOnly"
                            v-on:append="options.push({name: '', value: ''})"
                            v-on:delete="index => options.splice(index, 1)"
                        >
                            <template v-slot:item={item}>
                                <v-text-field class="pr-1" :readonly="isReadOnly" dense v-model="item.name"/>
                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value"/>
                            </template>
                        </multi-field-list>
                    </div>
                    <div class="d-flex flex-column col-12 col-sm-4 ml-auto py-0 pl-0 mb-auto">
                        <date-field :readonly="isReadOnly" label="상품 노출 기간" :value="['2020-07-01', '2020-11-30']"/>
                        <v-text-field :readonly="isReadOnly" label="최소판매기간" value="Week"/>
                        <v-text-field :readonly="isReadOnly" label="입금형식" value="선입/할부/후불/가능"/>
                    </div>
                </div>

            </expansion-panel>

            <!-- CONTENT PACKAGE -->
            <expansion-panel label="Content Package" :value="true">

                <div class="d-flex justify-space-between flex-wrap">
                    <div class="d-flex flex-column col-12 col-sm-5 pa-0">
                        <div class="d-flex">
                            <v-text-field :readonly="isReadOnly" label="접수마감" value="04"/>
                            <div class="text-left mt-2 ml-5">시작일<br>일전</div>
                        </div>
                        <multi-field-list
                            label="매체"
                            class="caption indigo--text accent-3"

                            :items="[{name: 'UJ-DID(의정부경전철)', value: '(spec json value)'}]"
                            :readonly="isReadOnly"
                        >
                            <template v-slot:item={item}>
                                <v-text-field class="pr-1" :readonly="isReadOnly" dense v-model="item.name"/>
                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value"/>
                            </template>
                        </multi-field-list>
                    </div>
                    <div class="d-flex flex-column justify-end col-12 pa-0 col-sm-6 mt-auto">
                        <multi-field-list
                            label="컨텐츠 포맷"
                            class="caption indigo--text accent-3"

                            :items="[{name: '항목', value: '(spec json value)'}]"
                            :readonly="isReadOnly"
                        >
                            <template v-slot:item={item}>
                                <v-text-field class="pr-1" :readonly="isReadOnly" dense v-model="item.name"/>
                                <v-text-field class="pl-1" :readonly="isReadOnly" dense v-model="item.value"/>
                            </template>
                        </multi-field-list>
                    </div>
                </div>
            </expansion-panel>
            <!--        -->

            <!-- WEB PAGE -->
            <expansion-panel
                v-if="(isReadOnly && product.page) || !isReadOnly"
                label="웹페이지 보기"
                v-model="product.page"
                :readonly="isReadOnly"
                type="checkbox"
            >
<!--                <v-select class="col-12 col-sm-4 px-0" label="테마" placeholder="일반광고상품1"/>-->
<!--                <multi-field-list-->
<!--                    label="섹션 추가(html)"-->
<!--                    class="caption indigo&#45;&#45;text accent-3"-->
<!--                    :items="sections"-->
<!--                    :readonly="isReadOnly"-->

<!--                    v-on:append="sections.push({name: '', value: ''})"-->
<!--                    v-on:delete="index => sections.splice(index, 1)"-->
<!--                >-->
<!--                    <template v-slot:item={item}>-->
<!--                        <v-text-field class="col-2 py-0 pl-0" dense v-model="item.name"/>-->
<!--                        <v-textarea outlined dense v-model="item.value" :rows="2"/>-->
<!--                    </template>-->
<!--                </multi-field-list>-->
                <div v-if="isReadOnly" v-html="product.pageHtml"/>
                <v-textarea v-else label="HTML" v-model="product.pageHtml"/>
            </expansion-panel>
            <!--        -->

            <!-- HISTORY -->
            <expansion-panel label="수정이력" :value="true">
                <actions-table more/>
            </expansion-panel>
            <!--        -->

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
                                v-text="'#' + review.tags.join(' #')"/>
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
        </v-form>

        <v-sheet v-if="isReadOnly" class="footer d-flex flex-column">
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
        </v-sheet>
    </v-sheet>
</template>

<script>
    import Photo from "../../../components/Photo";
    import CloseEditSave from "../../../components/CloseEditSave";
    import {datesToString, dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, NEW_ITEM_ID, PRODUCT_SKU_PREFIX, READ_MODE} from "../../../scripts/const";
    import Stepper from "../../../components/Stepper";
    import TopContents from "../../../components/layouts/TopContents";
    import DateField from "../../../components/menus/DateField";
    import ActionsTable from "../../../components/tables/ActionsTable";
    import {SAMPLE_TEXT} from "../../../scripts/mock";
    import ExpansionPanel from "../../../components/layouts/ExpansionPanel";
    import MultiFieldList from "../../../components/layouts/MultiFieldList";
    import {deleteProduct, getProduct, newProduct, setProduct} from "../../../api/products";
    import {refresh, saved} from "../../../plugins/eventBus";
    import AddableSelect from "../../../components/menus/AddableSelect";
    import {getCategories} from "../../../api/categories";
    import VHashtagField from "../../../components/VTagField";
    import VHref from "../../../components/VHref";

    export default {
        components: {
            VHref,
            VHashtagField,
            AddableSelect,
            MultiFieldList,
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
            mode: READ_MODE,
            categories: [],

            product: newProduct(),
            sections: [
                {name: "설명", value: null},
                {name: "항목", value: null}
            ],
            options: [
                {name: '회룡역만', value: '+100000'},
            ],
            discounts: [{name: '15%', value: '200'}],
            chips: ["의정부", "디지털", "2020년 처음"],
            reviews: [
                {
                    user1: "vumbumy",
                    user2: "digi01",
                    created: "20.12.14 11:14:21",
                    tags: ["의정부 디지털"],
                    comment: SAMPLE_TEXT
                }
            ],
            rules: {
                required: value => !!value || 'Required.'
            },
            PRODUCT_SKU_PREFIX: PRODUCT_SKU_PREFIX,
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
            isEditMode(){
                return this.mode === EDIT_MODE
            },
            dates1(){
                return datesToString(this.product.dates1)
            },
            detailMinWidth(){
                if(this.$vuetify.breakpoint.smAndUp)
                    return 625

                return 0
            },
            categoryName() {
                let category = this.categories.find(c => c.no === this.product.categoryNo)
                if(category === undefined)
                    return ""

                return category.name
            },
            productUrl() {
                return PRODUCT_SKU_PREFIX + this.product.sku
            }
        },
        methods: {
            initialize(){
                this.categories = getCategories()

                let sku = this.$route.params.sku
                if(sku === NEW_ITEM_ID) {
                    this.mode = Add_MODE

                    this.product = newProduct()
                } else {
                    this.mode = READ_MODE

                    this.product = getProduct(sku)
                }
            },
            onChangeTags(tags) {
                this.product.tags = tags.split(',')
            },
            onClickSave() {
                if(this.product.sku == null || this.product.sku === "") {
                    // TODO: Validation (https://vuetifyjs.com/en/components/text-fields/#custom-colors)
                    alert("SKU IS EMPTY")

                    return
                }
                console.log(this.product)

                let sku = setProduct(this.product)
                this.$router.push({name: this.$route.name, params: {sku: sku}})
                    .catch(() => ({}))

                saved()
            },
            onClickDelete: function(){
                deleteProduct(this.product.sku)

                this.$router.push({name: 'products'})
                    .catch(() => ({}))

                refresh()
            },
            onClickCategoryAppend: function(){
                console.log('onClickCategoryAppend')
            },
            dateToDateTime: dateToDateTime,
        }
    }
</script>

<style lang="scss" scoped>

</style>
