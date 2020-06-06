'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/config.json');

const schema = config.api.db.schema;

module.exports = ({ sequelize }) => {
    const models = {
        board: require('./board')({ sequelize, Sequelize, schema }),
        boardPost: require('./board/post')({ sequelize, Sequelize, schema }),
        boardPostState: require('./board/post/state')({ sequelize, Sequelize, schema }),
        boardPostVote: require('./board/post/vote')({ sequelize, Sequelize, schema }),
        boardPostComment: require('./board/post/comment')({ sequelize, Sequelize, schema }),
        boardPostCommentVote: require('./board/post/comment/vote')({ sequelize, Sequelize, schema }),
        hub: require('./hub')({ sequelize, Sequelize, schema }),
        hubBrand: require('./hub/brand')({ sequelize, Sequelize, schema }),
        hubSubscription: require('./hub/subscription')({ sequelize, Sequelize, schema }),
        user: require('./user')({ sequelize, Sequelize, schema }),
        userAuth: require('./user/auth')({ sequelize, Sequelize, schema })
    }

    return models;
}