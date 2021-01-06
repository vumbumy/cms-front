<template>
    <div class="d-flex flex-column">
        <top-contents
            :readonly="readonly"

            :updated="Date.parse('2020-12-13')"
            :created="Date.parse('2020-12-01')"
        >
            <v-text-field
                label="계약양식명"

                class="text-h4 font-weight-bold pb-0"

                v-model="item.title"
                :readonly="readonly"
                messages="HINT"
            />
            <!--            <v-input label="계약양식명">-->
            <!--                <input type="text" v-model="item.title">-->
            <!--            </v-input>-->
        </top-contents>
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
                title: "일반광고계약template1",
                tags: ["의정부", "디지털특가", "21년 신규"],
            },
        })
    }
</script>

<style lang="scss" scoped>

</style>
