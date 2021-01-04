<template>
    <div v-if="messages !== null && messages.length !== 0 ">
        <v-alert
            v-for="(msg, index) in messages"
            :key="index"

            type="warning"
            border="left"
            class="mb-2"

            dense
            outlined
            dismissible
        >
            <div v-html="msg"/>
        </v-alert>
    </div>
</template>

<script>
    export default {
        props: {
            messages: Array
        }
    }
</script>

<style scoped>

</style>
