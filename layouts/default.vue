<template>
    <div id="content" class="h-100 w-100">
        <!-- Modals -->
        <AuthModal v-if="modals.auth.active" :page="page" :authMode="modals.auth.payload.mode" @close="modals.auth.active = false" />

        <div v-bind:class="['h-100 w-100', { 'note-active': noteActive }]">
            <HeaderContent :page="page" :session="session" @showAuthModal="showAuthModal" />
            
            <MainContent :page="page" :session="session" />
        </div>

        <!-- Content Sections -->
        <Notes :page="page" :session="session" :notes="notes" v-if="noteActive" />
    </div>
</template>

<script>
    import tinycolor from 'tinycolor2'
    
    import AuthModal from '../components/modals/auth.vue'

    import Notes from './Notes.vue'
    import HeaderContent from './HeaderContent.vue'
    import MainContent from './MainContent.vue'

    export default {
        components: {
            AuthModal,
            Notes,
            HeaderContent,
            MainContent
        },
        data () {
            return {
                modals: {
                    auth: {
                        payload: {
                            mode: false
                        },
                        active: false
                    }
                },
                notes: {
                    cookies: true,
                    example: false
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
            },
            noteActive () {
                return Object.values(this.notes).some(item => item);
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
            showAuthModal (mode) {
                if (mode) {
                    this.modals.auth.payload.mode = mode;

                    this.modals.auth.active = true;
                } else {
                    return false;
                }
            }
        }
    }
</script>