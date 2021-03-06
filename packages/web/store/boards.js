const state = () => ({
    data: [],
    loaded: false
})

const actions = {
    getBoards ({ commit, rootState }) {
        return new Promise((resolve, reject) => {
            this.$api.get(`boards`)
                .then((payload) => {
                    commit('setBoards', payload)

                    resolve(payload);
                }, (error) => {
                    // handle error
                    reject(error);
                })
        });
    },
    getBoardPosts ({ commit, rootState }, { filters }) {
        if (filters && (filters.board && filters.board.id) && (filters.limit && (filters.limit.from != null) && (filters.limit.to != null))) {
            this.$api.get(`boards/${filters.board.id}/posts/${filters.limit.from}/${filters.limit.to}`)
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
    getBoardPostComments ({ commit, rootState }, { filters }) {
        if (rootState.boards.loaded && filters && (filters.board && filters.board.id) && (filters.post && filters.post.id) && (filters.limit && (filters.limit.from != null) && (filters.limit.to != null))) {
            this.$api.get(`boards/${filters.board.id}/posts/${filters.post.id}/comments/${filters.limit.from}/${filters.limit.to}`)
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

        const posts = [...payload.data];

        posts.forEach((post) => {
            post.comments = {};

            post.comments.data = {};
            post.comments.loaded = false;
        });

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