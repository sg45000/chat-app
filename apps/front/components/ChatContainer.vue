<template>
  <v-container>
    <v-row
    v-for="(post, i) in posts"
    :key="i"
    >
      <v-spacer v-if="isMine(post)"></v-spacer>
      <v-avatar v-if="!isMine(post)" color="primary" size="50">
<!--        <img src="" alt="">-->
      </v-avatar>
      <v-col>
        <MessageBox :message="post.message"/>
      </v-col>
      <v-spacer v-if="!isMine(post)"></v-spacer>
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
import {PropOptions} from 'vue';
import MessageBox from './MessageBox.vue';
import CustomVue from '~/custom';
import {Post} from '~/models/post.model';
import {Room} from '~/models/room.model';

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
      this.reset();
    },
    reset() {
      this.message = '';
    },
    isMine(post: Post): boolean {
      return this.$accessor.auth.userId === post.ownerId;
    }
  },
  props: {
    posts: {
      type    : Array,
      required: true,
    } as PropOptions<Post[]>,
    room: {
      type    : Object,
      required: true,
    } as PropOptions<Room>,
  },
});
</script>

<style scoped>

</style>
