'use strict';

const { Sequelize } = require('sequelize');
const config = require('../../config/config.json');

const schema = config.api.db.schema;

module.exports = ({ sequelize }) => ({
    Board: require('./board')({ sequelize, Sequelize, schema }),
    BoardPost: require('./board/post')({ sequelize, Sequelize, schema }),
    BoardPostState: require('./board/post/state')({ sequelize, Sequelize, schema }),
    BoardPostVote: require('./board/post/vote')({ sequelize, Sequelize, schema }),
    BoardPostComment: require('./board/post/comment')({ sequelize, Sequelize, schema }),
    BoardPostCommentVote: require('./board/post/comment/vote')({ sequelize, Sequelize, schema }),
    Brand: require('./brand')({ sequelize, Sequelize, schema }),
    Hub: require('./hub')({ sequelize, Sequelize, schema }),
    Subscription: require('./subscription')({ sequelize, Sequelize, schema }),
    User: require('./user')({ sequelize, Sequelize, schema }),
    UserAuth: require('./user/auth')({ sequelize, Sequelize, schema })
});