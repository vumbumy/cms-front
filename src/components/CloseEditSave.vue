<template>
    <v-sheet class="d-flex align-center fill-height">
        <v-btn @click="onClickReturn" text icon>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn text icon class="ml-auto" v-if="!isAddMode && !isEditMode"  @click="toEditMode">
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
    </v-sheet>
</template>

<script>
    import {Add_MODE, EDIT_MODE, READ_MODE} from "../scripts/const";
    import EventBus from "../plugins/eventBus";

    export default {
        props: {
            value: Number
        },
        data: () => ({
            mode: READ_MODE
        }),
        created() {
            this.mode = this.value

            EventBus.$on('saved', this.toReadMode)
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
            entity(){
                return this.$route.name.split(':')[0]
            },
        },
        methods: {
            onClickReturn: function () {
                this.$router.push({name: this.entity}).catch(() => {});
            },
            onClickClose: function () {
                if(this.isAddMode){
                    this.onClickReturn()

                    return
                }

                this.toReadMode()
            },
            toEditMode: function(){
                this.mode = EDIT_MODE
                this.$emit('input', EDIT_MODE)
            },
            onClickSave: function(){
                this.$emit('save')
            },
            onClickDelete: function(){
                this.$router.push({query: null});
                this.$emit('delete')
            },
            toReadMode(){
                this.mode = READ_MODE
                this.$emit('input', READ_MODE)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
