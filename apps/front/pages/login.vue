<template>
  <login-form v-model="formValues" @send="login">
  </login-form>
</template>

<script lang="ts">
import CustomVue from '~/custom';
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
      const response = await this.$graphql.login(
        this.formValues.values.mail,
        this.formValues.values.password
      );
      if(response.isFailure()) {
        alert(response.value.message);
        return;
      }
      this.$accessor.auth.updateLoginInfo(response.value);
      this.$router.push('room');
    }
  }
});
</script>

<style scoped>

</style>
