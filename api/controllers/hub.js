'use strict';

const HubService = require('../services/hub');

// retrieve hub on requested subdomain (${url}.feedphant.com)
exports.getHub = async (req) => {
    const hub = await HubService.getHub(req.body);

    return hub;
};

// create a new hub on the requested subdomain (${url}.feedphant.com)
exports.createHub = async (req) => {
    const credentials = req.body;

    // todo: specify adapter, generate access & refresh token
    credentials.adapter = 'email';
    
    credentials.accessToken = require('crypto').randomBytes(36).toString('hex');
    credentials.refreshToken = require('crypto').randomBytes(36).toString('hex');

    const hub = await HubService.createHub(credentials);

    return hub;
};

// update an existing hub on the requested subdomain (${url}.feedphant.com)
exports.updateHub = async (req) => {
    const hub = await HubService.updateHub(req.body);

    return hub;
}