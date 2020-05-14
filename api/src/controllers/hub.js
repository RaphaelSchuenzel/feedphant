'use strict';

module.exports = ({ api, db, passport }) => ({

    // retrieve hub on requested subdomain (${url}.feedphant.com)
    getHub: (req, res, next) => {
        return res.status(501).send('NOT IMPLEMENTED: GET Hub');
    },

    // create a new hub on the requested subdomain (${url}.feedphant.com)
    createHub: (req, res, next) => {
        return res.status(501).send('NOT IMPLEMENTED: POST Hub');
    },

    // update an existing hub on the requested subdomain (${url}.feedphant.com)
    updateHub: (req, res, next) => {
        return res.status(501).send('NOT IMPLEMENTED: PUT Hub');
    }
});