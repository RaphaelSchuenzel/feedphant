<template>
    <div id="auth">
        <div id="modal-mask" @click="closeModal()" class="h-100 w-100">
            <div id="modal-wrapper">
                <div id="modal-container" class="bc-background bdc-primary">

                    <div id="modal-header" class="bdc-background-shade">
                        <div v-if="mode === 'log-in'">
                            <h1 class="header-text c-text-1 fs-24">Log In</h1>
                            <p class="header-sub c-text-2 fs-16">Log in to your Patchnote account.</p>
                        </div>

                        <div v-else-if="mode === 'sign-up'">
                            <h1 class="header-text c-text-1 fs-24">Sign Up</h1>
                            <p class="header-sub c-text-2 fs-16">Sign up for a Patchnote account.</p>
                        </div>
                    </div>
                    
                    <div id="modal-body" class="c-text-1">
                        <div v-if="!sso.enable">
                            <div v-if="!submitting.active && !submitting.fallback">

                                <!-- Email Auth -->
                                <form id="email-auth" v-on:submit.prevent="authSubmit">
                                    <div v-if="mode === 'sign-up'" class="form-group">
                                        <label class="fs-14" for="authUsernameInput">Username</label>
                                        <input
                                            id="authUsernameInput"
                                            v-model="inputs.username.content"
                                            class="form-control bc-background-shade"
                                            type="username"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Username"
                                        >
                                    </div>

                                    <div class="form-group">
                                        <label class="fs-14" for="authEmailInput">Email Address</label>
                                        <input
                                            id="authEmailInput"
                                            v-model="inputs.email.content"
                                            class="form-control bc-background-shade"
                                            type="email"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Email"
                                        >
                                    </div>

                                    <div class="form-group">
                                        <label class="fs-14" for="authPasswordInput">Password</label>
                                        <input
                                            id="authPasswordInput"
                                            v-model="inputs.password.content"
                                            class="form-control bc-background-shade"
                                            type="password"
                                            placeholder="Enter Password"
                                        >
                                    </div>

                                    <div class="form-submit">
                                        <button v-if="mode === 'log-in'" class="btn btn-bold btn-large c-text-1 bc-background bdc-background-shade h-bc-background-shade h-bdc-primary c-c-primary-contrast c-bc-primary" type="submit">Log In</button>
                                        <button v-else-if="mode === 'sign-up'" class="btn btn-bold btn-large c-text-1 bc-background bdc-background-shade h-bc-background-shade h-bdc-primary c-c-primary-contrast c-bc-primary" type="submit">Sign Up</button>

                                        <p class="auth-mode fs-14">
                                            <span v-if="mode === 'log-in'">Don't have an account? <a v-on:click="mode = 'sign-up'">Sign Up</a></span>
                                            <span v-else-if="mode === 'sign-up'">Already have an account? <a v-on:click="mode = 'log-in'">Log In</a></span>
                                        </p>
                                    </div>
                                </form>

                                <div v-if="inputs.error" class="form-alert alert alert-danger" role="alert">{{ inputs.error }}</div>

                                <div id="auth-options" class="w-100 row bdc-background-shade">

                                    <!-- Google Auth -->
                                    <div id="auth-google" class="col auth-option h-bs-s">
                                        <GoogleLogo class="auth-option-icon" />

                                        <span>Google</span>
                                    </div>

                                    <!-- Steam Auth -->
                                    <div id="auth-steam" class="col auth-option h-bs-s">
                                        <SteamLogo class="auth-option-icon" />

                                        <span>Steam</span>
                                    </div>

                                    <!-- Discord Auth -->
                                    <div id="auth-discord" class="col auth-option h-bs-s">
                                        <DiscordLogo class="auth-option-icon" />

                                        <span>Discord</span>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="loader-wrapper">
                                <div class="loader-inner">
                                    <div class="loader loader-1" />

                                    <p class="loader-status fs-16">Logging you in...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GoogleLogo from '~/assets/images/brands/google.svg?inline';
    import SteamLogo from '~/assets/images/brands/steam.svg?inline';
    import DiscordLogo from '~/assets/images/brands/discord.svg?inline';

    export default {
        name: 'Auth',
        components: {
            GoogleLogo,
            SteamLogo,
            DiscordLogo
        },
        props: {
            'page': {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data: () => {
            return {
                mode: 'log-in',
                inputs: {
                    username: {
                        content: '',
                        error: false
                    },
                    email: {
                        content: '',
                        error: false
                    },
                    password: {
                        content: '',
                        error: false
                    },
                    error: ''
                },
                submitting: {
                    active: false,
                    fallback: false
                }
            }
        },
        computed: {
            sso () {
                if (this.page && this.page.auth && this.page.auth.sso) {
                    return this.page.auth.sso;
                } else {
                    return {};
                }
            }
        },
        methods: {
            closeModal () {
                const modalWrapper = document.getElementById('modal-wrapper');

                if (event.target === modalWrapper) {
                    return this.$emit('close');
                }
            },
            authSubmit () {
                const self = this;

                if (!self.submitting.active && !self.submitting.fallback) {
                    self.submitting.active 		= true;
                    self.submitting.fallback 	= true;

                    setTimeout(function () {
                        self.submitting.fallback = false;
                    }, 500);

                    if (!self.sso || !self.sso.enable) {
                        const credentials = {};

                        credentials.username 	= self.inputs.username.content;
                        credentials.email 		= self.inputs.email.content;
                        credentials.password 	= self.inputs.password.content;

                        self.$store.dispatch('authAction', { mode: self.mode, credentials })
                            .then((response) => {
                                // respond
                            }, (error) => {
                                if (error && error.response) {
                                    if (error.response.status && error.response.status === 401) {
                                        self.inputs.error = 'You have entered an invalid username and / or password.';
                                    } else if (error.response.data.detail) {
                                        self.inputs.error = error.response.data.detail;
                                    } else {
                                        self.inputs.error = 'An internal server error occured. Please try again later.';
                                    }
                                } else {
                                    self.inputs.error = 'An internal server error occured. Please try again later.';
                                }

                                self.submitting.active = false;

                                return self.submitting.active;
                            });
                    } else {
                        // sso
                    }
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>
    /* Modal Base */

    #modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .6);
        display: table;
        transition: opacity .1s ease;
    }

    #modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    #modal-container {
        width: 95%;
        max-width: 500px;
        margin: 0px auto;
        border: 2px solid;
        border-radius: 5px;
        transition: all .3s ease;
        overflow: hidden;
    }

    #modal-header {
        display: block;
        text-align: center;
        border-bottom: none;
        padding: 30px 0 20px 0;
        border-bottom: 2px solid;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    #modal-header .header-sub {
        margin-top: 10px;
    }

    #modal-body {
        max-width: 400px;
        margin: 0 auto;
        padding: 30px 0;
        text-align: center;
    }

    /* Content */

    #email-auth {
        max-width: 400px;
        text-align: left;
        margin: 0 auto;
    }

    #email-auth .form-submit {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 25px;
    }

    #email-auth .auth-mode a {
        cursor: pointer;
        font-weight: 700;
    }

    #email-auth .auth-mode a:hover, #email-auth .auth-mode a:focus, #email-auth .auth-mode a:active {
        text-decoration: underline;
    }

    /* Auth Options */

    #auth-options {
        margin: 0;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 2px solid;
    }

    #auth-options .auth-option {
        max-width: 31%;
        margin: 0 1.166666665%;
        height: 50px;
        margin: 10px auto;
    }

    #auth-options .auth-option {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 2px solid;
        border-radius: 2px;
    }

    #auth-options .auth-option .auth-option-icon {
        height: 20px;
        width: 20px;
        fill: var(--text-1);
    }

    #auth-options .auth-option span {
        margin-left: 10px;
    }

    /* Google Auth */

    #auth-options .auth-option#auth-google {
        border-color: #4285F4;
    }

    #auth-options .auth-option#auth-google:hover,
    #auth-options .auth-option#auth-google:focus,
    #auth-options .auth-option#auth-google:active {
        background: #4285F4;
    }

    /* Steam Auth */

    #auth-options .auth-option#auth-steam {
        border-color: #171a21;
    }

    #auth-options .auth-option#auth-steam:hover,
    #auth-options .auth-option#auth-steam:focus,
    #auth-options .auth-option#auth-steam:active {
        background: #171a21;
    }

    /* Discord Auth */

    #auth-options .auth-option#auth-discord {
        border-color: #7289DA;
    }

    #auth-options .auth-option#auth-discord:hover,
    #auth-options .auth-option#auth-discord:focus,
    #auth-options .auth-option#auth-discord:active {
        background: #7289DA;
    }

    #auth-options .auth-option .auth-option-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 50px);
    }

    #auth-options .auth-option .auth-option-content span {
        position: relative;
        z-index: 10;
    }
</style>