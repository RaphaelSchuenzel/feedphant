'use strict';

import { DataTypes } from 'sequelize';

module.exports = ({ db }) => {
    const models = {

        // boards
        boards: require('./board')({ db, DataTypes }),
        boardPosts: require('./board/post')({ db, DataTypes }),
        boardPostStates: require('./board/post/state')({ db, DataTypes }),
        boardPostVotes: require('./board/post/vote')({ db, DataTypes }),
        boardPostComments: require('./board/post/comment')({ db, DataTypes }),
        boardPostCommentVotes: require('./board/post/comment/vote')({ db, DataTypes }),

        // hub
        hub: require('./setting')({ db, DataTypes }),
        hubBrand: require('./setting/brand')({ db, DataTypes }),

        // subscriptions
        subscriptions: require('./subscription')({ db, DataTypes }),

        // users
        users: require('./user')({ db, DataTypes }),
        userAuth: require('./user/auth')({ db, DataTypes })
    }

    db.sync();

    return models;
}