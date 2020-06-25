'use strict';

const { sequelize } = require('../lib/db');

const HubService = require('../services/hub');
const UsersService = require('../services/users');

// retrieve hub on requested subdomain (${url}.feedphant.com)
exports.getHub = async (req) => {
    const hub = await HubService.getHub(req.body);

    return hub;
};

// create a new hub on the requested subdomain (${url}.feedphant.com)
exports.createHub = async (req) => {
    const params = {
        hub: {
            subdomain: req.body.subdomain,
            productName: req.body.productName
        },
        user: {
            name: req.body.userName,
            email: req.body.userEmail,
            password: req.body.userPassword
        }
    };

    // todo: specify adapter, generate access & refresh token
    params.user.adapter = 'email';
    
    params.user.accessToken = require('crypto').randomBytes(36).toString('hex');
    params.user.refreshToken = require('crypto').randomBytes(36).toString('hex');

    const result = await sequelize.transaction(async (t) => {
        const hub = await HubService.createHub({
            transaction: t,
            params: params.hub
        });

        const user = await UsersService.createUser({
            transaction: t,
            params: {
                hubId: hub.id,
                ...params.user
            }
        });

        return user;
    });

    return result;
};

// update an existing hub on the requested subdomain (${url}.feedphant.com)
exports.updateHub = async (req) => {
    const hub = await HubService.updateHub(req.body);

    return hub;
}