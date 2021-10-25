<template>
  <base-button
    :disabled="disabled"
    label="ログイン"
  >
  </base-button>
</template>

<script lang="ts">
import {PropOptions} from 'vue';
import CustomVue from '../../custom';


export default CustomVue.extend({
  name : 'LoginSendButton',
  props: {
    disabled: {
      type   : Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
});
</script>

<style scoped>

</style>
