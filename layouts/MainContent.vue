<template>
    <main id="main-content">
        <div id="view-container" class="row h-100">
            <div id="sidebar-wrapper" class="col h-100 w-100 bc-background">
                <Sidebar :page="page" />

                <footer>
                    <FooterContent :page="page" />
                </footer>
            </div>
            
            <div id="content-wrapper" class="col h-100 w-100 bc-background">
                <img id="background" v-if="page && page.brand && page.brand.background_url" :src="page.brand.background_url" class="h-100 w-100">

                <div id="content-wrapper-inner" class="h-100 w-100">
                    <div id="content-inner" class="h-100 w-100">
                        <!-- Notes -->
                        <CookieNote v-if="notes.cookies" :page="page" @close="notes.cookies = false" />

                        <nuxt />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import CookieNote 		from '../components/notes/Cookies.vue'

    import Sidebar 			from './main/Sidebar.vue'
    import FooterContent 	from './main/FooterContent.vue'

    export default {
        name: 'MainContent',
        components: {
            Sidebar,
            CookieNote,
            FooterContent
        },
        props: {
            'page': {
                type: Object,
                default: () => {
                    return {};
                }
            },
            'session': {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data () {
            return {
                notes: {
                    cookies: true
                }
            }
        }
    }
</script>

<style scoped>
    main {
        height: calc(100% - 70px);
    }

    main #view-container {
        margin: 0;
        border-radius: 5px;
    }

    main #view-container #sidebar-wrapper,
    main #view-container #content-wrapper {
        padding: 0;
        overflow: hidden;
    }

    main #view-container #sidebar-wrapper {
        max-width: 300px;
    }

    main #view-container #content-wrapper #background {
        position: absolute;
        object-fit: cover;
        opacity: .03;
        pointer-events: none;
        z-index: 10;
    }

    main #view-container #content-wrapper-inner {
        position: relative;
        z-index: 20;
    }

    main #view-container #content-wrapper #content-inner {
        overflow: hidden;
        overflow-y: scroll;
    }

    main #view-container #content-wrapper #content-inner.content-container {
        padding: 30px 40px;
    }

    /* Responsive */

    /* Resolution equal or lower than 1200px */

    @media only screen and (max-width: 1200px) {
        main #view-container #content-wrapper #content-inner {
            height: 100%;
        }
    }
</style>