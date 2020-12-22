<template>
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
    >
        <v-row>
            <v-col cols="12" sm="6" class="pa-6">
                <v-text-field outlined
                        v-model="name"
                        :rules="nameRules"
                        label="이름"
                        required
                />

                <v-text-field
                        outlined
                        placeholder="user@example.com"
                        :rules="emailRules"
                        label="이메일"
                        required
                />

                <v-text-field
                        outlined
                        v-model="phoneNumber"
                        label="전화번호"
                        required
                />

<!--                <v-select-->
<!--                        v-model="select"-->
<!--                        :items="items"-->
<!--                        :rules="[v => !!v || 'Item is required']"-->
<!--                        label="Item"-->
<!--                        required/>-->
            </v-col>
            <v-col></v-col>
        </v-row>
<!--        <v-checkbox-->
<!--                v-model="checkbox"-->
<!--                :rules="[v => !!v || 'You must agree to continue!']"-->
<!--                label="Do you agree?"-->
<!--                required-->
<!--        ></v-checkbox>-->
<!--        <v-btn-->
<!--                :disabled="!valid"-->
<!--                color="success"-->
<!--                class="mr-4"-->
<!--                @click="validate"-->
<!--        >-->
<!--            Validate-->
<!--        </v-btn>-->

<!--        <v-btn-->
<!--                color="error"-->
<!--                class="mr-4"-->
<!--                @click="reset"-->
<!--        >-->
<!--            Reset Form-->
<!--        </v-btn>-->

<!--        <v-btn-->
<!--                color="warning"-->
<!--                @click="resetValidation"-->
<!--        >-->
<!--            Reset Validation-->
<!--        </v-btn>-->
    </v-form>
</template>

<script>
    export default {
        data: () => ({
            valid: true,
            name: 'Tester',
            nameRules: [
                v => !!v || 'Name is required'
            ],
            phoneNumber: '010-1234-5678',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
        }),

        methods: {
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
        },
    }
</script>