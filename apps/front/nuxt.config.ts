import colors from 'vuetify/es5/util/colors';
import {NuxtConfig} from '@nuxt/types';

const PORT = process.env.PORT || 3000;

const nuxtConfig: NuxtConfig = {
  server: {
    port: PORT,
  },
  target: 'server',
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr   : false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - front',
    title        : 'front',
    htmlAttrs    : {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  publicRuntimeConfig: {
    graphqlBaseUrl: process.env.GRAPHQL_BASE_URL || '/graphql', // ルートの.envファイルを読み込んでくれる
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  router: {
    middleware: 'authenticated'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components/',
    '~/components/form',
    '~/components/parts',
    '~/components/parts/base',
    '~/components/list',
    // '~/components/molecules',
    // '~/components/organisms',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-typed-vuex',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:3030'
      }
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme          : {
      light : true,
      themes: {
        dark: {
          primary  : colors.blue.darken2,
          accent   : colors.grey.darken3,
          secondary: colors.amber.darken3,
          info     : colors.teal.lighten1,
          warning  : colors.amber.base,
          error    : colors.deepOrange.accent4,
          success  : colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      /typed-vuex/,
    ],
  }
};

export default nuxtConfig;
