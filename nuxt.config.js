export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'escuelas-conduccion-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    bodyAttrs: {
      class: 'vertical-layout vertical-menu-modern  navbar-floating',
      'data-open': "click",
      'data-menu':"vertical-menu-modern",
      'data-col':""
    },
    htmlAttrs: {
      class: 'dark-layout'
      // class: this.theme
    },
    script: [
      { src: "https://code.jquery.com/jquery-3.4.1.min.js" },
      // {
      //   src: 'https://unpkg.com/feather-icons'
      // },
      // {
      //   src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.5.5/perfect-scrollbar.min.js'
      // },
      {
        type:'text/javascript'
      }
    ]
  },
  publicRuntimeConfig: {
    logoPrimary: process.env.LOGO_PRIMARY,
    logoDark: process.env.LOGO_DARK,
    colorLoading: process.env.COLOR_LOADING,
    urlBack: process.env.BASE_URL_API_BACK,
    axios: {
      // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
      baseURL: process.env.BASE_URL_API_BACK,
    }
  },

  auth: {
    redirect: {
      home: '/panel-control',
      logout: '/login'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/api/v1/user', method: 'get' }
        }
      }
    }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/application.scss',
    '@/app-assets/vendors/css/vendors.min.css',
    '@/app-assets/css/plugins/extensions/ext-component-sweet-alerts.css',
    '@/app-assets/css/plugins/extensions/ext-component-toastr.css',
    '@/app-assets/css/bootstrap.css',
    '@/app-assets/css/bootstrap-extended.css',
    '@/app-assets/css/core/menu/menu-types/vertical-menu.css',
    '@/app-assets/css/colors.css',
    '@/app-assets/css/components.css',
    '@/app-assets/css/themes/dark-layout.css',
    '@/app-assets/css/themes/bordered-layout.css',
    '@/app-assets/css/themes/semi-dark-layout.css',
    '@/app-assets/css/core/menu/menu-types/vertical-menu.css',
    '@/app-assets/css/pages/authentication.css',
    '@/assets/css/style.css',
    'boxicons/css/boxicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bus',
    '~/plugins/vue-sax',
    '~/plugins/vuelidate',
    { src: '~/app-assets/vendors/js/vendors.min.js', mode: 'client'},
    { src: '~/plugins/vue-sweetalert2', mode: 'client', ssr: false},
    { src: '~/plugins/vue-good-table', ssr: false,  mode: 'client'},
    { src: '~/plugins/vue-toastification', mode: 'client', ssr: false},
    { src: '~/plugins/vue-flatpickr-component.js', mode: 'client', ssr: false},
    { src: '~/plugins/vue-ctk-date-time-picker', ssr: false},
    { src: '~/plugins/vue-functional-calendar.js', mode: 'client', ssr: false},
    { src: '~/app-assets/js/core/app-menu.js', mode: 'client'},
    { src: '~/app-assets/js/core/app.js', mode: 'client'},
    { src: '~/assets/js/scripts.js', mode: 'client'},
    { src: '~/plugins/splideplugin' , mode: 'client' }
    // { src: '~/plugins/cxlt-vue2-toastr' , mode: 'client' }
    // { src: '~/app-assets/js/scripts/pages/auth-login.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/students/'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
    '@nuxtclub/feathericons'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/moment',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],
  moment: {
    defaultLocale: 'es',
    locales: ['es'],
    timezone: true,
    defaultTimezone: 'Europe/Madrid'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios


  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
