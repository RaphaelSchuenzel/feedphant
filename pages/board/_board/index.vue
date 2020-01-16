<template>
    <div id="board">
        <div class="board-header">
            <div class="board-title fs-24 c-text-1">
                <nuxt-link to="/" class="c-text-2 h-c-text-1">
                    <i class="material-icons">arrow_back_ios</i>
                </nuxt-link>

                <span>{{ board.title }}</span>
            </div>

            <div class="board-actions">
                <a :id="filter.id" v-bind:class="['btn c-text-1 bc-background bdc-background-shade h-bc-background-shade h-bdc-primary c-c-primary-contrast c-bc-primary', { 'bc-background-shade': filter.active }]" v-for="filter in filters">
                    <i class="material-icons">{{ filter.icon }}</i>
                    <span class="text">{{ filter.title }}</span>
                </a>
            </div>
        </div>

        <div id="posts" v-if="board.posts" class="bdc-background-shade">
            <div id="posts-loader" v-if="loadingFallback || (board.post_count > 0 && posts.length === 0)" class="loader-wrapper">
                <div class="loader-inner">
                    <div class="loader loader-1" />
                </div>
            </div>

            <div id="posts-placeholder" v-else-if="board.post_count === 0">
                <h1 class="c-text-1 fs-24 text-center c-text-1">There's nothing here. :(</h1>

                <p class="text-center fs-16 c-text-2">
                    </br> Nobody has created a post within this board yet. </br></br>
                    
                    To create a new post, simply click the <strong>"New"</strong> button.
                </p>
            </div>

            <div id="posts-view" v-else class="row w-100">
                <div v-for="post in board.posts" :key="post.id" class="post col-6 row bc-background">
                    <div class="post-vote h-100 bdc-background-shade h-bc-background-shade h-bdc-primary col">
                        <div class="post-vote-inner">
                            <i class="post-vote-icon material-icons fs-48 c-text-1">arrow_drop_up</i>
                            <p v-if="post.vote_count != null" class="post-vote-count fs-18 c-text-2">{{ post.vote_count }}</p>
                        </div>
                    </div>
                    <nuxt-link :to="$route.fullPath + '/post/' + post.id" class="post-view col row h-100">
                        <div class="post-content h-100 col">
                            <h1 v-if="post.title" class="post-content-title fs-16 c-text-1">{{ post.title }}</h1>
                            <p v-if="post.state != null" class="post-content-state fs-14 c-primary">{{ post.state }}</p>
                            <p v-if="post.content" class="post-content-desc fs-14 c-text-2">{{ getPostContentString(post.content) }}</p>
                        </div>
                        <div class="post-comment h-100 col">
                            <i class="post-comment-icon material-icons c-text-2">comment</i>
                            <p v-if=" post.comment_count != null" class="post-comment-count fs-14 c-text-2">{{ post.comment_count }}</p>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Board',
        data () {
            return {
                loadingFallback: false,
                filters: [
                    {
                        id: 'filter-sort-top',
                        icon: 'poll',
                        title: 'Top',
                        active: true
                    },
                    {
                        id: 'filter-sort-trending',
                        icon: 'trending_up',
                        title: 'Trending',
                        active: false
                    },
                    {
                        id: 'filter-sort-latest',
                        icon: 'new_releases',
                        title: 'Latest',
                        active: false
                    }
                ]
            }
        },
        computed: {
            page () {
                return this.$store.state.hub.data;
            },
            boards () {
                return this.$store.state.boards.data;
            },
            board () {
                const self = this;

                if (self.boards && self.boards.length > 0) {
                    const item = self.boards.find(function (el) {
                        return el.name === self.$route.params.board;
                    });

                    if (item) {
                        return item;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            },
            posts () {
                const board = this.board;

                if (board && board.posts) {
                    return board.posts;
                } else {
                    return false;
                }
            }
        },
        watch: {
            '$route' () {
                const self = this;

                if (self.board && (self.board.post_count > 0) && self.posts.length === 0) {
                    self.$store.dispatch('boards/getBoardPosts', {
                        url: window.location.hostname,
                        filters: { board: self.board, limit: { from: 0, to: 20 } }
                    });

                    self.loadingFallback = true;

                    setTimeout(function () {
                        self.loadingFallback = false;
                    }, 500);
                }
            }
        },
        mounted () {
            const self = this;

            if (self.board && (self.board.post_count > 0) && self.posts.length === 0) {
                self.$store.dispatch('boards/getBoardPosts', {
                    url: window.location.hostname,
                    filters: { board: self.board, limit: { from: 0, to: 20 } }
                });

                self.loadingFallback = true;

                setTimeout(function () {
                    self.loadingFallback = false;
                }, 500);
            }
        },
        methods: {
            getPostContentString (string) {
                if (string.length >= 135) {
                    return (string.substring(0, 135) + '...');
                } else {
                    return string;
                }
            }
        }
    }
</script>

<style scoped>
    #board {
        max-width: 1300px;
        margin: 0 auto;
        padding: 40px 0;
    }

    /* Board Header */

    #board .board-header {
        display: flex;
        justify-content: space-between;
        padding: 0 2%;
    }

        /* Board Title */

        #board .board-header .board-title .material-icons, #board .board-header .board-title span {
            vertical-align: middle;
        }

        #board .board-header .board-title span {
            font-weight: 500;
            margin-left: 5px;
        }

        /* Board Actions */

        #board .board-header .board-actions #filter-sort {
            margin-right: 15px;
        }

    #posts {
        border-top: 2px solid;
        margin: 0;
        margin-top: 20px;
        padding-top: 20px;
    }

    #posts #posts-loader {
        margin: 30px auto;
    }

    #posts #posts-view {
        margin: 0 auto;
    }

    #posts .post {
        height: 145px;
        padding: 0;
        max-width: 48%;
        margin: 10px 1%;
        padding: 15px 20px;
        text-decoration: none;
        border-radius: 2px;
        overflow: hidden;
    }

        /* Post Vote Action */
        
        #posts .post .post-vote {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            border: 2px solid;
            border-radius: 2px;
            width: 90px;
            max-width: 90px;
            min-width: 90px;
        }

        #posts .post .post-vote .post-vote-count {
            margin-top: -20px;
        }

        /* Post View */

        #posts .post .post-view {
            margin: 0;
            padding: 0;
            text-decoration: none;
        }

            /* Post Content */

            #posts .post .post-content {
                padding: 15px 30px 0 30px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            #posts .post .post-content .post-content-title {
                font-weight: 500;
                margin-bottom: 2px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            #posts .post .post-content .post-content-state {
                display: inline-block;
                margin-bottom: 5px;
            }

            /* Post Comment */

            #posts .post .post-comment {
                width: 60px;
                min-width: 60px;
                max-width: 60px;
                padding: 15px 0;
                text-align: center;
                overflow: hidden;
            }
</style>