// Configuration for your app

module.exports = function (ctx) {
  console.log('ctx', ctx)
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ['graphql', 'axios-boot'],

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
      config: {
        brand: {
          primary: '#1565c0',
          accent: '#d50000',
          secondary: '#9c27b0'
        }
      },
      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QBanner',
        'QPageContainer',
        'QPageSticky',
        'QPage',
        'QToolbar',
        'QBtn',
        'QDrawer',
        'QAvatar',
        'QTabPanels',
        'QTabPanel',
        'QTabs',
        'QTab',
        'QTree',
        'QRouteTab',
        'QSpace',
        'QIcon',
        'QCard',
        'QCardSection',
        'QChip',
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
        'QEditor',
        'QSlider',
        'QExpansionItem'
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
        BASE_URL: ctx.dev ? JSON.stringify('http://localhost:3000') : JSON.stringify('https://www.lifting.ren'),
        STATIC_URL: ctx.dev ? JSON.stringify('http://localhost:8080') : JSON.stringify('https://www.lifting.ren'),
      }
    },

    devServer: {
      // https: true,
      public: 'http://localhost:8000',
      port: 8000,
      open: true, // opens browser window automatically
      proxy: {
        '/image': {
          target: "http://localhost:8080"
        }
      }
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
