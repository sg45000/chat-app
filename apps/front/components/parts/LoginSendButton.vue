<template>
  <BaseButton
    :disabled="disabled"
    label="ログイン"
    @click="$emit('click', $event)"
  >
  </BaseButton>
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
