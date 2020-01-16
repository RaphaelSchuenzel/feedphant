const actions = {
    async nuxtServerInit ({ dispatch }, { req }) {
        const hostname = req.hostname;

        if (hostname) {
            await dispatch('hub/getHub', { url: hostname });
            await dispatch('boards/getBoards', { url: hostname });
        } else {
            return 'No hostname specified.';
        }
    }
}

export default {
    actions
}