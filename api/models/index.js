'use strict';

const { Sequelize } = require('sequelize');

module.exports = ({ sequelize }) => {
    return {
        boards: require('./board')({ sequelize, Sequelize }),
        boardPosts: require('./board/post')({ sequelize, Sequelize }),
        boardPostStates: require('./board/post/state')({ sequelize, Sequelize }),
        boardPostVotes: require('./board/post/vote')({ sequelize, Sequelize }),
        boardPostComments: require('./board/post/comment')({ sequelize, Sequelize }),
        boardPostCommentVotes: require('./board/post/comment/vote')({ sequelize, Sequelize }),
        hub: require('./setting')({ sequelize, Sequelize }),
        hubBrand: require('./setting/brand')({ sequelize, Sequelize }),
        subscriptions: require('./subscription')({ sequelize, Sequelize }),
        users: require('./user')({ sequelize, Sequelize }),
        userAuth: require('./user/auth')({ sequelize, Sequelize })
    }
}