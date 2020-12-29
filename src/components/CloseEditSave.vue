<template>
    <div class="d-flex">
        <v-btn @click="onClickReturn" text icon>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn text icon class="ml-auto" v-if="!isAddMode && !isEditMode"  @click="onClickEdit">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <div v-else class="ml-auto">
            <v-btn text icon @click="onClickClose">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn text icon @click="onClickSave">
                <v-icon>mdi-content-save</v-icon>
            </v-btn>
        </div>
        <v-btn text icon v-if="!isAddMode">
            <v-btn text icon @click="onClickDelete">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-btn>
    </div>
</template>

<script>
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../scripts/const";

    export default {
        props: {
            value: Number
        },
        data: () => ({
            mode: READ_MODE
        }),
        created() {
            this.mode = this.value
        },
        watch: {
            value(){
                this.mode = this.value
            }
        },
        computed: {
            isEditMode(){
                return this.mode === EDIT_MODE
            },
            isAddMode(){
                return this.mode === Add_MODE
            },
        },
        methods: {
            onClickReturn: function () {
                this.$router.replace({'query': null});
            },
            onClickClose: function () {
                this.mode = READ_MODE
                this.$emit('input', READ_MODE)
            },
            onClickEdit: function(){
                this.mode = EDIT_MODE
                this.$emit('input', EDIT_MODE)
            },
            onClickSave: function(){
                this.mode = READ_MODE
                this.$emit('input', READ_MODE)
                this.$emit('save')
            },
            onClickDelete: function(){
                this.$router.replace({'query': null});
                this.$emit('delete')
            }
        }
    }
</script>

<style scoped>

</style>
