'use strict';

// import models from '../db/models'

module.exports = ({ api, db, passport }) => ({

    // retrieve hub on requested subdomain (${url}.feedphant.com)
    getHub: async (req, res, next) => {
        /* const hub = await models.hub.findAll({
            where: {
                id: '1b20abec-4001-4479-92b9-03365cc06c3a'
            }
        });

        return res.json(hub); */

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