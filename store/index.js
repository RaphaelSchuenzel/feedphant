const actions = {
    async nuxtServerInit ({ dispatch }, { req }) {
        await dispatch('hub/getHub');
        await dispatch('boards/getBoards');
    }
}

export default {
    actions
}