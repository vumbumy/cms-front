<template>
    <v-alert
        v-if="message != null && message !== ''"

        class="mb-0"
        dense
        outlined
        type="error"
        dismissible
    >
        <div v-html="message"/>
    </v-alert>
</template>

<script>
    export default {
        props: {
            message: String
        },
        data: () => ({})
    }
</script>

<style scoped>

</style>
