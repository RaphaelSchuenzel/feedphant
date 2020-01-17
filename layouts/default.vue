<template>
    <div class="h-100 w-100">
        <!-- Modals -->
        <AuthModal v-if="modals.auth" :page="page" @close="modals.auth = false" />

        <!-- Content Sections -->
        <HeaderContent :page="page" :session="session" @showAuthModal="modals.auth = true" />
        
        <MainContent :page="page" :session="session" />
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'
    
    import AuthModal from '../components/modals/auth.vue'

    import HeaderContent from './HeaderContent.vue'
    import MainContent from './MainContent.vue'

    export default {
        components: {
            AuthModal,
            HeaderContent,
            MainContent
        },
        data () {
            return {
                modals: {
                    account: false,
                    auth: false
                }
            }
        },
        computed: {
            page () {
                return this.$store.state.hub.data;
            },
            theme () {
                const isDark = tinycolor(this.page.brand.colors.background).isDark();
                
                return (isDark) ? '255' : '000';
            },
            rootStyle () {
                const theme = this.theme;

                const text1Color = tinycolor.mostReadable(this.page.brand.colors.background, [ '#' + theme ], { includeFallbackColors: true }).toHexString();
                
                const primaryContrastColor = tinycolor.mostReadable(this.page.brand.colors.primary, [ text1Color ], { includeFallbackColors: true }).toHexString();

                const primaryShadeColor = ((theme === '255')
                    ? tinycolor(this.page.brand.colors.primary).darken(10).toString()
                    : tinycolor(this.page.brand.colors.primary).brighten(10).toString()
                );

                const backgroundShadeColor = ((theme === '255')
                    ? tinycolor(this.page.brand.colors.background).brighten(5).toString()
                    : tinycolor(this.page.brand.colors.background).darken(5).toString()
                );

                const text2Color = ((theme === '255')
                    ? tinycolor(text1Color).darken(30).toString()
                    : tinycolor(text1Color).brighten(30).toString()
                );

                const style = `
                    :root {
                        --theme: ${this.theme} !important;
                        --primary: ${this.page.brand.colors.primary} !important;
                        --primary-shade: ${primaryShadeColor} !important;
                        --primary-contrast: ${primaryContrastColor} !important;
                        --background: ${this.page.brand.colors.background} !important;
                        --background-shade: ${backgroundShadeColor} !important;
                        --text-1: ${text1Color} !important;
                        --text-2: ${text2Color} !important;
                    }
                `

                // minify style
                const styleString = style.replace(/\n/g, '').replace(/\s\s+/g, ' ');

                return styleString;
            },
            session () {
                return this.$store.state.session;
            }
        },
        head () {
            return {
                title: `Home`,
                titleTemplate: `%s - ${this.page.title} | ${this.page.brand.name}`,
                link: [
                    {
                        rel: 'icon',
                        href: this.page.brand.icon_url
                    }
                ],
                style: [
                    {
                        cssText: this.rootStyle,
                        type: 'text/css'
                    }
                ],
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.page.description
                    }
                ]
            }
        },
        mounted () {
            const self = this;

            self.$nextTick(() => {
                self.$nuxt.$loading.start();

                self.getSession();
            });
        },
        methods: {
            getSession () {
                const self = this;

                return new Promise((resolve, reject) => {
                    const accessToken = localStorage.getItem('access_token') || false;

                    const authState = ((accessToken === false || accessToken == null)
                        ? 'unauthenticated'
                        : 'authenticated'
                    );

                    if (authState === 'authenticated') {
                        self.$api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                        
                        self.$store.commit('session/setAccessToken', accessToken);
                        self.$store.dispatch('session/getUser');
                    } else {
                        self.$store.commit('session/setSessionReady');
                    }

                    self.$nuxt.$loading.finish();

                    resolve();
                });
            },
            getHub () {
                const self = this;

                return new Promise((resolve, reject) => {
                    self.$store.dispatch('hub/getHub')
                        .then((response) => {
                            self.$store.dispatch('boards/getBoards')

                            resolve(response);
                        }, (error) => {
                            // handle error

                            reject(error);
                        })
                });
            }
        }
    }
</script>