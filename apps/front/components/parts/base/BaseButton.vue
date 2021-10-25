<template>
  <v-btn
    :disabled="disabled"
  >
    {{label}}
    <slot />
  </v-btn>
</template>

<script lang="ts">
import CustomVue from '../../../custom';
import {PropOptions} from 'vue';
export default CustomVue.extend ({
  props: {
    disabled: {
      type   : Boolean,
      default: false,
    } as PropOptions<boolean>,
    label: {
      type    : String,
      required: false,
    } as PropOptions<string>,
  }
});
</script>

<style scoped>

</style>
