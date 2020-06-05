'use strict';

const { sequelize } = require('../lib/db');
const HubInterface = require('../interfaces/hub');

module.exports = {
    createHub: async (body) => {
        // todo: convert product name to subdomain string (ex. Product Name => productname)
        const subdomain = body.productName;

        const result = await sequelize.transaction(async (t) => {
            const hub = await HubInterface.create(t, 'hub', null, {
                subdomain
            });

            // create a row in hub brand model
            await HubInterface.create(t, 'hubBrand', hub.dataValues.id, {
                name: body.productName
            });

            // todo: create admin user
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