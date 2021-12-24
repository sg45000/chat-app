<template>
  <v-container class="roomList">
    <LazyHoverCard v-for="room in rooms" :key="room.id" @click="enterRoom(room)">
      {{room.name}}
    </LazyHoverCard>
  </v-container>
</template>

<script lang="ts">
import {PropOptions} from 'vue';

import CustomVue from '@/custom';
import {Room} from '~/models/room.model';

export default CustomVue.extend({
  name : 'roomList',
  props: {
    rooms: {
      type    : Array,
      required: true,
    } as PropOptions<Room[]>,
  },
  methods: {
    enterRoom(room: Room) {
      this.$emit('enter', room);
    }
  }
});
</script>

<style scoped>

</style>
