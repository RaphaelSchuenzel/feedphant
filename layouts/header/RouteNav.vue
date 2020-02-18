<template>
    <div id="sidebar" class="bdc-background-shade w-100">
        <div id="sidebar-inner" class="h-100 w-100">
            <div id="sidebar-nav" class="h-100 w-100 c-text-1">
                <nuxt-link to="/" class="sidebar-nav-item fs-16 h-bc-background-shade" exact-active-class="c-primary bc-background-shade bdc-primary sidebar-nav-item-active">
                    <i class="material-icons fs-24">home</i>
                    <span>Home</span>
                </nuxt-link>

                <div id="sidebar-nav-boards" class="w-100 sidebar-nav-section">
                    <div v-bind:class="['sidebar-nav-item sidebar-nav-item-collapse sidebar-nav-section-head fs-16', { 'c-primary sidebar-nav-item-active': $route.fullPath.includes('board/') }]" @click="collapse.board = !collapse.board">
                        <div class="collapse-content">
                            <i class="material-icons">forum</i>
                            <span>Feedback</span>
                        </div>

                        <div class="collapse-indicator">
                            <i v-if="collapse.board" class="material-icons">keyboard_arrow_up</i>
                            <i v-else-if="!collapse.board" class="material-icons">keyboard_arrow_down</i>
                        </div>
                    </div>

                    <div v-if="collapse.board" class="sidebar-nav-section-collapse w-100">
                        <nuxt-link
                            v-if="board.title"
                            v-for="board in boards"
                            v-bind:key="board.title"
                            :to=" '/board/' + board.name "
                            class="sidebar-nav-item sidebar-nav-section-item fs-16 h-bc-background-shade"
                            active-class="c-primary bc-background-shade bdc-primary sidebar-nav-item-active"
                        >
                            <span>{{ board.title }}</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        props: {
            'page': {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data () {
            return {
                select: {
                    board: this.getActiveBoard()
                }
            }
        },
        computed: {
            boards () {
                return this.$store.state.boards.data;
            },
            activeBoard () {
                const self = this;

                if (self.boards && self.boards.length > 0) {
                    if (self.$route.params.board && self.$route.params.board != null) {
                        const item = self.boards.find(function (el) {
                            return el.name === self.$route.params.board;
                        });

                        return item;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        },
        watch: {
            '$route.params' (newVal, oldVal) {
                if (newVal !== oldVal && newVal.board) {
                    this.select.board = this.getActiveBoard();

                    return this.select.board;
                }
            }
        },
        methods: {
            getActiveBoard () {
                return this.$route.params.board || false;
            }
        }
    }
</script>

<style scoped>
    #sidebar {
        position: relative;
        height: calc(100% - 80px);
        border-right: 1px solid;
        overflow: hidden;
    }

    /* Sidebar Inner */

    /* Nav */

    #sidebar-nav {
        margin: 0;
        padding: 20px 0;
    }

    #sidebar-nav .sidebar-nav-item {
        display: block;
        cursor: pointer;
        color: inherit;
        height: 55px;
        line-height: 55px;
        padding: 0 10px 0 25px;
        text-decoration: none;
        border-left: 3px solid transparent;
        margin: 10px 0;
    }

    #sidebar-nav .sidebar-nav-item.sidebar-nav-item-collapse {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0;
    }

    #sidebar-nav .sidebar-nav-item .material-icons {
        margin-right: 10px;
        vertical-align: middle;
    }

    #sidebar-nav .sidebar-nav-item.sidebar-nav-item-collapse .collapse-indicator .material-icons {
        margin-right: 0;
    }

    #sidebar-nav .col {
        padding: 0;
    }

    /* Nav Sections */

    #sidebar-nav .sidebar-nav-section .sidebar-nav-section-item {
        margin-left: 30px;
        padding: 0 10px 0 calc(25px  + 10px);
    }
</style>