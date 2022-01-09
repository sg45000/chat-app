<template>
  <room-list :rooms="rooms" @enter="enterRoom($event)">
  </room-list>
</template>

<script lang="ts">
import CustomVue from '@/custom';
import {Room} from '~/models/room.model';
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
      const response = await this.$graphql.getRooms();
      if(response.isFailure()) {
        alert(response.value.message);
        return [];
      }
      return response.value.map(r => new Room(r.id, r.name, this.$accessor.auth.userId));
    },
    enterRoom(room: Room) {
      console.log(room);
      this.$router.push({name: 'chat', params: {id: room.id, name: room.name, userId: room.userId} });
    }
  }
});
</script>

<style scoped>

</style>
