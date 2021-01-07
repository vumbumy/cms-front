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
    </div>
</template>

<script>
    import TopContents from "../../../../components/layouts/TopContents";
    export default {
        components: {TopContents},
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
