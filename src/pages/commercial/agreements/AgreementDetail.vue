<template>
    <div class="d-flex flex-column">
        <close-edit-save
            class="header"
            v-model="mode"
            v-on:save="onClickSave"
            v-on:delete="onClickDelete"
        />
        <v-tabs v-model="tab" class="mb-2">
            <v-tab
                v-for="(value, key) in tabs"
                :key="key"
                v-text="value"
            />
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item key="agreement">
                <agreement-form :readonly="isReadOnly"/>
            </v-tab-item>
            <v-tab-item key="template">
                <template-form :readonly="isReadOnly"/>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
    import CloseEditSave from "../../../components/CloseEditSave";
    import {dateToDateTime} from "../../../scripts/util";
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../../../scripts/const";
    import AgreementForm from "./forms/AgreementForm";
    import TemplateForm from "./forms/TemplateForm";

    export default {
        components: {
            TemplateForm,
            AgreementForm,
            CloseEditSave,
        },
        props: {
            value: Object
        },
        data: () => ({
            tab: null,
            tabs: {
                agreement: '게약만들기',
                template: '게약양식만들기'
            },
            mode: READ_MODE,
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

</style>
