<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        @click="$emit('click', $event)"
        :elevation="hover ? 24 : 6"
        class="mx-auto pa-6 mb-8"
      >
        <slot></slot>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import {PropOptions} from 'vue';
import CustomVue from '../../custom';

export default CustomVue.extend({
  name : 'HoverCard',
  props: {
    disabled: {
      type   : Boolean,
      default: false,
    } as PropOptions<boolean>,
    text: {
      type   : Boolean,
      default: false,
    } as PropOptions<boolean>,
  },
});
</script>

<style scoped>

</style>
