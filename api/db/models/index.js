'use strict';

module.exports = ({ sequelize }) => {
    return {
        boards: sequelize.import('./board'),
        boardPosts: sequelize.import('./board/post'),
        boardPostStates: sequelize.import('./board/post/state'),
        boardPostVotes: sequelize.import('./board/post/vote'),
        boardPostComments: sequelize.import('./board/post/comment'),
        boardPostCommentVotes: sequelize.import('./board/post/comment/vote'),
        hub: sequelize.import('./setting'),
        hubBrand: sequelize.import('./setting/brand'),
        subscriptions: sequelize.import('./subscription'),
        users: sequelize.import('./user'),
        userAuth: sequelize.import('./user/auth')
    }
}