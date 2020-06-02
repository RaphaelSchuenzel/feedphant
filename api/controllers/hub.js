'use strict';

import HubService from '../services/hub'

module.exports = ({ api, db, passport }) => ({

    // retrieve hub on requested subdomain (${url}.feedphant.com)
    getHub: async (req, res, next) => {
        const hub = await HubService.getHub(req.body);

        return res.json(hub);
    },

    // create a new hub on the requested subdomain (${url}.feedphant.com)
    createHub: async (req, res, next) => {
        const hub = await HubService.createHub(req.body);

        return res.json(hub);
    },

    // update an existing hub on the requested subdomain (${url}.feedphant.com)
    updateHub: async (req, res, next) => {
        const hub = await HubService.updateHub(req.body);

        return res.json(hub);
    }
});