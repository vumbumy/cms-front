<template>
    <v-row no-gutters>
        <v-col cols="5">
            <v-img
                :src="`https://picsum.photos/500/300?image=1`"
                :lazy-src="`https://picsum.photos/10/6?image=1`"
                aspect-ratio="1"
                class="grey lighten-2 pa-0"
            >
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                        ></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-col>
        <v-col cols="5">
            <v-row no-gutters>
                <v-col v-for="n in 4" :key="n" class="d-flex child-flex" cols="6">
                    <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                            aspect-ratio="1"
                            class="grey lighten-2 pa-0"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                    class="fill-height ma-0"
                                    align="center"
                                    justify="center"
                            >
                                <v-progress-circular
                                        indeterminate
                                        color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="2" style="border: 3px solid">

        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Photo"
    }
</script>
