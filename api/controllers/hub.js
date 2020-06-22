'use strict';

const HubService = require('../services/hub');

// retrieve hub on requested subdomain (${url}.feedphant.com)
exports.getHub = async (req, res, next) => {
    const hub = await HubService.getHub(req.body);

    return res.json(hub);
};

// create a new hub on the requested subdomain (${url}.feedphant.com)
exports.createHub = async (req, res, next) => {
    const credentials = req.body;

    // todo: specify adapter, generate access & refresh token
    credentials.adapter = 'email';
    
    credentials.accessToken = require('crypto').randomBytes(36).toString('hex');
    credentials.refreshToken = require('crypto').randomBytes(36).toString('hex');

    const hub = await HubService.createHub(credentials);

    return res.json(hub);
};

// update an existing hub on the requested subdomain (${url}.feedphant.com)
exports.updateHub = async (req, res, next) => {
    const hub = await HubService.updateHub(req.body);

    return res.json(hub);
}