<template>
  <v-container>
    <v-row
    v-for="(post, i) in posts"
    :key="i"
    >
      <v-spacer v-if="post.isMine"></v-spacer>
      <v-col>
        <MessageBox v-bind:message="post.msg"/>
      </v-col>
      <v-spacer v-if="!post.isMine"></v-spacer>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import MessageBox from "./MessageBox.vue";
export default {
  name: "ChatContainer",
  components: {
    MessageBox
  },
  props:  ["posts"]
}
</script>

<style scoped>

</style>
