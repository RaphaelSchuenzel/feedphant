'use strict';

module.exports = ({ api, db, passport }) => {
    const controllers = {
        auth: require('../../controllers/auth')({ api, db, passport })
    }

    // requests

    // GET

    // retrieve hub on requested subdomain (${url}.feedphant.com)
    api.get('/', (req, res) => {
        res.status(501).send('NOT IMPLEMENTED: GET Hub');
    });

    // POST

    // create a new hub on the requested subdomain (${url}.feedphant.com)
    api.post('/', (req, res) => {
        res.status(501).send('NOT IMPLEMENTED: POST Hub');
    });

    return api;
}