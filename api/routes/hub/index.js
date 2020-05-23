'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        hub: require('../../controllers/hub')({ api, db, passport })
    }

    // requests

    // GET
    api.get('/', controllers.hub.getHub);

    // POST
    api.post('/', controllers.hub.createHub);

    // PUT
    api.put('/', controllers.hub.updateHub);

    return api;
}