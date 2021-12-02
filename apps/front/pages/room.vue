<template>
  <room-list :rooms="rooms" @enter="enterRoom($event)">
  </room-list>
</template>

<script lang="ts">
import {Room} from '~/types/types';
import CustomVue from '@/custom';
interface Data {
  rooms: Room[]
}

export default CustomVue.extend({
  name: 'room',
  data(): Data  {
    return {
      rooms: []
    };
  },
  async created() {
    this.rooms = await this.getRooms();
  },
  methods: {
    async getRooms(): Promise<Room[]> {
      const rooms = await this.$graphql.getRooms();
      if(rooms instanceof Error) {
        alert(rooms.message);
        return [];
      }
      return rooms.map(r => ({
        id  : r.id,
        name: r.name,
      }));
    },
    enterRoom(room: Room) {
      console.log(room);
      this.$router.push('chat');
    }
  }
});
</script>

<style scoped>

</style>
