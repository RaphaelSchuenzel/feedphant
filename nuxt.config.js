
module.exports = {
    mode: 'universal',
    
    // HTML Head
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
        link: [
            { rel: 'stylesheet', href:'https://use.typekit.net/qrh8grj.css' },
            { reL: 'stylesheet', href:'https://fonts.googleapis.com/icon?family=Material+Icons' }
        ]
    },

    // Progress Bar Styling
    loading: { color: '#fff' },
    
    // Global CSS
    css: [
        '@/assets/css/main.css'
    ],
    
    // Plugins to load before mounting the App
    plugins: [
        '@/plugins/api',
        '@/plugins/moment',
        '@/plugins/tinycolor'
    ],

    // Nuxt.js dev-modules
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],

    // Nuxt.js modules
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/svg'
    ],
    
    // Axios module configuration (https://axios.nuxtjs.org/options)
    axios: {},

    // Build configuration
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {}
    }
}
