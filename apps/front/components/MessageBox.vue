<template>
  <v-card
    elevation="2"
  >
    <v-card-text>
      {{message}}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
export default {
  name : 'MessageBox',
  props: ['message']
};
</script>

<style scoped>

</style>
