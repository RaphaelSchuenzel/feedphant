'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/config.json');

const schema = config.api.db.schema;

module.exports = ({ sequelize }) => {
    const models = {
        Hub: require('./hub')({ sequelize, Sequelize, schema }),
        HubBoard: require('./hub/board')({ sequelize, Sequelize, schema }),
        HubBoardPost: require('./hub/board/post')({ sequelize, Sequelize, schema }),
        HubBoardPostState: require('./hub/board/post/state')({ sequelize, Sequelize, schema }),
        HubBoardPostVote: require('./hub/board/post/vote')({ sequelize, Sequelize, schema }),
        HubBoardPostComment: require('./hub/board/post/comment')({ sequelize, Sequelize, schema }),
        HubBoardPostCommentVote: require('./hub/board/post/comment/vote')({ sequelize, Sequelize, schema }),
        HubBrand: require('./hub/brand')({ sequelize, Sequelize, schema }),
        HubSubscription: require('./hub_subscription')({ sequelize, Sequelize, schema }),
        HubUser: require('./hub/user')({ sequelize, Sequelize, schema }),
        HubUserAuth: require('./hub/user/auth')({ sequelize, Sequelize, schema })
    }

    return models;
}