<template>
    <div id="notes" class="bc-background-shade">
        <CookieNote v-if="notes.cookies" :page="page" @close="notes.cookies = false" />
    </div>
</template>

<script>
    import CookieNote from '../components/notes/Cookies.vue'

    export default {
        name: 'FooterContent',
        components: {
            CookieNote
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
            },
            'notes': {
                type: Object,
                default: () => {
                    return {};
                }
            }
        }
    }
</script>

<style scoped>
    #notes {
        height: 68px;
    }
</style>