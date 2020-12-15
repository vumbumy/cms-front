<template>
    <v-main style="background: skyblue" class="my-0 py-8">
        <v-row style="background: lightgray">
            <v-col>
                <router-view style="background: darkseagreen"/>
            </v-col>
            <v-col :class="{'v-overlay': this.$vuetify.breakpoint.mdAndDown}">
                <router-view v-if="false" name="detail" style="background: moccasin"/>
            </v-col>
        </v-row>
    </v-main>
</template>

<script>
  export default {
      components: {},
  }
</script>

<style lang="scss" scoped>
    .v-overlay{
        position: absolute;
    }
</style>