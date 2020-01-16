
<template>
    <transition id="cookies" name="note">
        <div class="note-holder w-100">
            <div class="note-wrapper c-text-1 bc-background bdc-primary">
                <div class="note-close bdc-background-shade h-c-background h-bc-primary h-bdc-primary">
                    <i class="material-icons fs-16">close</i>
                </div>

                <p class="note-description fs-14">
                    <strong>This page is powered by Patchnote.</strong> Patchnote uses cookies to improve your experience. By using the service, you agree to our usage of cookies. For more information, simply click here.
                </p>
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
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .note-holder .note-wrapper {
        position: relative;
        margin: 0 auto;
        margin-bottom: 20px;
        z-index: 100;
        padding: 15px 50px 15px 30px;
        border: 2px solid;
        border-radius: 2px;
        max-width: 900px;
        overflow: hidden;
    }

    .note-holder .note-wrapper .note-close {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 8px;
        right: 8px;
        height: 28px;
        width: 28px;
        border: 2px solid;
        border-radius: 5px;
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