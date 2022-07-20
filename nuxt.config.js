import hooks from './plugins/hooks'
const pkg = require('./package')
const env = require("./config/env.json")
const channelJson = require("./config/channel.json")
const envJson = env[process.env.APP_ENV]

// require('dotenv').config()

export default {
  mode: 'universal',
  router: {
    base: '/seguro-de-vida/'
  },
  hooks: hooks(this),
  /*
  ** Headers of the page
  */
  head: {
    title: 'Contrata hoy tu seguro de vida con devolución - Interseguro',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      // { charset: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=6, minimum-scale=1' },
      { hid: 'description', name: 'description', content: 'Seguro de vida con devolución, Protege a los que más amas y recupera todo tu dinero. Fácil, rápido y lo mejor de todo, 100% digital desde S/ 0.8 al día.' },
      { hid: 'keywords', name: 'keywords', content: 'seguros, seguro de vida, seguro de vida con devolución, vida con devolucion, cubrimos coronavirus, coronavirus, seguro de vida nacional, seguro de vida internacional' },
      { hid: 'author', name: 'author', content: 'Interseguro | Vida con devolución' },
      { hid: 'copyright', name: 'copyright', content: 'Interseguro Seguro de Vida' },
      // Facebook
      { hid: 'fb:og:title', property: 'og:title', content: 'Protege a los que más amas y recupera todo tu dinero' },
      { hid: 'fb:og:type', property: 'og:type', content: 'website' },
      { hid: 'fb:og:image', property: 'og:image', content: envJson.base + 'seguro-de-vida/media/images/share/card_facebook_seguro_de_vida_con_devolucion.png' },
      { hid: 'fb:og:url', property: 'og:url', content: envJson.base + 'seguro-de-vida/vida-con-devolucion' },
      { hid: 'fb:og:description', property: 'og:description', content: 'Fácil, rápido y lo mejor de todo, 100% digital desde S/ 0.8 al día.' },
      { hid: 'fb:og:site_name', property: 'og:site_name', content: 'Vida con devolución Interseguro' },
      { hid: 'fb:og:image:width', property: 'og:image:width', content: '1200' },
      { hid: 'fb:og:image:height', property: 'og:image:height', content: '630' },
      { hid: 'fb:og:image:alt', property: 'og:image:alt', content: 'Interseguro, Seguro de Vida con devolución' },
      // whatsapp
      { hid: 'wsp:image', property: 'og:image', itemprop: 'image', content: envJson.base + 'seguro-de-vida/media/images/share/card_whatsapp_seguro_de_vida_con_devolucion.png' },
      // // Twitter
      { hid: 'twitter:title', property: 'twitter:title', content: 'Protege a los que más amas y recupera todo tu dinero' },
      { hid: 'twitter:image', property: 'twitter:image', content: envJson.base + 'seguro-de-vida/media/images/share/card_twitter_seguro_de_vida_con_devolucion.png' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:description', property: 'twitter:description', content: 'Fácil, rápido y lo mejor de todo, 100% digital desde S/ 0.8 al día. ' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: envJson.base + 'seguro-de-vida/interseguro.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: ['@/assets/css/main.scss', '@/assets/css/interbank/interbank.scss'],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/bootstrap.js',
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/vueFormWizard.js', ssr: false },
    { src: '~/plugins/vuePageTransition.js', ssr: false },
    { src: '~/plugins/sentry.js', ssr: false },
    { src: '~/plugins/amplitude.js', ssr: false }
    // { src: '~/plugins/appointment.js', ssr: false}
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt',
    'nuxt-lazy-load'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: envJson.api,
    browserBaseURL: envJson.api,
    credentials: false
  },

  /*
  ** Build configuration
  */
  build: {
    vendor: ['moment', 'lodash'],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue|pdf)$/,
        exclude: /(node_modules)/
      })
      config.module.rules.push(
        {
          test: /\.(pdf|docx)$/,
          use: [ { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: './assets/images/' } } ]
        }
      )
    }
  },
  env: {
    url: envJson.url,
    environment: process.env.APP_ENV,
    baseURL: envJson.api,
    base: envJson.base,
    configFirebase: envJson.firebase,
    configNiubiz: envJson.niubiz,
    apiSMS: envJson.api_sms,
    supervisorNumber: envJson.supervisor_number,
    culqiPK: envJson.culqi_pk,
    culqiURL: envJson.culqi_url,
    channel: channelJson.CHANNEL,
    subChannel: channelJson.SUBCHANNEL_CHANNEL,
    consentimientoPostExt: envJson.consentimiento_post_ext,
    consentimientoGetExt: envJson.consentimiento_get_ext
  }
}
