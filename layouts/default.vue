<template>
    <div :style="rootStyle" class="h-100 w-100">
        <!-- Modals -->
        <AuthModal v-if="modals.auth" :page="page" @close="modals.auth = false" />

        <!-- Content Sections -->
        <HeaderContent :page="page" :session="session" @showAuthModal="modals.auth = true" />
        
        <MainContent :page="page" :session="session" />
    </div>
</template>

<script>
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
                const isDark = this.$tinycolor(this.page.brand.colors.background).isDark();
                
                return (isDark) ? '255' : '000';
            },
            rootStyle () {
                const theme = this.theme;

                const text1Color = this.$tinycolor.mostReadable(this.page.brand.colors.background, [ '#' + theme ], { includeFallbackColors: true }).toHexString();
                
                const primaryContrastColor = this.$tinycolor.mostReadable(this.page.brand.colors.primary, [ text1Color ], { includeFallbackColors: true }).toHexString();

                const primaryShadeColor = ((theme === '255')
                    ? this.$tinycolor(this.page.brand.colors.primary).darken(10).toString()
                    : this.$tinycolor(this.page.brand.colors.primary).brighten(10).toString()
                );

                const backgroundShadeColor = ((theme === '255')
                    ? this.$tinycolor(this.page.brand.colors.background).brighten(5).toString()
                    : this.$tinycolor(this.page.brand.colors.background).darken(5).toString()
                );

                const text2Color = ((theme === '255')
                    ? this.$tinycolor(text1Color).darken(30).toString()
                    : this.$tinycolor(text1Color).brighten(30).toString()
                );

                return {
                    'background-color': 'var(--background-shade)' || '#000',
                    '--theme': this.theme || '#000',
                    '--primary': this.page.brand.colors.primary || '#000',
                    '--primary-shade': primaryShadeColor || '#000',
                    '--primary-contrast': primaryContrastColor || '#000',
                    '--background': this.page.brand.colors.background || '#000',
                    '--background-shade': backgroundShadeColor || '#000',
                    '--text-1': text1Color || '#000',
                    '--text-2': text2Color || '#000'
                }
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