'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/config.json');

const schema = config.api.db.schema;

module.exports = ({ sequelize }) => {
    const models = {
        Board: require('./board')({ sequelize, Sequelize, schema }),
        Hub: require('./hub')({ sequelize, Sequelize, schema }),
        HubBrand: require('./hub/brand')({ sequelize, Sequelize, schema }),
        Subscription: require('./subscription')({ sequelize, Sequelize, schema }),
        Post: require('./post')({ sequelize, Sequelize, schema }),
        PostState: require('./post/state')({ sequelize, Sequelize, schema }),
        PostVote: require('./post/vote')({ sequelize, Sequelize, schema }),
        PostComment: require('./post/comment')({ sequelize, Sequelize, schema }),
        PostCommentVote: require('./post/comment/vote')({ sequelize, Sequelize, schema }),
        User: require('./user')({ sequelize, Sequelize, schema }),
        UserAuth: require('./user/auth')({ sequelize, Sequelize, schema })
    }

    return models;
}