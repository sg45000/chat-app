<template>
  <SignupForm v-model="formValues" @send="signup">
  </SignupForm>
</template>

<script lang="ts">
import CustomVue from '~/custom';
import {FormValues} from '~/types/form';
import {SignupFormValues} from '~/components/form/SignupForm.vue';

interface Data {
  formValues : FormValues<SignupFormValues>;
}
export default CustomVue.extend({
  name: 'signup',
  data: (): Data => ({
    formValues: {
      valid : false,
      values: {
        lastname : '',
        firstname: '',
        mail     : '',
        password : '',
      },
    }
  }),
  methods: {
    async signup() {
      const response = await this.$graphql.signup(
        this.formValues.values.firstname,
        this.formValues.values.lastname,
        this.formValues.values.mail,
        this.formValues.values.password,
      );
      if(!response) {
        alert('ユーサー登録に失敗しました。');
        return;
      }
      this.$accessor.auth.updateLoginInfo(response);
    }
  }
});
</script>

<style scoped>

</style>
