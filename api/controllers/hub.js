'use strict';

import HubInterface from '../interfaces/hub'

module.exports = ({ api, db, passport }) => ({

    // retrieve hub on requested subdomain (${url}.feedphant.com)
    getHub: async (req, res, next) => {
        const hub = await HubInterface.get('1b20abec-4001-4479-92b9-03365cc06c3a');

        return res.json(hub);
    },

    // create a new hub on the requested subdomain (${url}.feedphant.com)
    createHub: async (req, res, next) => {
        const hub = await HubInterface.create();

        return res.json(hub);
    },

    // update an existing hub on the requested subdomain (${url}.feedphant.com)
    updateHub: async (req, res, next) => {
        return res.status(501).send('NOT IMPLEMENTED: PUT Hub');
    }
});