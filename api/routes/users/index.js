'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        users: require('../../controllers/users')({ api, db, passport })
    }

    // requests
    
    // GET

    // returns the user response of the requesting user, if logged in
    api.get('/users/me', passport.authenticate('bearer'), controllers.users.getUsersMe);

    return api;
}