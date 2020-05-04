'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        auth: require('../../controllers/auth')({ api, db, passport })
    }

    // requests

    // POST
    api.post('/auth/email', controllers.auth.registerAccountEmail);

    // PUT
    api.put('/auth/email', passport.authenticate('local'), controllers.auth.loginAccountEmail);

    return api;
}