'use strict';

const HubService = require('../services/hub');

// retrieve hub on requested subdomain (${url}.feedphant.com)
exports.getHub = async (req) => {
    const hub = await HubService.getHub(req.body);

    return hub;
};

// create a new hub on the requested subdomain (${url}.feedphant.com)
exports.createHub = async (req) => {
    const payload = {
        hub: {
            subdomain: req.body.subdomain,
            brand: {
                productName: req.body.productName
            }
        },
        user: {
            name: req.body.name,
            email: req.body.email,
            auth: {
                password: req.body.password
            }
        }
    };

    // todo: specify adapter, generate access & refresh token
    payload.user.auth.adapter = 'email';
    
    payload.user.auth.accessToken = require('crypto').randomBytes(36).toString('hex');
    payload.user.auth.refreshToken = require('crypto').randomBytes(36).toString('hex');

    const hub = await HubService.createHub(payload);

    return hub;
};

// update an existing hub on the requested subdomain (${url}.feedphant.com)
exports.updateHub = async (req) => {
    const hub = await HubService.updateHub(req.body);

    return hub;
}