
<template>
    <div id="account" class="h-100 w-100">
        <div id="account-inner" class="w-100">
            <h1 class="head fs-24 c-text-1">My Account</h1>

            <div id="account-container" class="row container">
                <div id="account-content" class="col bc-background-shade">
                    <nuxt-child :page="page" :session="session" :user="user" />
                </div>

                <div id="account-nav" class="col c-text-1 bc-background">
                    <router-link to="/account/settings" class="account-nav-item h-c-primary" active-class="c-primary bc-background-shade bdc-primary">
                        <i class="material-icons">account_circle</i>
                        <span>Settings</span>
                    </router-link>

                    <router-link to="/help" class="account-nav-item h-bc-background-shade">
                        <i class="material-icons">contact_support</i>
                        <span>Help</span>
                    </router-link>

                    <router-link to="/account/logout" class="account-nav-item h-bc-background-shade">
                        <i class="material-icons">exit_to_app</i>
                        <span>Log Out</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Account',
        middleware: 'auth',
        computed: {
            page () {
                return this.$store.state.hub.data;
            },
            session () {
                return this.$store.state.session;
            },
            user () {
                if (this.session && this.session.user) {
                    return this.session.user;
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>
    #account {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #account .head {
        text-align: center;
        margin-bottom: 30px;
    }

        /* Account Nav */

        #account-inner #account-nav {
            max-width: 250px;
            min-width: 250px;
            padding: 0;
        }

        #account-inner #account-nav .account-nav-item {
            display: flex;
            align-items: center;
            color: inherit;
            height: 55px;
            line-height: 55px;
            padding: 0 30px;
            border-right: 3px solid transparent;
            text-decoration: none;
            margin-bottom: 10px;
        }

        #account-inner #account-nav .account-nav-item .material-icons {
            margin-right: 10px;
        }

        /* Account Content */

        #account-inner #account-content {
            min-height: 500px;
        }
</style>