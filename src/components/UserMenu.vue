<template>
    <v-list-item-group>
        <v-list-item to="/logout">
            <v-list-item-icon class="mr-2" >
                <v-icon size="20">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle class="text-left" v-text="$t('logout')"/>
        </v-list-item>
    </v-list-item-group>
</template>

<script>
    export default {
        data: () => ({})
    }
</script>

<style scoped>

</style>
