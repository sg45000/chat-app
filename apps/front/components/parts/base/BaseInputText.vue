<template>
  <v-text-field
    :rules="rules"
    :label="label"
    :disabled="disabled"
    :counter="counter"
    class="base-input-btn"
    v-model="inputValue"
  >
  </v-text-field>
</template>

<script lang="ts">
import Vue, {PropOptions} from 'vue';

export default Vue.extend({
  name : 'BaseInputText',
  props: {
    value: {
      type    : String,
      required: false
    } as PropOptions<string>,
    disabled: {
      type   : Boolean,
      default: false,
    } as PropOptions<boolean>,
    label: {
      type    : String,
      required: false,
    } as PropOptions<string>,
    rules: {
      type    : Array,
      required: false,
    } as PropOptions<Array<Function>>,
    counter: {
      type    : Number,
      required: false,
    } as PropOptions<number>,
  },
  computed: {
    inputValue: {
      get(): string {
        return this.value;
      },
      set(value: string) {
        this.$emit('input', value);
      }
    }
  },
});
</script>

<style scoped>
  .base-input-btn {
  }
</style>
