<template>
    <header id="header-content" class="w-100 bc-background bdc-background-shade">
        <div id="navbar-upper">
            <div class="navbar-container h-100 w-100">
                <nuxt-link id="header-primary" to="/" class="h-100">
                    <img id="header-logo" :src="page.brand.logo_url" v-if="page.brand && page.brand.logo_url">

                    <span v-if="page.title" class="page-title fs-18 c-text-1 bdc-background-shade">{{ page.title }}</span>
                </nuxt-link>

                <nav id="page-nav" class="h-100">
                    <div id="nav-auth">
                        <a id="nav-auth-log-in" v-if="!session.authenticated" v-on:click="$emit('showAuthModal', 'log-in')" class="nav-auth-action nav-item fs-16 btn c-text-1 bc-background bdc-background-shade h-bc-background-shade c-bc-background-shade">
                            Log In
                        </a>
                        <a id="nav-auth-sign-up" v-if="!session.authenticated" v-on:click="$emit('showAuthModal', 'sign-up')" class="nav-auth-action nav-item fs-16 btn c-text-1 bc-background bdc-primary h-c-primary-contrast h-bc-primary c-c-primary-contrast c-bc-primary">
                            Sign Up
                        </a>

                        <nuxt-link id="nav-auth-user" v-else-if="session.authenticated" to="/account" class="nav-item fs-16 c-text-1 bc-background-shade h-bc-primary">
                            <img id="nav-auth-user-avatar" v-bind:src="user.avatar">

                            <span id="nav-auth-user-username">{{ user.username }}</span>
                        </nuxt-link>
                    </div>
                </nav>
            </div>
        </div>

        <div id="navbar-lower">
            <div class="navbar-container h-100 w-100 bdc-background-shade">
                <nav id="route-nav" class="h-100">
                    <nuxt-link to="/" class="nav-item fs-16 h-bc-background-shade" exact-active-class="c-primary bc-background-shade bdc-primary sidebar-nav-item-active">
                        <i class="material-icons fs-24">home</i>
                        <span>Home</span>
                    </nuxt-link>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'HeaderContent',
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
        data: () => {
            return {
                dropnav: {
                    account: false
                }
            }
        },
        computed: {
            user: () => {
                if (this.session && this.session.user) {
                    return this.session.user;
                } else {
                    return false;
                }
            },
            boards: () => {
                return this.$store.state.boards.data;
            },
            activeBoard: () => {
                const self = this;

                if (self.boards && self.boards.length > 0) {
                    if (self.$route.params.board && self.$route.params.board != null) {
                        const item = self.boards.find(function (el) {
                            return el.name === self.$route.params.board;
                        });

                        return item;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>
    header {
        position: relative;
        background-color: #e7e6ec;
        background-position: top center;
        background-size: cover;
        padding-top: 2px;
        border-bottom: 1px solid;
        z-index: 100;
    }

    header .navbar-container {
        padding: 0 15px;
        max-width: 1330px;
        margin: 0 auto;
    }

    header #navbar-upper {
        height: 80px;
        padding: 5px 0;
    }

    header #navbar-upper .navbar-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    header #navbar-lower {
        height: 50px;
    }

    header #navbar-lower .navbar-container {
        border-top: 1px solid;
        padding-top: 10px;
    }

    header #header-primary {
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    header #header-logo {
        height: 50%;
        max-width: 256px;
        object-fit: contain;
        backface-visibility: hidden;
    }

    header #header-primary .page-title {
        height: 60%;
        display: flex;
        align-items: center;
        border-left: 1px solid;
        margin-left: 20px;
        padding-left: 20px;
    }

    header #page-nav {
        display: flex;
        align-items: center;
    }

    header #page-nav .nav-item {
        display: inline-flex;
        align-items: center;
        padding: 12px 14px;
        margin-left: 15px;
        text-decoration: none;
    }

    header #page-nav .nav-item a {
        text-decoration: none;
    }

    /* Nav Auth */

    header #page-nav #nav-auth .material-icons {
        margin-right: 8px;
    }

    header #page-nav #nav-auth {
        position: relative;
        margin-left: 0;
        padding-left: 0;
        border-left: none;
    }

    header #page-nav #nav-auth .nav-item.nav-auth-action {
        cursor: pointer;
        padding: 10px 20px;
        margin-left: 5px;
    }

    header #page-nav #nav-auth #nav-auth-user {
        cursor: pointer;
        padding: 6px 14px;
        border-radius: 2px;
    }

    header #page-nav #nav-auth #nav-auth-user #nav-auth-user-avatar {
        height: 36px;
        border-radius: 50%;
        margin-right: 10px;
    }

    /* Responsive */

    /* Resolution equal or lower than 1200px */

    @media only screen and (max-width: 1200px) {
        header #page-nav #nav-auth {
            margin-left: 25px;
            padding-left: 20px;
            border-left: 1px solid rgba(var(--theme), var(--theme), var(--theme), 0.25);
        }
    }
</style>