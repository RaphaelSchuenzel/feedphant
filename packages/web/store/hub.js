const state = () => ({
    data: {},
    loaded: false
})

const actions = {
    getHub ({ commit, dispatch, rootState }) {
        return new Promise((resolve, reject) => {
            this.$api.get(`/`)
                .then((payload) => {
                    commit('setHub', payload)

                    resolve(payload);
                }, (error) => {
                    // handle error
                    reject(error);
                })
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