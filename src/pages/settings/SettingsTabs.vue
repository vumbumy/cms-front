<template>
    <v-container fluid class="ma-0 py-0">
        <v-row dense :justify="justify">
            <v-col class="text-left" :cols="defaultCols">
                <v-sheet max-width="550" class="fill-height">
                    <div class="overline">LABEL</div>
                    <div class="headline font-weight-bold" v-text="$t(parent)"/>
                    <div class="subtitle-1 mb-4" v-text="$t($route.name)"/>

                    <v-alert class="mb-0" dense outlined type="error" dismissible>
                        <strong>Main Warning</strong> (Reminder)
                    </v-alert>
                    <v-tabs grow>
                        <v-tab
                                v-for="(tab, index) in tabs"
                                :key="index"
                                :to="`/settings/${tab.path}`"
                                v-text="$t(tab.path)"
                        />
                    </v-tabs>
                    <router-view/>
                </v-sheet>
            </v-col>
<!--            <v-col-->
<!--                    v-if="$route.query.id"-->
<!--                    class="fill-height"-->
<!--                    :cols="detailCols"-->
<!--                    :class="{detail: this.$vuetify.breakpoint.mdAndDown}"-->
<!--            >-->
<!--                <v-sheet elevation="5" class="fill-height" max-width="600">-->
<!--                    <router-view name="detail"/>-->
<!--                </v-sheet>-->
<!--            </v-col>-->
        </v-row>
    </v-container>
</template>

<script>
    import {searchChildren} from "../../menu";
    export default {
        data() {
            return {
                active_tab: 0,
                tabs: []
            };
        },
        created() {
            let children = searchChildren(this.parent)
            for(let child of children)
                if(child.path !== '') this.tabs.push(child)

            console.log(this.tabs)
        },
        computed: {
            parent(){
                return this.$route.matched[0].name
            },
            defaultCols() {
                if(this.$vuetify.breakpoint.lgAndUp)
                    return 6

                return 12
            },
            detailCols(){
                if(this.$vuetify.breakpoint.lgAndUp)
                    return 6
                else if(this.$vuetify.breakpoint.md)
                    return 7
                else if(this.$vuetify.breakpoint.sm)
                    return 10

                return 12
            },
            justify(){
                if(this.$vuetify.breakpoint.mdAndDown)
                    return 'end'

                return undefined
            }
        },
    }
</script>

<style lang="scss" scoped>
    $tab-font-size: map-deep-get('h2', 'subtitle-1', 'size') !default;

</style>