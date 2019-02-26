// Configuration for your app

module.exports = function (ctx) {
  console.log('ctx', ctx)
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ['graphql'],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    // framework: 'all', // --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QPageContainer',
        'QPageSticky',
        'QPage',
        'QToolbar',
        'QBtn',
        'QDrawer',
        'QTabPanels',
        'QTabPanel',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QSpace',
        'QIcon',
        'QCard',
        'QCardSection',
        'QSeparator',
        'QMenu',
        'QList',
        'QItem',
        'QSlideItem',
        'QItemSection',
        'QItemLabel',
        'QCardActions',
        'QInput',
        'QPopupProxy',
        'QDate',
        'QDialog',
        'QEditor'
      ],

      directives: [
        'Ripple',
        'CloseDialog'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {},
      env: {
        BASE_URL: ctx.dev ? JSON.stringify('http://localhost:3000') : JSON.stringify('https://www.lifting.ren')
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'Tasks Bag',
        short_name: 'TaskBag',
        description: 'Best task management for family!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
            'src': 'statics/notebook.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/notebook.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/notebook.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/notebook.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/notebook.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
