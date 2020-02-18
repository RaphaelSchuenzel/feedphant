<template>
    <main id="main-content">
        <div id="view-container" class="row h-100">
            <div id="content-wrapper" class="col h-100 w-100 bc-background">
                <div id="content-wrapper-inner" class="h-100 w-100">
                    <div id="content-inner" class="h-100 w-100">
                        <nuxt />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'MainContent',
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

    main #view-container #content-wrapper {
        padding: 0;
        overflow: hidden;
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