import {GraphqlClient} from '~/plugins/graphql/client';
import {accessorType} from '~/store';

declare module 'vue/types/vue' {
  interface Vue {
    $graphql: GraphqlClient;
    $accessor: typeof accessorType;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}
