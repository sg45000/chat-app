<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <LazyBaseInputText
            v-model="form.mail"
            :rules="rules.mail"
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
            :rules="rules.password"
            :counter="16"
            label="パスワード"
          >
          </LazyBaseInputText>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-row-reverse">
          <LoginSendButton
            class="mr-4"
            :form="disabled"
            :disabled="!canSend"
            @click="send"
          >
          </LoginSendButton>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import {PropOptions} from 'vue';
import CustomVue from '../../custom';
import {FormValues} from '~/types/form';
export interface LoginFormValues {
  mail: string;
  password: string;
}
interface Data {
  form : LoginFormValues,
  rules: {
    mail: any,
    password: any
  }
}
export default CustomVue.extend({
  name: 'LoginForm',
  data: (): Data => ({
    form: {
      mail    : '',
      password: '',
    },
    rules: {
      mail: [
        (v: string) => !!v || 'メールアドレスを入れてください。'
      ],
      password: [
        (v: string) => !!v || 'パスワードを入れてください。'
      ]
    },
  }),
  methods: {
    emitValues() {
      const formValues: FormValues<LoginFormValues> = {
        values: {
          mail    : this.form.mail,
          password: this.form.password,
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
      return !!this.form.mail.length && !!this.form.password.length;
    }
  },
  props: {
    value: {
      type    : Object,
      required: true,
    } as PropOptions<FormValues<LoginFormValues>>,
    disabled: {
      type   : Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
});
</script>

<style scoped>

</style>
