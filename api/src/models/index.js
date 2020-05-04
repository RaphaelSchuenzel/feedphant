'use strict';

module.exports = ({ db, Sequelize }) => {
    const models = {
        boards: require('./boards')({ db, Sequelize }),
        boardsPosts: require('./boardsPosts')({ db, Sequelize }),
        boardsPostsComments: require('./boardsPostsComments')({ db, Sequelize }),
        users: require('./users')({ db, Sequelize }),
        usersAuthOauth: require('./usersAuthOauth')({ db, Sequelize }),
        usersAuthPassword: require('./usersAuthPassword')({ db, Sequelize })
    }

    db.sync();

    return models;
}