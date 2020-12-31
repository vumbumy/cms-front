<template>
    <div class="d-flex" style="border: 1px solid grey" >
        <v-img
            :src="`https://picsum.photos/500/300?image=1`"
            :lazy-src="`https://picsum.photos/10/6?image=1`"
            aspect-ratio="1"
            class="grey lighten-2 col-5 pa-0"
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
        <div class="col-5 pa-0">
            <v-row no-gutters>
                <v-col v-for="n in 4" :key="n" class="d-flex child-flex" cols="6">
                    <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + index}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + index}`"
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
        </div>
        <div class="col-2 pa-0 d-flex flex-column">
            <div class="flex-grow-1 d-flex align-center">
                <div class="flex-grow-1 align-center">
                    5 IMAGES
                </div>
            </div>
            <div class="d-flex flex-column flex-grow-1">
                <v-btn text class="flex-grow-1">
                    EDIT
                </v-btn>
                <v-btn text class="flex-grow-1">
                    ADD
                </v-btn>
                <div class="d-flex justify-space-around">
                    <v-btn text icon @click="index -= 1"><v-icon>mdi-chevron-left</v-icon></v-btn>
                    <v-btn text icon @click="index += 1"><v-icon>mdi-chevron-right</v-icon></v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            index: 0
        })
    }
</script>
