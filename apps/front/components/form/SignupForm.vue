<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <BaseInputText
            :counter="10"
            v-model="form.lastname"
            label="姓"
          >

          </BaseInputText>
        </v-col>
        <v-col>
          <BaseInputText
            :counter="10"
            v-model="form.firstname"
            label="名"
          >

          </BaseInputText>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <LazyBaseInputText
            v-model="form.mail"
            :counter="100"
            label="メールアドレス"
          >
          </LazyBaseInputText>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <LazyBaseInputText
            v-model="form.password"
            :counter="16"
            label="パスワード"
          >
          </LazyBaseInputText>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-row-reverse">
          <BaseButton
            class="mr-4"
            :form="disabled"
            :disabled="!canSend"
            @click="send"
            label="登録する"
          >
          </BaseButton>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import {PropOptions} from 'vue';
import CustomVue from '~/custom';
import {FormValues} from '~/types/form';
export interface SignupFormValues {
  lastname: string;
  firstname: string;
  mail: string;
  password: string;
}
interface Data {
  form : SignupFormValues,
}
export default CustomVue.extend({
  name: 'SignupForm',
  data: (): Data => ({
    form: {
      lastname : '',
      firstname: '',
      mail     : '',
      password : '',
    },
  }),
  methods: {
    emitValues() {
      const formValues: FormValues<SignupFormValues> = {
        values: {
          lastname : this.form.lastname,
          firstname: this.form.firstname,
          mail     : this.form.mail,
          password : this.form.password,
        },
        valid: true,
      };
      this.$emit('input', formValues);
    },
    send() {
      console.log('send');
      this.$emit('send');
    }
  },
  computed: {
    canSend (): boolean {
      return !!this.form.lastname && !!this.form.firstname && !!this.form.mail.length && !!this.form.password.length;
    }
  },
  props: {
    value: {
      type    : Object,
      required: true,
    } as PropOptions<FormValues<SignupFormValues>>,
    disabled: {
      type   : Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
});
</script>

<style scoped>

</style>
