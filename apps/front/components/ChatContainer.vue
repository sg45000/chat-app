<template>
  <v-container>
    <v-row
    v-for="(post, i) in posts"
    :key="i"
    >
      <v-spacer v-if="post.isMine"></v-spacer>
      <v-avatar v-if="!post.isMine" color="primary" size="50">
<!--        <img src="" alt="">-->
      </v-avatar>
      <v-col>
        <MessageBox :message="post.msg"/>
      </v-col>
      <v-spacer v-if="!post.isMine"></v-spacer>
    </v-row>
    <v-row>
      <v-text-field
        v-model="message"
        label="メッセージ"
        hide-details="auto"
      ></v-text-field>
      <v-icon :disabled="!message" @click="send">mdi-send</v-icon>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import MessageBox from './MessageBox.vue';
import CustomVue from '~/custom';
import {PostsRepository} from '~/repositories/posts.repository';
const postRepository = new PostsRepository();
interface Data {
  rules: ((value: string)=>string | boolean)[]
}
export default  CustomVue.extend({
  name      : 'ChatContainer',
  components: {
    MessageBox
  },
  data() {
    return {
      message: '',
    };
  },
  methods: {
    async send() {
      await postRepository.post({
        msg   : this.message,
        postAt: new Date(),
        isMine: true,
      });
      this.reset();
    },
    reset() {
      this.message = '';
    }
  },
  props: ['posts']
});
</script>

<style scoped>

</style>
