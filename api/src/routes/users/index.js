'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        users: require('../../controllers/users')({ api, db, passport })
    }

    // requests
    
    // GET
    api.get('/users/me', passport.authenticate('bearer'), controllers.users.getUsersMe);

    return api;
}