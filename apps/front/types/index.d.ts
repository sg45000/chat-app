import {GraphqlClient} from '~/plugins/graphql/client';

declare module 'vue/types/vue' {
  interface Vue {
    $graphql: GraphqlClient;
  }
}
