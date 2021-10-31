<template>
  <SignupForm v-model="formValues" @send="signup">
  </SignupForm>
</template>

<script lang="ts">
import CustomVue from '~/custom';
import {gqlClientSdk} from '~/plugins/graphql/client';
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
      try {
        const response = await gqlClientSdk.signup(
          {
            lastname : this.formValues.values.lastname,
            firstname: this.formValues.values.firstname,
            password : this.formValues.values.password,
            mail     : this.formValues.values.mail,
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
