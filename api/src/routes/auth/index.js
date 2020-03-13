'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        auth: require('../../controllers/auth')({ api, db, passport })
    }

    const requests = async () => {
        post: {
            api.post('/auth/email', controllers.auth.registerAccountEmail);
        }
        put: {
            api.put('/auth/email', passport.authenticate('local'), controllers.auth.loginAccountEmail);
        }
    }

    return requests();
}