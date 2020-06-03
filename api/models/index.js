'use strict';

const { Sequelize } = require('sequelize');

module.exports = ({ sequelize }) => {
    return {
        boards: require('./boards')({ sequelize, Sequelize }),
        boardsPosts: require('./boards/posts')({ sequelize, Sequelize }),
        boardsPostsStates: require('./boards/posts/states')({ sequelize, Sequelize }),
        boardsPostsVotes: require('./boards/posts/votes')({ sequelize, Sequelize }),
        boardsPostsComments: require('./boards/posts/comments')({ sequelize, Sequelize }),
        boardsPostsCommentsVotes: require('./boards/posts/comments/votes')({ sequelize, Sequelize }),
        hub: require('./hub')({ sequelize, Sequelize }),
        hubBrand: require('./hub/brand')({ sequelize, Sequelize }),
        hubSubscription: require('./hub/subscription')({ sequelize, Sequelize }),
        users: require('./users')({ sequelize, Sequelize }),
        usersAuth: require('./users/auth')({ sequelize, Sequelize })
    }
}