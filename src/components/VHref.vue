<template>
    <v-btn :to="to ? to : null" :href="href ? href : null" :icon="!label" :text="label" class="pa-0">
        <div v-if="label" :class="textClass" v-text="href"/>
        <v-icon color="indigo" :size="size">mdi-arrow-top-right</v-icon>
    </v-btn>
</template>

<script>
    export default {
        props: {
            size: String,
            href: String,
            textClass: String,
            label: Boolean,
            to: Object
        }
    }
</script>

<style scoped>

</style>
