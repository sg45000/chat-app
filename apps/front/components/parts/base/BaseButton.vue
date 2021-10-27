<template>
  <v-btn
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    {{label}}
    <slot />
  </v-btn>
</template>

<script lang="ts">
import {PropOptions} from 'vue';
import CustomVue from '../../../custom';
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
