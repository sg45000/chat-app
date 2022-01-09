<template>
  <chat-container :posts="posts"></chat-container>
</template>

<script lang="ts">
import {PropOptions} from 'vue';
import CustomVue from '@/custom';
import {Room} from '~/models/room.model';
import {Post} from '~/models/post.model';
interface Data {
  posts: Post[]
}
export default CustomVue.extend({
  name: 'chat',
  data: (): Data => ({
    posts: [],
  }),
  props: {
    room: {
      type    : Object,
      required: true,
    } as PropOptions<Room>,
  },
  async created() {
    this.posts = await this.getPosts();
  },
  methods: {
    async getPosts(): Promise<Post[]> {
      const response = await this.$graphql.getPosts();
      if(response.isFailure()) {
        alert(response.value.message);
        return [];
      }
      return response.value.map(r => new Post(r.id, r.message, r.ownerId, new Date()));
    }
  }
});
</script>

<style scoped>

</style>
