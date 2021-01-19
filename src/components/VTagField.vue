<template>
    <div>
        <div
            v-if="readonly && tagArr.length > 0"
            class="text-caption grey--text text--darken-2 ml-auto text-truncate"
            v-text="'#' + tagArr.join(' #')"
        />
        <v-text-field
            v-else-if="!readonly"
            label="Hashtags"
            v-model="tagArr"
            @change="onChangeTags"
        />
    </div>
</template>

<script>
    import {getTagsName, setTags} from "../api/tags";
    import {removeDuplicates, removeWhiteSpace} from "../scripts/util";

    export default {
        props: {
            value: Array,
            readonly: Boolean
        },
        data: () => ({
            tagArr: null
        }),
        created() {
            this.tagArr = getTagsName(this.value)
        },
        watch: {
            value() {
                this.tagArr = getTagsName(this.value)
            }
        },
        methods: {
            onChangeTags(tags) {
                this.tagArr = tags.split(',')
                this.tagArr = removeDuplicates(this.tagArr)
                this.tagArr = removeWhiteSpace(this.tagArr)

                console.log(this.tagArr)

                this.$emit('input', setTags(this.tagArr))
            },
        }
    }
</script>

<style scoped>

</style>
