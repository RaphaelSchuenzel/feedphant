<template>
    <div id="footer-content" class="bc-background bdc-background-shade">
        <div id="footer-content-inner">
            <p id="watermark" class="w-100 c-text-2 fs-12">
                Powered by <a>Patchnote</a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FooterContent',
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
    #footer-content {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        height: 80px;
        border-top: 1px solid;
        border-right: 1px solid;
    }

    #footer-content #watermark {
        text-align: center;
    }
</style>