'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        auth: require('../../controllers/auth')({ api, db, passport })
    }

    // requests

    // POST

    // register a new account; email & password as authentication method
    api.post('/auth/email', controllers.auth.registerAccountEmail);

    // PUT

    // log in to an existing account; email & password as authentication method
    api.put('/auth/email', passport.authenticate('local'), controllers.auth.loginAccountEmail);

    return api;
}