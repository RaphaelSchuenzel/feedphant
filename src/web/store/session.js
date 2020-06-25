const state = () => ({
    ready: false,
    authenticated: false,
    access_token: '',
    user: {}
})

const actions = {
    getUser ({ commit, dispatch, rootState }) {
        this.$api.get('/users/me')
            .then((payload) => {
                commit('setUserInfo', payload)
            }, (error) => {
                if (error && error.status) {
                    if (error.status === 401) {
                        dispatch('logoutAction', error)
                    } else {
                        // handle error
                    }
                } else {
                    // handle error
                }
            })
    },
    authAction ({ commit, rootState }, { mode, credentials }) {
        return new Promise((resolve, reject) => {
            if (mode === 'log-in') {
                this.$api.put('/auth/email', {
                    email: credentials.email,
                    password: credentials.password
                })
                    .then((response) => {
                        commit('setAuthSuccess', response.data);

                        resolve();
                    }, (error) => {
                        reject(error);
                    });
            } else if (mode === 'sign-up') {
                this.$api.post('/auth/email', {
                    email: credentials.email,
                    username: credentials.username,
                    password: credentials.password
                })
                    .then((response) => {
                        commit('setAuthSuccess', response.data);

                        resolve();
                    }, (error) => {
                        reject(error);
                    });
            } else {
                const error = 'Invalid Request.';
                
                reject(error);
            }
        });
    },
    logoutAction ({ commit, rootState }) {
        this.$api.delete('/auth/logout')
            .then((payload) => {
                commit('clearAccessToken')
            }, (error) => {
                // handle error

                commit('clearAccessToken')

                return error;
            })
    }
}

const mutations = {
    setUserInfo (state, payload) {
        state.user = payload.data;
        state.ready = true;

        return state.ready;
    },
    setSessionReady (state, payload) {
        state.ready = true;

        return state.ready;
    },
    setAuthSuccess (state, token) {
        localStorage.setItem('access_token', token);

        // refresh page
        // return router.go();
    },
    setAccessToken (state, token) {
        state.access_token = token;
        state.authenticated = true;

        return state.authenticated;
    },
    clearAccessToken (state) {
        localStorage.removeItem('access_token');
        state.authenticated = false;

        return state.authenticated;
    }
}

export default {
    state,
    actions,
    mutations
}