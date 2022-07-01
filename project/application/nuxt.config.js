export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    return {
      title: 'Mantinga',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/node_modules/vue-multiselect/dist/vue-multiselect.min.css',
    '~/assets/styles/main.scss',
  ],

  styleResources: {
    scss: [
      '~/assets/styles/variables.scss',
      '~/assets/styles/mixins/media.scss',
      '~/assets/styles/typography.scss',
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-sanitize.ts',
    '~plugins/v-click-outside.ts',
    '~plugins/vue-js-modal.ts',
    '~plugins/frag.ts',
    { src: '~plugins/vue-aos.ts', ssr: false },
    { src: '~plugins/vue-masonry.ts', ssr: false },
    { src: '~plugins/v-tooltip.ts', ssr: false },
    { src: '~plugins/vue-awesome-swiper.ts', ssr: false },
    { src: '~plugins/vue-youtube.ts', ssr: false },
    { src: '~plugins/vue-notification.ts', ssr: false },
    { src: '~plugins/sentry-browser.ts', mode: 'client' },
    { src: '~plugins/sentry-server.ts', mode: 'server' },
    { src: '~plugins/vue2-google-maps.ts', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/dayjs',
    '@nuxtjs/google-analytics',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'nuxt-client-init-module',
    'vue-social-sharing/nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  googleAnalytics: {
    id: 'UA-217727521-1',
    checkDuplicatedScript: true,
  },

  dayjs: {
    locales: ['en', 'lt', 'lv', 'et', 'ru'],
    defaultLocale: 'lt',
    defaultTimeZone: 'Europe/Vilnius',
    plugins: [
      'utc',
      'timezone',
      'relativeTime'
    ]
  },

  i18n: {
    strategy: 'prefix', // 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      // cookieCrossOrigin: true,
      cookieKey: 'translation_token',
    },
    langDir: 'translation/',
    lazy: true,
    locales: [
      {
        code: 'lt',
        file: 'lt_LT.js',
        iso: 'lt_LT', // Will be used as catchall locale by default
      },
      {
        code: 'ru',
        file: 'ru_RU.js',
        iso: 'ru_RU',
      },
      {
        code: 'en',
        file: 'en_EN.js',
        iso: 'en_EN',
      },
      {
        code: 'lv',
        file: 'lv_LV.js',
        iso: 'lv_LV',
      },
      {
        code: 'et',
        file: 'et_EE.js',
        iso: 'et_EE',
      },
    ],
    defaultLocale: 'lt',
    vueI18n: {
      fallbackLocale: 'lt',
      numberFormats: {
        lt: {
          currency: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol',
          },
        },
      },
    },
    parsePages: false,
    pages: {
      'projects/_slug': {
        lt: '/projektus/:slug',
        ru: '/projects/:slug',
        en: '/projects/:slug',
        lv: '/projektus/:slug',
        et: '/projektid/:slug'
      },
      'recipes/index': {
        lt: '/receptai',
        ru: '/recipes',
        en: '/recipes',
        lv: '/receptes',
        et: '/retseptid'
      },
      'recipes/_id': {
        lt: '/receptai/:id',
        ru: '/recipes/:id',
        en: '/recipes/:id',
        lv: '/receptes/:id',
        et: '/retseptid/:id'
      },
      'career/index': {
        lt: '/karjera',
        ru: '/career',
        en: '/career',
        lv: '/karjeru',
        et: '/karjaari'
      },
      'career/offer/index': {
        lt: '/karjera/pasiulymas',
        ru: '/career/offer',
        en: '/career/offer',
        lv: '/karjeru/pasiulymas',
        et: '/karjaari/pakkuma'
      },
      'career/offer/_id': {
        lt: `/karjera/pasiulymas/:id`,
        ru: '/career/offer/:id',
        en: '/career/offer/:id',
        lv: '/karjeru/pasiulymas/:id',
        et: '/karjaari/pakkuma/:id'
      },
      'contacts/index:': {
        lt: '/kontaktai',
        ru: '/contacts',
        en: '/contacts',
        lv: '/kontaktpersonas',
        et: '/kontaktid'
      },
      'manager/products': {
        lt: '/vadovas/produktai',
        ru: '/manager/products',
        en: '/manager/products',
        lv: '/vaditajs/produktiem',
        et: '/juht/tooted'
      },
      'manager/products/index': {
        lt: '/vadovas/produktai',
        ru: '/manager/products',
        en: '/manager/products',
        lv: '/vaditajs/produktiem',
        et: '/juht/tooted'
      },
      'manager/products/featured': {
        lt: '/vadovas/produktai/teminiai',
        ru: '/manager/products/featured',
        en: '/manager/products/featured',
        lv: '/vaditajs/produktiem/piedavatie',
        et: '/juht/tooted/esiletostetud'
      },
      'manager/presentation-builder': {
        lt: '/vadovas/pristatymo-kurejas',
        ru: '/manager/presentation-builder',
        en: '/manager/presentation-builder',
        lv: '/vaditajs/prezentacijas-veidotajs',
        et: '/juht/esitluse-koostaja'
      },
      'news/index': {
        lt: '/naujienos',
        ru: '/news',
        en: '/news',
        lv: '/zinas',
        et: '/uudised'
      },
      'news/list/_type': {
        lt: '/naujienos/sarasa/:type',
        ru: '/news/list/:type',
        en: '/news/list/:type',
        lv: '/zinas/sarakstu/:type',
        et: '/uudised/nimekirja/:type'
      },
      'news/_slug': {
        lt: '/naujienos/:slug',
        ru: '/news/:slug',
        en: '/news/:slug',
        lv: '/zinas/:slug',
        et: '/uudised/:slug'
      },
      wishlist: {
        lt: '/pageidavimu-sarasas',
        ru: '/wishlist',
        en: '/wishlist',
        lv: '/velmju-saraksts',
        et: '/soovinimekiri'
      },
    }
  },

  env: {
    api_url: process.env.api_url,
  },

  loading: {
    color: '#4A96D1',
    height: '4px',
    failedColor: '#E50145',
  },

  publicRuntimeConfig: {
    apiURL: process.env.api_url,
    sentryDsn: process.env.nuxt_env_sentry_dsn,
    gmapApiKey: process.env.gmap_key
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
  },
}
