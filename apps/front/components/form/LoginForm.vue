<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col>
          <LazyBaseInputText
            v-model="form.values.mail"
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
            v-model="form.values.password"
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
            :disabled="!form.valid"
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
import CustomVue from '@/custom';
import {FormValues} from '~/types/form';
export interface LoginFormValues {
  mail: string;
  password: string;
}
interface Data {
  form : FormValues<LoginFormValues>,
  rules: {
    mail: any,
    password: any
  }
}
export default CustomVue.extend({
  name: 'LoginForm',
  data: (): Data => ({
    form: {
      valid : false,
      values: {
        mail    : '',
        password: '',
      }
    },
    rules: {
      mail: [
        (v: string) => !!v || 'メールアドレスを入れてください。'
      ],
      password: [
        (v: string) => !!v || 'パスワードを入れてください。',
        (v: string) => v.length >= 8 || '8文字以上を設定してください。'
      ]
    },
  }),
  methods: {
    emitValues() {
      const formValues: FormValues<LoginFormValues> = {
        values: {
          mail    : this.form.values.mail,
          password: this.form.values.password,
        },
        valid: this.form.valid,
      };
      this.$emit('input', formValues);
    },
    send() {
      console.log('send');
      this.$emit('send');
    }
  },
  computed: {
    valid: {
      get(): boolean {
        return this.form.valid;
      },
      set(v: boolean): void {
        this.form.valid = v;
      }
    },
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
  watch: {
    form: {
      handler () {
        this.emitValues();
      },
      deep     : true,
      immediate: true,
    },
  },
});
</script>

<style scoped>

</style>
