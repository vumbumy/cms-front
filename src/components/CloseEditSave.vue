<template>
    <v-row no-gutters>
        <v-col class="text-left">
            <v-btn @click="onClickClose" text icon>
                <v-icon v-if="$vuetify.breakpoint.xs">mdi-arrow-left</v-icon>
                <div v-else>닫기</div>
            </v-btn>
        </v-col>
        <v-col class="text-right">
            <v-btn text icon>저장</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        methods: {
            onClickClose: function () {
                this.$router.replace({'query': null});
            },
        }
    }
</script>

<style scoped>

</style>