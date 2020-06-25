<template>
    <div id="feedback" class="h-100 w-100">
        <div id="feedback-inner" class="w-100">
            <h1 class="head fs-32 c-primary">Feedback</h1>
            <p class="subhead fs-24 c-text-1">Choose a category to view feedback posts in.</p>

            <section id="boards" class="w-100 bdc-background-shade">
                <div v-if="boards && boards.length > 0" class="row">
                    <nuxt-link v-for="board in boards" v-bind:key="board.title" :to=" '/feedback/' + board.name " class="board bc-background bdc-background-shade h-bc-background-shade h-bdc-primary h-bs-m">
                        <h1 v-if="board.title" class="fs-24 c-text-1">{{ board.title }}</h1>
                        <p v-if="board.post_count != null" class="fs-16 c-text-2">{{ board.post_count }} Posts</p>
                    </nuxt-link>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            page () {
                return this.$store.state.hub.data;
            },
            session () {
                return this.$store.state.session;
            },
            boards () {
                return this.$store.state.boards.data;
            }
        }
    }
</script>

<style scoped>
    #feedback {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #feedback .head, #feedback .subhead {
        text-align: center;
        max-width: 760px;
        margin: 0 auto;
    }

    #feedback .subhead {
        margin-top: 20px;
    }

    #feedback section .section-head {
        display: block;
        text-align: center;
        font-weight: 400;
        margin-bottom: 20px;
    }

    #feedback #boards {
        max-width: 900px;
        margin: 0 auto;
        margin-top: 60px;
        border-top: 1px solid;
        padding: 30px 0 0 0;
    }

    #feedback #boards .board {
        padding: 40px 20px;
        text-align: center;
        text-decoration: none;
        margin-bottom: 20px;
        width: 100%;
        border: 2px solid;
        border-radius: 5px;
    }

    #feedback #boards .board p {
        margin-top: 10px;
    }
</style>