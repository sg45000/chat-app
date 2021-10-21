<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="lastname"
            :rules="rules.username"
            :counter="10"
            label="姓"
          >

          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="firstname"
            :rules="rules.username"
            :counter="10"
            label="名"
          >

          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="mail"
            :rules="rules.mail"
            label="メールアドレス"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="password"
            :rules="rules.password"
            :counter="12"
            label="パスワード"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-row-reverse">
          <v-btn
            class="mr-4"
            @click="login"
          >
            ログイン
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import CustomVue from '~/custom';
import {gqlClientSdk} from '~/plugins/graphql/client';

interface Data {
  lastname: string,
  firstname: string,
  mail: string,
  password: string,
  rules: {
    mail: ((v:string)=>boolean|string)[],
    username: ((v:string)=>boolean|string)[],
    password: ((v:string)=>boolean|string)[],
  }
}
export default CustomVue.extend({
  name: 'login',
  data(): Data {
    return {
      lastname : '',
      firstname: '',
      mail     : '',
      password : '',
      rules    : {
        mail: [
          (v: string) => !!v || 'メールアドレスを入れてください。'
        ],
        username: [
          (v: string) => !!v || 'ユーザ名を入れてください。'
        ],
        password: [
          (v: string) => !!v || 'パスワードを入れてください。'
        ]
      }
    };
  },
  methods: {
    async login() {
      const response = await gqlClientSdk.signup(
        {
          lastname : this.lastname,
          firstname: this.firstname,
          password : this.password,
          mail     : this.mail,
        }
      );
      console.log(response);
    }
  }
});
</script>

<style scoped>

</style>
