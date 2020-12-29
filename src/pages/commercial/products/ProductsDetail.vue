<template>
    <div class="d-flex flex-column">
        <close-edit-save v-model="mode"/>
        <v-sheet class="pl-4 my-2 d-flex" style="border-left: 10px solid orange;">
            <div class="d-flex flex-column text-left">
                <div class="text-h5 text-sm-h4">
                    <strong>디지털01-의정부</strong>
                </div>
                <div class="text-h6 text-sm-h5 grey--text text--darken-2">
                    <strong>나임의 정부</strong>
                </div>
            </div>
            <div class="ml-auto d-flex flex-column text-right">
                <div class="caption">
                    19.08.04 14:41
                </div>
                <div class="caption grey--text text--darken-2">
                    19.07.14 13:23
                </div>
                <permissions class="mt-1 mt-auto"/>
            </div>
        </v-sheet>
        <div class="d-flex flex-column">
            <div class="d-flex">
                <div class="caption grey--text text--darken-2 text-truncate">
                    https://naim.ai/products/uj10-21
                </div>
                <div class="caption grey--text text--darken-2 ml-auto text-truncate">
                    #의정부 #디지털특가 #21년 신규
                </div>
            </div>
            <v-divider class="grey"/>
            <div class="d-flex justify-space-between flex-wrap text-left">
                <div class="d-flex col-4">
                    <div class="d-flex flex-column">
                        <div class="text-subtitle-1 text-sm-h7 font-weight-bold">재고</div>
                        <div class="text-h5 text-sm-h3 mt-auto">2</div>
                    </div>
                    <div class="text-h5 text-sm-h3 mx-1 mt-auto">/</div>
                    <div class="d-flex flex-column">
                        <div class="text-subtitle-1 text-sm-h7 font-weight-bold">수량</div>
                        <div class="text-h5 text-sm-h3 mt-auto">10</div>
                    </div>
                </div>
                <div class="d-flex col-4">
                    <div class="d-flex flex-column">
                        <div class="text-subtitle-1 text-sm-h7 font-weight-bold">가격</div>
                        <div class="text-h5 text-sm-h3 font-weight-bold mt-auto">100</div>
                    </div>
                    <div class="mt-auto ml-1 mt-auto">만원/월</div>
                </div>
                <div class="d-flex flex-column col-3">
                    <div class="text-subtitle-1 text-sm-h7 font-weight-bold">기간</div>
                    <div class="text-caption font-weight-medium mt-auto">20/10/01 20/12/31</div>
                </div>
            </div>
            <stepper class="mb-3"/>
            <photo class="mb-2"/>
            <v-expansion-panels
                v-model="panel"
                multiple
                flat
            >
                <v-expansion-panel>
                    <v-expansion-panel-header>
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
                                <v-text-field :readonly="isReadOnly" label="볼륨할인율" value="15%" suffix="200만원 이상"/>
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
                    <v-expansion-panel-header>
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
        </div>
    </div>
</template>

<script>
    import Photo from "../../../components/Photo";
    import CloseEditSave from "../../../components/CloseEditSave";

    // import Permissions from "../../../components/Permissions";
    import {dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../../../scripts/const";
    import Permissions from "../../../components/Permissions";
    import Stepper from "../../../components/Stepper";

    export default {
        components: {
            Stepper,
            Permissions,
            // Permissions,
            CloseEditSave,
            Photo},
        data: () => ({
            dialog: true,
            tabs: ['ses x', 'ses y' ,'ses z'],
            mode: READ_MODE,
            panel: [0, 1]
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
        },
        methods: {
            updateMode(){
                if(this.$route.query.id === '0')
                    this.mode = Add_MODE
                else
                    this.mode = READ_MODE
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
