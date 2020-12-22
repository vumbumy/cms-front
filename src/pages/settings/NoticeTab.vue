<template>
    <v-container>
        <v-row dense>
            <v-col cols="6">
                <v-checkbox class="my-0 py-0">
                    <template v-slot:label>
                        <strong>PUSH 알림</strong>
                    </template>
                </v-checkbox>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="6">
                <v-checkbox class="my-0 pt-1 pb-0" >
                    <template v-slot:label>
                        <strong>ADMIN 알림</strong>
                    </template>
                </v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-select class="my-0 py-0" :items="adminItems" v-model="admin"/>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="6">
                <v-checkbox class="my-0 pt-1 py-0" >
                    <template v-slot:label>
                        <strong>마케팅 이메일/문자</strong>
                    </template>
                </v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-select class="my-0 py-0" :items="marketingItems" v-model="marketing"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            admin: '보통',
            adminItems: ['보통'],
            marketing: '필수',
            marketingItems: ['필수'],
        }),
        methods:{
           timeInfo: function () {
               let stringArr = new Date().toString().split(' ')

               return stringArr.slice(5).join()
           }
        }
    }

</script>