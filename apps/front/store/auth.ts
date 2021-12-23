// import * as crypto from 'crypto';
import {actionTree, getterTree, mutationTree} from 'typed-vuex';
import {LoginMutationResponse} from '~/plugins/graphql/response.types';

export interface AuthState {
  token: string;
  userId: string;
  name: string;
}

export const state = (): AuthState => ({
  token : '',
  userId: '',
  name  : ''
});

export const mutations = mutationTree(state, {
  _setToken(state: AuthState, token: string): void {
    state.token = token;
  },
  _setLoginInfo(state: AuthState, params: LoginMutationResponse): void {
    state.token = params.sessionId;
    state.userId = params.id;
    state.name = params.name;
  }
});

export const getters = getterTree(state, {
  bearerToken(state: AuthState): string {
    const cryptoToken = state.token;
    return `Bearer ${cryptoToken}`;
  },
  userId(state: AuthState): string {
    return state.userId;
  }
});

export const actions = actionTree({state, getters, mutations},  {
  updateToken({commit}, value: string): void {
    commit('_setToken', value);
  },
  updateLoginInfo({commit}, params: LoginMutationResponse): void {
    commit('_setLoginInfo', params);
  }
});
