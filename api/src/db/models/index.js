'use strict';

import { DataTypes } from 'sequelize';

module.exports = ({ db }) => {
    const models = {
        boards: require('./board')({ db, DataTypes }),
        boardsPosts: require('./board/post')({ db, DataTypes }),
        boardsPostsState: require('./board/post/state')({ db, DataTypes }),
        boardsPostsVote: require('./board/post/vote')({ db, DataTypes }),
        boardsPostsComments: require('./board/post/comment')({ db, DataTypes }),
        boardsPostsCommentsVote: require('./board/post/comment/vote')({ db, DataTypes }),
        users: require('./user')({ db, DataTypes }),
        usersAuth: require('./user/userAuth')({ db, DataTypes })
    }

    db.sync();

    return models;
}