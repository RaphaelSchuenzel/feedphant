<template>
    <transition id="auth" name="modal">
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
                                <b-form id="email-auth" @submit.prevent="authSubmit">
                                    <b-form-group v-if="mode === 'sign-up'">
                                        <label class="fs-14" for="authUsernameInput">Username</label>
                                        <b-input
                                            id="authUsernameInput"
                                            v-model="inputs.username.content"
                                            :state="inputErrorStates.username"
                                            class="c-text-1 bc-background-shade bdc-background-shade"
                                            type="text"
                                            placeholder="Enter Username"
                                        />

                                        <b-form-invalid-feedback :state="inputErrorStates.username" v-if="inputs.username.error.message" class="fs-14">
                                            {{ inputs.username.error.message }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group>
                                        <label class="fs-14" for="authEmailInput">Email Address</label>
                                        <b-input
                                            id="authEmailInput"
                                            v-model="inputs.email.content"
                                            :state="inputErrorStates.email"
                                            class="c-text-1 bc-background-shade bdc-background-shade"
                                            type="email"
                                            placeholder="Enter Email"
                                        />

                                        <b-form-invalid-feedback :state="inputErrorStates.email" v-if="inputs.email.error.message" class="fs-14">
                                            {{ inputs.email.error.message }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group>
                                        <label class="fs-14" for="authPasswordInput">Password</label>
                                        <b-input
                                            id="authPasswordInput"
                                            v-model="inputs.password.content"
                                            :state="inputErrorStates.password"
                                            class="c-text-1 bc-background-shade bdc-background-shade"
                                            type="password"
                                            placeholder="Enter Password"
                                        />

                                        <b-form-invalid-feedback :state="inputErrorStates.password" v-if="inputs.password.error.message" class="fs-14">
                                            {{ inputs.password.error.message }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <div class="form-submit">
                                        <button v-if="mode === 'log-in'" class="btn btn-bold btn-large c-text-1 bc-background bdc-background-shade h-bc-background-shade h-bdc-primary c-c-primary-contrast c-bc-primary" type="submit">Log In</button>
                                        <button v-else-if="mode === 'sign-up'" class="btn btn-bold btn-large c-text-1 bc-background bdc-background-shade h-bc-background-shade h-bdc-primary c-c-primary-contrast c-bc-primary" type="submit">Sign Up</button>

                                        <p class="auth-mode fs-14">
                                            <span v-if="mode === 'log-in'">Don't have an account? <a v-on:click="mode = 'sign-up'">Sign Up</a></span>
                                            <span v-else-if="mode === 'sign-up'">Already have an account? <a v-on:click="mode = 'log-in'">Log In</a></span>
                                        </p>
                                    </div>
                                </b-form>

                                <div v-if="inputs.error.active" class="form-alert alert alert-danger" role="alert">{{ inputs.error.message }}</div>

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
    </transition>
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
            },
            'authMode': {
                type: String,
                default: 'log-in'
            }
        },
        data: () => {
            return {
                mode: 'log-in',
                inputs: {
                    validated: false,
                    error: {
                        message: null,
                        active: false
                    },
                    username: {
                        content: '',
                        error: {
                            message: null,
                            active: false
                        }
                    },
                    email: {
                        content: '',
                        error: {
                            message: null,
                            active: false
                        }
                    },
                    password: {
                        content: '',
                        error: {
                            message: null,
                            active: false
                        }
                    }
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
            },
            inputErrorStates () {
                const response = {};

                const validated = this.inputs.validated;
                
                response.username = (validated) ? !this.inputs.username.error.active : null;
                response.email = (validated) ? !this.inputs.email.error.active : null;
                response.password = (validated) ? !this.inputs.password.error.active : null;

                return response;
            }
        },
        watch: {
            mode (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.inputs.validated = false;
                }
            }
        },
        mounted () {
            this.mode = this.authMode;
        },
        methods: {
            closeModal () {
                const modalWrapper = document.getElementById('modal-wrapper');

                if (event.target === modalWrapper) {
                    return this.$emit('close');
                }
            },
            validateAuthInputs (mode) {
                const inputs = {};
                let error = false;

                const re = {
                    email: /\S+@\S+\.\S+/
                }

                if (re.email.test(this.inputs.email.content)) {
                    this.inputs.email.error.message = null;
                    this.inputs.email.error.active = false;

                    inputs.email = this.inputs.email.content;
                } else {
                    this.inputs.email.error.message = 'Please enter a valid email address.';
                    this.inputs.email.error.active = true;

                    error = true;
                }

                if (this.inputs.password.content) {
                    inputs.password = this.inputs.password.content;
                } else {
                    this.inputs.password.error.message = 'Please enter a password.';
                    this.inputs.password.error.active = true;

                    error = true;
                }

                if (mode === 'sign-up') {
                    if (this.inputs.username.content) {
                        inputs.username = this.inputs.username.content;
                    } else {
                        this.inputs.username.error.message = 'Please enter a username.';
                        this.inputs.username.error.active = true;

                        error = true;
                    }
                }

                this.inputs.validated = true;

                if (!error && inputs) {
                    return inputs;
                } else {
                    return false;
                }
            },
            authSubmit () {
                const self = this;

                if (!self.submitting.active && !self.submitting.fallback) {
                    const inputs = self.validateAuthInputs(self.mode);

                    if (inputs) {
                        self.submitting.active 		= true;
                        self.submitting.fallback 	= true;

                        setTimeout(function () {
                            self.submitting.fallback = false;
                        }, 500);

                        if (!self.sso || !self.sso.enable) {
                            self.$store.dispatch('session/authAction', { mode: self.mode, inputs })
                                .then((response) => {
                                    // respond
                                }, (error) => {
                                    if (error && error.response) {
                                        if (error.response.status && (error.response.status === 400 || error.response.status === 401)) {
                                            self.inputs.error.message = 'You have entered an invalid username and / or password.';
                                            self.inputs.error.active = true;
                                        } else if (error.response.data.detail) {
                                            self.inputs.error.message = error.response.data.detail;
                                            self.inputs.error.active = true;
                                        } else {
                                            self.inputs.error.message = 'An internal server error occured. Please try again later.';
                                            self.inputs.error.active = true;
                                        }
                                    } else {
                                        self.inputs.error = 'An internal server error occured. Please try again later.';
                                        self.inputs.error.active = true;
                                    }

                                    self.submitting.active = false;

                                    return self.submitting.active;
                                });
                        } else {
                            // sso
                        }
                    }
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    #modal-mask
        position: fixed
        z-index: 9998
        top: 0
        left: 0
        background-color: rgba(0, 0, 0, .6)
        display: table
        $animation-name: unique-id()
        animation-name: $animation-name
        animation-duration: 100ms

        @keyframes #{$animation-name}
            from
                opacity: 0
            to
                opacity: 1

        #modal-wrapper
            display: table-cell
            vertical-align: middle

            #modal-container
                width: 95%
                max-width: 500px
                margin: 0px auto
                border: 2px solid
                border-radius: 5px
                transition: all .3s ease
                overflow: hidden

                #modal-header
                    display: block
                    text-align: center
                    border-bottom: none
                    padding: 30px 0 20px 0
                    border-bottom: 2px solid
                    width: 100%
                    max-width: 400px
                    margin: 0 auto

                    .header-sub
                        margin-top: 10px

                #modal-body
                    max-width: 400px
                    margin: 0 auto
                    padding: 30px 0
                    text-align: center

                    #email-auth
                        max-width: 400px
                        text-align: left
                        margin: 0 auto

                        .form-submit
                            display: flex
                            align-items: center
                            justify-content: space-between
                            margin-top: 25px

                            .auth-mode a
                                cursor: pointer
                                font-weight: 700

                                &:hover, &:focus, &:active
                                    text-decoration: underline

                    #auth-options
                        margin: 0
                        margin-top: 30px
                        padding-top: 20px
                        border-top: 2px solid

                        .auth-option
                            display: flex
                            align-items: center
                            justify-content: center
                            cursor: pointer
                            border: 2px solid
                            border-radius: 2px
                            max-width: 31%
                            margin: 0 1.166666665%
                            height: 50px
                            margin: 10px auto

                            .auth-option-icon
                                height: 20px
                                width: 20px
                                fill: var(--text-1)

                            span
                                margin-left: 10px

                            &#auth-google
                                border-color: #4285F4

                                &:hover, &:focus, &:active
                                    background: #4285F4

                            &#auth-steam
                                border-color: #171a21

                                &:hover, &:focus, &:active
                                    background: #171a21

                            &#auth-discord
                                border-color: #7289DA

                                &:hover, &:focus, &:active
                                    background: #7289DA

    /* Transition */

    .modal-enter
        opacity: 0

    .modal-leave-active
        opacity: 0

    .modal-enter #modal-container,
    .modal-leave-active #modal-container
        -webkit-transform: scale(1.1)
        transform: scale(1.1)
</style>