<template>
    <div class="d-flex my-3" @click="readonly ? null : index = (index + 1) % steps.length">
        <v-sheet :class="steps[index].classes" class="font-weight-bold" v-text="steps[index].name"/>
        <v-sheet class="flex-grow-1 grey lighten-2"/>
    </div>
</template>

<script>
    export default {
        props: {
            readonly: Boolean
        },
        data: () => ({
            index: 0,
            steps: [
                {name: "생성", classes: ['col-12', 'pa-1', 'grey', 'lighten-2', 'text-left']},
                {name: "주문확정", classes: ['col-3', 'pa-1', 'blue', 'darken-4', 'text-right', 'theme--dark']},
                {name: "제작중", classes: ['col-6', 'pa-1', 'blue', 'darken-4', 'text-right', 'theme--dark']},
                {name: "게첨중", classes: ['col-9', 'pa-1', 'blue', 'darken-4', 'text-right', 'theme--dark']},
                {name: "종료", classes: ['col-12', 'pa-1', 'blue', 'darken-4', 'text-right', 'theme--dark']},
                {name: "완료", classes: ['col-12', 'pa-1', 'grey', 'lighten-2', 'text-right']},
            ]
        })
    }
</script>

<style scoped>

</style>
