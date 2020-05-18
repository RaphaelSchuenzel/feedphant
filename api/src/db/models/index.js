'use strict';

import { DataTypes } from 'sequelize';

module.exports = ({ db }) => {
    const models = {

        // boards
        boards: require('./board')({ db, DataTypes }),
        boardsPosts: require('./board/post')({ db, DataTypes }),
        boardsPostsState: require('./board/post/state')({ db, DataTypes }),
        boardsPostsVote: require('./board/post/vote')({ db, DataTypes }),
        boardsPostsComments: require('./board/post/comment')({ db, DataTypes }),
        boardsPostsCommentsVote: require('./board/post/comment/vote')({ db, DataTypes }),

        // settings
        settings: require('./setting')({ db, DataTypes }),
        settingsBrand: require('./setting/brand')({ db, DataTypes }),

        // subscriptions
        subscriptions: require('./subscription')({ db, DataTypes }),

        // users
        users: require('./user')({ db, DataTypes }),
        usersAuth: require('./user/auth')({ db, DataTypes })
    }

    db.sync();

    return models;
}