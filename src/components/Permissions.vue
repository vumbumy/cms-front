<template>
    <div class="d-flex flex-column text-left">
        <div class="text-caption font-weight-bold">전근권한</div>
        <div class="d-flex align-center">
            <div class="text-caption">읽기</div>
            <access-select :value="accesses[read]">
                <div v-for="(value, key) in accesses" :key="key" class="d-flex">
                    <v-btn text class="d-flex">
                        <v-icon v-text="value" class="mr-2"/>{{key}}
                    </v-btn>
                    <v-simple-checkbox class="ml-auto"/>
                </div>
                <v-btn class="d-flex justify-start" text>
                    <v-icon class="mr-2">mdi-plus</v-icon><div>ADD</div>
                </v-btn>
            </access-select>
            <div class="text-caption">쓰기</div>
            <access-select :value="accesses[write]">
                <div v-for="(value, key) in accesses" :key="key" class="d-flex">
                    <v-btn text class="d-flex">
                        <v-icon v-text="value" class="mr-2"/>{{key}}
                    </v-btn>
                    <v-simple-checkbox class="ml-auto"/>
                </div>
                <v-btn class="d-flex justify-start" text>
                    <v-icon class="mr-2">mdi-plus</v-icon><div>ADD</div>
                </v-btn>
            </access-select>
        </div>
    </div>
</template>

<script>
    import AccessSelect from "./menus/AccessSelect";
    export default {
        components: {AccessSelect},
        props: {
            item: Object,
            readonly: Boolean
        },
        data: () => ({
            accesses: {
                PUBLIC: 'mdi-earth',
                GROUP1: 'mdi-account-group',
                GROUP2: 'mdi-account-group',
                PRIVATE: 'mdi-lock',
            },
            read: 'PUBLIC',
            write: 'PRIVATE',
        })
    }
</script>

<style scoped>

</style>
