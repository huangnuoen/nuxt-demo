const pkg = require('./package')
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: './',
    middleware: 'stats'
  }
}: {}

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  ...routerBase,
  /*
   ** Customize the progress-bar color
   */
  loading: './base/GLoading.vue',

  /*
   ** Global CSS
   */
  css: [{
    src: '@/assets/css/reset.less',
    lang: 'less'
  },{
    src: 'mint-ui/lib/style.min.css'
  }],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: './plugins/mint-ui.js',
      ssr: true
    }
  ],


  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/proxyApi',
      {
        target: 'http://dev.kangaroo.com', // api主机
        pathRewrite: {
          '^/proxyApi': '/'
        }
      }
    ]
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
