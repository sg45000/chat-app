<template>
  <v-container class="roomList">
    <v-row v-for="room in rooms" :key="room.id" @click="enterRoom(room)">
      <v-col>
        ルーム名 {{room.name}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {PropOptions} from 'vue';

import CustomVue from '@/custom';
import {Room} from '~/types/types';

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
