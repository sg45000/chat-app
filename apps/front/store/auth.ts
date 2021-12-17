// import * as crypto from 'crypto';
import {actionTree, getterTree, mutationTree} from 'typed-vuex';

export interface AuthState {
  token: string;
}

export const state = ():AuthState => ({
  token: '',
});

export const mutations = mutationTree(state, {
  _setToken(state: AuthState, token: string): void {
    state.token = token;
  }
});

export const getters = getterTree(state, {
  bearerToken(state: AuthState): string {
    const cryptoToken = state.token;
    return `Bearer ${cryptoToken}`;
  }
});

export const actions = actionTree({state, getters, mutations},  {
  updateToken({commit}, value: string): void {
    commit('_setToken', value);
  },
});
