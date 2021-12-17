import {getAccessorType} from 'typed-vuex';
import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from './auth';

Vue.use(Vuex);

export const accessorType = getAccessorType({
  state    : () => ({}),
  getters  : {},
  mutations: {},
  actions  : {},
  modules  : {
    auth
  }
});
