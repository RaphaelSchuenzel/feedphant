const state = () => ({
    data: [],
    loaded: false
})

const actions = {
    getBoards ({ commit, rootState }, { url }) {
        return new Promise((resolve, reject) => {
            this.$api.get(`hub/${url}/boards`)
                .then((payload) => {
                    commit('setBoards', payload)

                    resolve(payload);
                }, (error) => {
                    // handle error
                    reject(error);
                })
        });
    },
    getBoardPosts ({ commit, rootState }, { url, filters }) {
        if (filters && (filters.board && filters.board.id) && (filters.limit && (filters.limit.from != null) && (filters.limit.to != null))) {
            this.$api.get(`hub/${url}/boards/${filters.board.id}/posts/${filters.limit.from}/${filters.limit.to}`)
                .then((payload) => {
                    commit('setBoardPosts', { payload, board: filters.board })
                }, (error) => {
                    // handle error
                    return error;
                })
        } else {
            // handle error
            return false;
        }
    },
    getBoardPostComments ({ commit, rootState }, { url, filters }) {
        if (rootState.boards.loaded && filters && (filters.board && filters.board.id) && (filters.post && filters.post.id) && (filters.limit && (filters.limit.from != null) && (filters.limit.to != null))) {
            this.$api.get(`hub/${url}/boards/${filters.board.id}/posts/${filters.post.id}/comments/${filters.limit.from}/${filters.limit.to}`)
                .then((payload) => {
                    commit('setBoardPostComments', {
                        data: payload.data,
                        board: filters.board,
                        post: filters.post
                    })
                }, (error) => {
                    // handle error
                    return error;
                })
        } else {
            // handle error
            return false;
        }
    }
}

const mutations = {
    setBoards (state, payload) {
        state.data = payload.data;
        state.loaded = true;

        return state.loaded;
    },
    setBoardPosts (state, { payload, board }) {
        const index = state.data.findIndex(item => item.id === board.id);
        state.data[index].posts = payload.data;

        return state.data[index].posts;
    },
    setBoardPostComments (state, payload) {
        if (payload.data && payload.board && payload.post) {
            const board = state.data.find(function (el) {
                return el.id === payload.board.id;
            });

            if (board) {
                const post = board.posts.find(function (el) {
                    return el.id === payload.post.id;
                });

                post.comments = {};

                post.comments.data = payload.data;
                post.comments.loaded = true;

                return post.comments;
            } else {
                // handle error
            }
        }
    }
}

export default {
    state,
    actions,
    mutations
}