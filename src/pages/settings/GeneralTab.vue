<template>
    <v-container>
        <v-row>
            <v-col>
                <strong>언어 / 지역</strong>
                <v-divider/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-radio-group v-model="radioGroup" row class="my-0 py-0">
                    <v-radio label="한국어"/>
                    <v-radio label="영어"/>
                </v-radio-group>
                <v-radio-group class="my-0 py-0">
                    <v-radio :label="timeInfo()"/>
                </v-radio-group>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <strong>스마트메뉴</strong>
                <v-divider/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-checkbox class="my-0 py-0" label="광고주"/>
            </v-col>
            <v-col>
                <v-checkbox class="my-0 py-0" label="매체사"/>
            </v-col>
            <v-col>
                <v-checkbox class="my-0 py-0" label="쿠폰 발행"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <strong>스타일 / 색상</strong>
                <v-divider/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-select
                        :items="items"
                        label="테마"
                ></v-select>
            </v-col>
            <v-col>
                <v-select
                        :items="items"
                        label="글자크기"
                ></v-select>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            radioGroup: 0,
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        }),
        methods:{
           timeInfo: function () {
               let stringArr = new Date().toString().split(' ')

               return stringArr.slice(5).join()
           }
        }
    }

</script>