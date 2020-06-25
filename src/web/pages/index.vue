<template>
    <div id="landing" class="h-100 w-100">
        <div id="landing-inner" class="w-100">
            <h1 v-if="page && (page.brand && page.brand.name) && page.title" class="head fs-32 c-primary">Welcome to the {{ page.brand.name }} {{ page.title }}!</h1>
            <p v-if="page.description" class="subhead fs-24 c-text-1">{{ page.description }}</p>

            <section id="boards" class="w-100 bdc-background-shade">
                <h1 class="section-head fs-18 c-text-1">Feedback Categories</h1>

                <div v-if="boards && boards.length > 0" class="row">
                    <nuxt-link v-for="board in boards" v-bind:key="board.title" :to=" '/feedback/' + board.name " class="board bc-background bdc-background-shade h-bc-background-shade h-bdc-primary h-bs-m col">
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
    #landing {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #landing .head, #landing .subhead {
        text-align: center;
        max-width: 760px;
        margin: 0 auto;
    }

    #landing .subhead {
        margin-top: 20px;
    }

    #landing section .section-head {
        display: block;
        text-align: center;
        font-weight: 400;
        margin-bottom: 20px;
    }

    #landing #boards {
        max-width: 900px;
        margin: 0 auto;
        margin-top: 60px;
        border-top: 1px solid;
        padding: 30px 0 0 0;
    }

    #landing #boards .board {
        padding: 60px 20px;
        text-align: center;
        text-decoration: none;
        margin: 10px 1%;
        min-width: 31.33%;
        border: 2px solid;
        border-radius: 5px;
    }

    #landing #boards .board p {
        margin-top: 10px;
    }
</style>