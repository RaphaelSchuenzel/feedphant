<template>
    <div id="error" class="h-100 w-100 container">
        <div id="error-inner">
            <div id="error-image" class="c-text-1 fs-48">
                <UnauthorizedImage v-if="error.statusCode === 401" />
                <ForbiddenImage v-else-if="error.statusCode === 403" />
                <NotFoundImage v-else-if="error.statusCode === 404" />
                <InternalServerErrorImage v-else />
            </div>
            
            <p id="error-message" class="fs-24 c-text-1">
                <span v-if="error.statusCode === 401">You must log in to access this top-secret area.</span>
                <span v-else-if="error.statusCode === 403">You are not allowed to access this top-secret area.</span>
                <span v-else-if="error.statusCode === 404">We couldn't find this page.</span>
                <span v-else>An unknown error occured.</span>
            </p>
            
            <p id="error-hint" class="fs-18 c-text-2">
                <span v-if="error.statusCode === 401">
                    To do so, simply click the <strong>"Sign In"</strong> button at the top of the page.

                    <!-- todo: add action button that opens the auth modal -->
                    <!-- <a id="nav-auth-action" v-on:click="$emit('showAuthModal')" class="nav-item fs-16 btn c-text-1 bc-background bdc-background-shade h-bc-background-shade h-bdc-primary c-c-primary-contrast c-bc-primary">
                        <i class="material-icons">account_circle</i>
                        Sign In
                    </a> -->
                </span>
                <span v-else-if="error.statusCode === 404">
                    The page you were looking for was either moved, is unavailable, or doesn't exist.

                    </br></br>
                    
                    <nuxt-link class="c-primary" to="/">Go back home</nuxt-link>

                    <!-- todo: add contact link -->
                </span>
                <span v-else>
                    Please try again later or <nuxt-link class="c-primary" to="/">go back home.</nuxt-link>
                </span>
            </p>
        </div>
    </div>
</template>

<script>
    import UnauthorizedImage from '~/assets/images/errors/401.svg?inline';
    import ForbiddenImage from '~/assets/images/errors/403.svg?inline';
    import NotFoundImage from '~/assets/images/errors/404.svg?inline';
    import InternalServerErrorImage from '~/assets/images/errors/500.svg?inline';

    export default {
        name: 'Error',
        components: {
            UnauthorizedImage,
            ForbiddenImage,
            NotFoundImage,
            InternalServerErrorImage
        },
        props: {
            'error': {
                type: Object,
                default: () => {
                    return {};
                }
            }
        }
    }
</script>

<style scoped>
    #error {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    #error-image {
        height: 350px;
        overflow: hidden;
    }

    #error-image svg {
        height: 100%;
    }

    #error-message {
        margin-top: 20px;
    }

    #error-hint {
        margin-top: 10px;
    }
</style>