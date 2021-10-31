<template>
  <v-form>
    <v-container>
      <v-row>
        <v-text-field
          v-model="name"
          :rules="rules.name"
          :counter="25"
          label="トークルーム名"
        >
        </v-text-field>
      </v-row>
    </v-container>
    <v-button>
    </v-button>
  </v-form>
</template>

<script lang="ts">
import CustomVue from '~/custom';
import {roomRules} from '~/rules/room.rules';
interface Data {
  name: string;
  rules: {
    name: ((v:string) => string | boolean)[],
  }
}
export default CustomVue.extend({
  name: 'room/new',
  data(): Data  {
    return {
      name : '',
      rules: {
        name: [
          roomRules.validNameLength,
        ]
      }
    };
  },
  async created() {
  },
  methods: {
  }
});
</script>

<style scoped>

</style>
