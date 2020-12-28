<template>
    <v-stepper>
        <v-stepper-header>
            <v-stepper-step
                step="3"
                complete
            >
                생성
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                step="4"
                :rules="[() => false]"
            >
                제작 중
                <small>Alert message</small>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                step="5"
            >
                게첨 중
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="6">
                종료
            </v-stepper-step>

            <v-stepper-step step="7">
                완료
            </v-stepper-step>
        </v-stepper-header>
    </v-stepper>
</template>

<script>
    export default {
        name: "Stepper"
    }
</script>

<style scoped>

</style>
