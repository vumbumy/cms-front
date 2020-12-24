<template>
    <v-list-item>
        <v-list-item-icon class="mr-2" >
            <v-icon size="20">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle class="text-left" v-text="$t('logout')"/>
    </v-list-item>
</template>

<script>
    export default {
        name: "LogOut"
    }
</script>

<style scoped>

</style>
