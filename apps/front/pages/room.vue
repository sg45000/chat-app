<template>
  <ChatContainer v-bind:posts="posts" />
</template>

<script lang="ts">
import {Post} from "~/types/types";
import {PostsRepository} from "~/repositories/posts.repository"
import CustomVue from '@/custom';
const postRepository = new PostsRepository()

interface Data {
  posts: Post[]
}

export default CustomVue.extend({
  name: "room",
  data(): Data  {
    return {
      posts: []
    }
  },
  async created() {
    this.posts = await this.getPosts()
  },
  methods: {
    async getPosts(): Promise<Post[]> {
      return await postRepository.get();
    }
  }
})
</script>

<style scoped>

</style>
