import {Context} from '@nuxt/types';
import {Inject} from '@nuxt/types/app';
import {GraphqlClient} from './graphql/client';

export default (ctx: Context, inject: Inject) => {
  inject('graphql', new GraphqlClient(ctx));
  // ここにpluginとして追加したいものをかく
};
