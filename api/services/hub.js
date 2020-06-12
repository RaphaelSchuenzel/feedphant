'use strict';

const { sequelize } = require('../lib/db');

const HubInterface = require('../interfaces/hub');
const UserInterface = require('../interfaces/user');

module.exports = {
    createHub: async (body) => {
        const result = await sequelize.transaction(async (t) => {
            const hub = await HubInterface.create(t, 'Hub', null, {
                subdomain: body.subdomain
            });

            // create a record in hub brand model
            await HubInterface.create(t, 'HubBrand', hub.dataValues.hubId, {
                name: body.productName
            });

            // create a record in user model
            const user = await UserInterface.create(t, 'User', null, hub.dataValues.hubId, {
                name: body.name,
                email: body.email
            });

            // create a record in user auth model
            const auth = await UserInterface.create(t, 'UserAuth', user.dataValues.userId, hub.dataValues.hubId, {
                adapter: body.adapter,
                hash: body.password,
                accessToken: body.accessToken,
                refreshToken: body.refreshToken
            });

            return auth.dataValues.accessToken;
        });

        return result;
    },
    getHub: async (body) => {
        const result = await sequelize.transaction(async (t) => {
            const hub = await HubInterface.get(t, 'Hub', body.hubId);

            return hub;
        });

        return result;
    },
    updateHub: async (body) => {
        return false;
    }
};