<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
           v-model="username"
           :rules="rules.username"
           :counter="10"
           label="ユーザ名"
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

interface Data {
  username: string,
  password: string,
  rules: {
    username: ((v:string)=>boolean|string)[],
    password: ((v:string)=>boolean|string)[],
  }
}
export default CustomVue.extend({
  name: "login",
  data(): Data {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          (v: string) => !!v || 'ユーザ名を入れてください。'
        ],
        password: [
          (v: string) => !!v || 'パスワードを入れてください。'
        ]
      }
    }
  },
  methods: {
    async login() {
      console.log(this.username + this.password);
    }
  }
})
</script>

<style scoped>

</style>
