'use strict';

import { DataTypes } from 'sequelize';

module.exports = ({ sequelize }) => {
    return {
        boards: require('./board')({ sequelize, DataTypes }),
        boardPosts: require('./board/post')({ sequelize, DataTypes }),
        boardPostStates: require('./board/post/state')({ sequelize, DataTypes }),
        boardPostVotes: require('./board/post/vote')({ sequelize, DataTypes }),
        boardPostComments: require('./board/post/comment')({ sequelize, DataTypes }),
        boardPostCommentVotes: require('./board/post/comment/vote')({ sequelize, DataTypes }),
        hub: require('./setting')({ sequelize, DataTypes }),
        hubBrand: require('./setting/brand')({ sequelize, DataTypes }),
        subscriptions: require('./subscription')({ sequelize, DataTypes }),
        users: require('./user')({ sequelize, DataTypes }),
        userAuth: require('./user/auth')({ sequelize, DataTypes })
    }
}