const state = () => ({
    data: {},
    loaded: false
})

const actions = {
    getHub ({ commit, dispatch, rootState }, { url }) {
        return new Promise((resolve, reject) => {
            if (url) {
                this.$api.get(`hub/${url}`)
                    .then((payload) => {
                        commit('setHub', payload)

                        resolve(payload);
                    }, (error) => {
                        // handle error
                        reject(error);
                    })
            } else if (!url) {
                const errorMessage = 'No Hub URL specified.'

                reject(errorMessage);
            }
        });
    }
}

const mutations = {
    setHub (state, payload) {
        state.data = payload.data;
        state.loaded = true;

        return state.loaded;
    }
}

export default {
    state,
    actions,
    mutations
}