
<template>
    <transition id="cookies" name="note">
        <div class="bc-background-shade note-holder h-100 w-100">
            <div class="note-wrapper c-text-1">
                <p class="note-description fs-14">
                    <strong>This page is powered by Patchnote.</strong> Patchnote uses cookies to improve your experience. By using the service, you agree to our usage of cookies. For more information, simply click here.
                </p>

                <div class="note-close c-text-1 h-c-primary c-c-primary">
                    <i class="material-icons fs-24">close</i>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Cookies',
        props: {
            'page': {
                type: Object,
                default: () => {
                    return {};
                }
            }
        }
    }
</script>

<style scoped>
    .note-holder {
        position: relative;
        left: 0;
        bottom: 0;
        z-index: 100;
    }

    .note-holder .note-wrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        z-index: 100;
        height: 68px;
        padding: 0 15px;
        max-width: 1330px;
        overflow: hidden;
    }

    .note-holder .note-wrapper .note-close {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .note-holder .note-wrapper .note-close i {
        vertical-align: top;
    }

    /* Responsive */

    /* Resolution equal or lower than 1200px */

    @media only screen and (max-width: 300px) {
        .note-holder .note-wrapper {
            padding: 10px 39px 10px 10px;
            border: 2px solid;
            border-radius: 5px;
            overflow: hidden;
        }
    }
</style>