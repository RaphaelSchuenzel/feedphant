<template>
    <div id="post">
        <div id="post-loader" v-if="loadingFallback" class="loader-wrapper">
            <div class="loader loader-1" />
        </div>

        <div v-else-if="!loadingFallback">
            <div id="post-inner" class="bdc-background-shade">
                <div class="row">
                    <div class="post-vote-holder col-2">
                        <div class="post-vote bdc-background-shade h-bc-background-shade h-bdc-primary w-100">
                            <div class="post-vote-inner">
                                <i class="post-vote-icon material-icons fs-48 c-text-1">arrow_drop_up</i>
                                <p v-if="post.vote_count != null" class="post-vote-count fs-18 c-text-2">{{ post.vote_count }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-10">
                        <h1 class="post-title c-text-1 fs-24">{{ post.title }}</h1>
                        <p class="post-state c-primary fs-16">{{ post.state }}</p>

                        <p class="post-content c-text-2 fs-16">{{ post.content }}</p>
                    </div>
                </div>

                <div id="post-comments" class="w-100 bdc-background-shade">
                    <h1 id="post-comments-head" class="c-text-1 fs-16">
                        {{ post.comment_count }}
                        <span v-if="post.comment_count !== 1">Comments</span>
                        <span v-else>Comment</span>
                    </h1>

                    <div id="post-comments-create-wrapper">
                        <p id="post-comments-create-login" v-if="!session.authenticated" class="c-text-2">You must log in to comment.</p>

                        <div id="post-comments-create" v-else class="form-group row">
                            <div id="post-comments-create-avatar" class="col">
                                <!-- user avatar -->
                            </div>
                            <div id="post-comments-create-input" class="col">
                                <textarea id="create-comment-input" class="form-control c-text-1 bc-background" rows="5" placeholder="What are your thoughts?" />
                            </div>
                        </div>
                    </div>

                    <div id="post-comments-holder" class="bc-background">
                        <div v-if="post.comment_count > 0 && !post.comments || post.comments && !post.comments.loaded" class="loader-wrapper">
                            <div class="loader loader-1" />
                        </div>

                        <div v-else-if="post.comments && post.comments.loaded && post.comments.data.length > 0">
                            <div v-for="comment in post.comments.data" class="post-comment bdc-background-shade row">
                                <div class="post-comment-sidebar col">
                                    <img :src="comment.owner.avatar" class="post-comment-author-avatar">
                                </div>

                                <div class="post-comment-content col">
                                    <p class="post-comment-head fs-14 c-text-1">
                                        <strong class="post-comment-author-username">{{ comment.owner.username }}</strong>
                                        <span class="post-comment-date fs-12 c-text-2">
                                            {{ $moment(comment.created_at).fromNow() }}
                                            <span v-if="comment.created_at !== comment.updated_at">&middot; Edited {{ $moment(comment.updated_at).fromNow() }}</span>
                                        </span>
                                    </p>
                                    
                                    <p class="post-comment-message fs-14 c-text-1">{{ comment.content }}</p>
                                </div>
                            </div>
                        </div>

                        <p v-else class="c-text-2 fs-14">
                            Nobody has left a comment on this post yet. <u>Leave the first one!</u>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Other Posts -->
            <!-- Note: WIP / Concept. Not in working state, removed for now. -->

            <!-- <div id="other-posts" v-if="featured" class="bdc-background-shade">
                <h1 id="other-posts-head" class="fs-18 c-text-1">Featured Posts</h1>

                <div id="other-posts-inner" class="h-100 w-100">
                    <div v-for="featuredPost in featured" :key="post.id" class="post col-12 row bc-background">
                        <div class="post-vote h-100 bdc-background-shade h-bc-background-shade h-bdc-primary col">
                            <div class="post-vote-inner">
                                <i class="post-vote-icon material-icons fs-48 c-text-1">arrow_drop_up</i>
                                <p v-if="featuredPost.vote_count != null" class="post-vote-count fs-18 c-text-2">{{ featuredPost.vote_count }}</p>
                            </div>
                        </div>
                        <nuxt-link :to="$route.fullPath + '/post/' + featuredPost.id" class="post-view col row h-100">
                            <div class="post-content h-100 col">
                                <h1 v-if="featuredPost.title" class="post-content-title fs-16 c-text-1">{{ featuredPost.title }}</h1>
                                <p v-if="featuredPost.state != null" class="post-content-state fs-14 c-primary">{{ featuredPost.state }}</p>
                                <p v-if="featuredPost.content" class="post-content-desc fs-14 c-text-2">{{ getPostContentString(featuredPost.content) }}</p>
                            </div>
                            <div class="post-comment h-100 col">
                                <i class="post-comment-icon material-icons c-text-2">comment</i>
                                <p v-if="featuredPost.comment_count != null" class="post-comment-count fs-14 c-text-2">{{ featuredPost.comment_count }}</p>
                            </div>
                        </nuxt-link>
                    </div>
                </div>

                <div id="other-posts-more" v-if="(board.post_count - (4 + 1 + 1)) > 0" class="h-100 w-100 bc-background bdc-background-shade">
                    <div id="other-posts-more-inner">
                        <h1 class="fs-18 c-text-1">Explore {{ (board.post_count - (4 + 1 + 1)) }}+ More Posts!</h1>

                        <nuxt-link :to=" '/board/' + board.name " class="btn btn-large c-text-1 bdc-background-shade h-bc-background-shade h-bdc-primary">View More</nuxt-link>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Post',
        data () {
            return {
                loadingFallback: true
            }
        },
        computed: {
            page () {
                return this.$store.state.hub.data;
            },
            session () {
                return this.$store.state.session;
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

            /* 
                Note: Will break when refreshing if the requested post is not part of the initial board posts API response.
            
                This is, due to the initial board posts request only requesting the first 20 posts for the given filter.

                Possible solutions:
                - A seperate GET API call for the specifically requested post (would possibly need a seperate API route)
                - A seperate GET API call for a range of posts starting from the requested post on.
            */
            post () {
                const self = this;

                if (self.board && self.board.posts && self.board.posts.length > 0) {
                    const item = self.board.posts.find(function (el) {
                        return el.id === parseInt(self.$route.params.post);
                    });

                    if (item) {
                        return item;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            /* Note: WIP / Concept. Not in working state, removed for now. */
            /* featured () {
                const self = this;

                if (self.board && self.board.posts && self.board.posts.length > 0) {
                    let i;
                    let limit = 4;
                    const featured = [];

                    if (self.board.posts.length < 4) {
                        limit = (self.board.posts.length - 1);
                    }

                    for (i = 0; i < limit;) {
                        const item = self.board.posts[Math.floor(Math.random() * self.board.posts.length)];

                        if (!item || (item && item.id === self.post.id) || featured.includes(item)) {
                            continue;
                        } else {
                            featured[i] = item;
                            i++;
                        }
                    }

                    return featured;
                } else {
                    return false;
                }
            } */
        },
        watch: {
            '$route.fullPath' () {
                const self = this;

                self.loadingFallback = true;

                setTimeout(function () {
                    self.loadingFallback = false;
                }, 500);
            },
            post (newVal, oldVal) {
                const self = this;
                
                if (self.board && self.post && self.post.comment_count > 0 && newVal && newVal.id && newVal !== oldVal) {
                    self.$store.dispatch('boards/getBoardPostComments', {
                        url: window.location.hostname,
                        filters: {
                            board: self.board,
                            post: self.post,
                            limit: { from: 0, to: 20 }
                        }
                    });
                }
            }
        },
        mounted () {
            const self = this;

            self.loadingFallback = true;

            if (self.board) {
                if (self.board.post_count > 0) {
                    if (self.board.posts.length === 0) {
                        self.$store.dispatch('boards/getBoardPosts', {
                            url: window.location.hostname,
                            filters: { board: self.board, limit: { from: 0, to: 20 } }
                        });
                    }

                    if (self.post && self.post.comment_count > 0) {
                        self.$store.dispatch('boards/getBoardPostComments', {
                            url: window.location.hostname,
                            filters: {
                                board: self.board,
                                post: self.post,
                                limit: { from: 0, to: 20 }
                            }
                        });
                    }

                    setTimeout(() => {
                        self.loadingFallback = false;
                    }, 500);
                }
            }
        },
        methods: {
            getPostContentString (string) {
                if (string.length >= 100) {
                    return (string.substring(0, 100) + '...');
                } else {
                    return string;
                }
            }
        }
    }
</script>

<style scoped>
    #post {
        padding: 30px 0;
        margin: 0 auto;
        max-width: 1100px;
    }

    /* Loader */

    #post #post-loader {
        height: 250px;
    }

    /* Post Content */

    #post-inner, #other-posts {
        padding-top: 30px;
    }

    #post-inner {
        padding: 30px 0;
        margin: 0 auto;
    }

        /* Post Vote */

        #post-inner .post-vote-holder {
            padding: 0;
        }

        #post-inner .post-vote {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 135px;
            max-width: 120px;
            border: 2px solid;
            border-radius: 5px;
        }

        #post-inner  .post-vote .post-vote-count {
            margin-top: -20px;
        }

        /* Post Content */

        #post-inner .post-content {
            margin-top: 10px;
        }

        /* Post Comments */

        #post-comments {
            display: block;
            padding: 30px 0;
            margin-top: 50px;
            border-top: 2px solid;
        }

        #post-comments-create-login {
            margin-top: 10px;
            padding: 10px 0;
        }

        #post-comments-holder {
            margin-top: 20px;
            padding: 15px 20px;
        }

        #post-comments-holder .loader-wrapper {
            margin: 30px auto;
        }

        #post-comments-holder .post-comment {
            padding: 10px 10px;
            margin: 0 0 15px 0;
            border-top: 1px solid;
        }

        #post-comments-holder .post-comment:nth-child(1) {
            border-top: none;
        }

        #post-comments-holder .post-comment .post-comment-sidebar {
            padding: 5px 10px;
            max-width: 80px;
            min-width: 80px;
            overflow: hidden;
        }

            #post-comments-holder .post-comment .post-comment-sidebar .post-comment-author-avatar {
                display: block;
                height: 64px;
                width: 64px;
                object-fit: cover;
                border-radius: 50px;
            }

        #post-comments-holder .post-comment .post-comment-content {
            margin-left: 15px;
            vertical-align: top;
            padding: 4px 10px;
        }

            #post-comments-holder .post-comment .post-comment-content .post-comment-head .post-comment-date {
                margin-left: 5px;
            }

            #post-comments-holder .post-comment .post-comment-content .post-comment-message {
                margin-top: 5px;
            }

    /* Other Posts */
    /* Note: WIP / Concept. Not in working state, removed for now. */

    /*

    #other-posts {
        border-top: 2px solid;
        margin-top: 20px;
        margin-bottom: 20px;
        overflow: hidden;
    }

    */

        /* Head

        #other-posts #other-posts-head {
            font-weight: 400;
            text-align: center;
            margin-bottom: 30px;
        }

        */

        /* Inner

        #other-posts #other-posts-inner {
            position: relative;
        }

        */

            /* Featured Posts

            #other-posts #other-posts-more {
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 500;
                border: 2px dashed;
                margin-top: 20px;
                padding: 30px 20px;
                text-align: center;
            }

                #other-posts #other-posts-more h1 {
                    margin-bottom: 15px;
                }
            
            */

                /* Featured Posts Button
                
                #other-posts #other-posts-more .btn {
                    border: 2px solid;
                }

                 */

            /* Post

            #other-posts .post {
                height: 145px;
                padding: 0;
                margin: 10px 0;
                padding: 15px 20px;
                text-decoration: none;
                border-radius: 2px;
                overflow: hidden;
            }

            */

                /* Post Vote Action
                
                #other-posts .post .post-vote {
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

                #other-posts .post .post-vote .post-vote-count {
                    margin-top: -20px;
                }

                */

                /* Post View

                #other-posts .post .post-view {
                    margin: 0;
                    padding: 0;
                    text-decoration: none;
                }

                */

                    /* Post Content

                    #other-posts .post .post-content {
                        padding: 15px 30px 0 30px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    #other-posts .post .post-content .post-content-title {
                        font-weight: 500;
                        margin-bottom: 2px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    #other-posts .post .post-content .post-content-state {
                        display: inline-block;
                        margin-bottom: 5px;
                    }

                    */

                    /* Post Comment

                    #other-posts .post .post-comment {
                        width: 60px;
                        min-width: 60px;
                        max-width: 60px;
                        padding: 15px 0;
                        text-align: center;
                        overflow: hidden;
                    }

                    */
</style>