<template>
  <chat-container :posts="posts"></chat-container>
</template>

<script lang="ts">
import {Post} from 'types/types';
import CustomVue from '@/custom';
interface Data {
  posts: Post[]
}
export default CustomVue.extend({
  name: 'chat',
  data: (): Data => ({
    posts: [],
  }),
  async created() {
    this.posts = await this.getPosts();
  },
  methods: {
    getPosts(): Promise<Post[]> {
      return new Promise((resolve) => {
        resolve([
          {
            text  : 'おはようございます',
            postAt: new Date(),
            isMine: true,
          },
          {
            text  : 'こんにちは',
            postAt: new Date(),
            isMine: true,
          },
          {
            text  : 'さよなら',
            postAt: new Date(),
            isMine: false,
          }
        ]);
      });
    }
  }
});
</script>

<style scoped>

</style>
