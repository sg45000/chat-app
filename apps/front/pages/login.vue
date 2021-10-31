<template>
  <login-form v-model="formValues" @send="login">
  </login-form>
</template>

<script lang="ts">
import CustomVue from '~/custom';
import {gqlClientSdk} from '~/plugins/graphql/client';
import {FormValues} from '~/types/form';
import {LoginFormValues} from '~/components/form/LoginForm.vue';

interface Data {
  formValues : FormValues<LoginFormValues>;
}
export default CustomVue.extend({
  name: 'login',
  data: (): Data => ({
    formValues: {
      valid : false,
      values: {
        mail    : '',
        password: '',
      },
    }
  }),
  methods: {
    async login() {
      try {
        const response = await gqlClientSdk.login(
          {
            password: this.formValues.values.password,
            mail    : this.formValues.values.mail,
          }
        );
        console.log(response);
      } catch (e) {
        console.error(e);
        alert(e);
      }
    }
  }
});
</script>

<style scoped>

</style>
