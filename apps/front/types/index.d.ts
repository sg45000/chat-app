import {VueConstructor} from 'vue/types/vue';
import {GraphqlClient} from '~/plugins/graphql/client';
import {accessorType} from '~/store';
declare module 'vue/types/vue' {
  interface Vue {
    $graphql: GraphqlClient;
    $accessor: typeof accessorType;
  }
  export const extend: VueConstructor['extend'];
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }
}
