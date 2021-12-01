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
    getRooms(): Promise<Room[]> {
      return new Promise((resolve)=>{
        resolve([
          {
            id  : '1',
            name: 'トークルーム1'
          },
          {
            id  : '2',
            name: 'トークルーム1'
          },
        ]);
      });
    },
    enterRoom(room: Room) {
      console.log(room);
    }
  }
});
</script>

<style scoped>

</style>
