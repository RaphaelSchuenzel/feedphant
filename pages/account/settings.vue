
<template>
    <div id="account-settings" class="h-100 w-100">
        <h1>Account Settings</h1>
    </div>
</template>

<script>
    export default {
        name: 'AccountSettings',
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
            'user': {
                type: Object,
                default: () => {
                    return {};
                }
            }
        }
    }
</script>

<style scoped>

</style>