'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/config.json');

const schema = config.api.db.schema;

module.exports = ({ sequelize }) => {
    return {
        boards: require('./boards')({ sequelize, Sequelize, schema }),
        boardsPosts: require('./boards/posts')({ sequelize, Sequelize, schema }),
        boardsPostsStates: require('./boards/posts/states')({ sequelize, Sequelize, schema }),
        boardsPostsVotes: require('./boards/posts/votes')({ sequelize, Sequelize, schema }),
        boardsPostsComments: require('./boards/posts/comments')({ sequelize, Sequelize, schema }),
        boardsPostsCommentsVotes: require('./boards/posts/comments/votes')({ sequelize, Sequelize, schema }),
        hub: require('./hub')({ sequelize, Sequelize, schema }),
        hubBrand: require('./hub/brand')({ sequelize, Sequelize, schema }),
        hubSubscription: require('./hub/subscription')({ sequelize, Sequelize, schema }),
        users: require('./users')({ sequelize, Sequelize, schema }),
        usersAuth: require('./users/auth')({ sequelize, Sequelize, schema })
    }
}