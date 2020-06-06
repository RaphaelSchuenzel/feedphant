'use strict';

const { sequelize } = require('../lib/db');

const HubInterface = require('../interfaces/hub');
const UserInterface = require('../interfaces/user');

module.exports = {
    createHub: async (body) => {
        // todo: convert product name to subdomain string (ex. Product Name => productname)
        const subdomain = body.productName;
        const adapter = 'email';

        const result = await sequelize.transaction(async (t) => {
            const hub = await HubInterface.create(t, 'hub', null, {
                subdomain
            });

            // create a record in hub brand model
            await HubInterface.create(t, 'hubBrand', hub.dataValues.hubId, {
                name: body.productName
            });

            // create a record in user model
            const user = await UserInterface.create(t, 'users', null, hub.dataValues.hubId, {
                name: body.userName,
                email: body.userEmail
            });

            // create a record in user auth model
            await UserInterface.create(t, 'usersAuth', user.dataValues.userId, hub.dataValues.hubId, {
                adapter
            });
        });

        return result;
    },
    getHub: async (body) => {
        const result = await sequelize.transaction(async (t) => {
            const hub = await HubInterface.get(t, 'hub', body.hubId);

            return hub;
        });

        return result;
    },
    updateHub: async (body) => {
        return false;
    }
};