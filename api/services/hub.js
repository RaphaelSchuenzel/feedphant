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

            await HubInterface.create(t, 'hubIndex', hub.id, {
                name: body.productName
            });
        });

        return result;
    },
    getHub: async (body) => {
        const result = await sequelize.transaction(async (t) => {
            const hub = await HubInterface.getOne(t, 'hub', body.hubId);

            return hub;
        });

        return result;
    },
    updateHub: async (body) => {
        return false;
    }
};