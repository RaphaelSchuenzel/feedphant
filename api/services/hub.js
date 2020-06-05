'use strict';

const { sequelize } = require('../lib/db');
const HubInterface = require('../interfaces/hub');

module.exports = {
    createHub: async (body) => {
        const subdomain = 'generate subdomain';

        const result = await sequelize.transaction(async (t) => {
            const hub = await HubInterface.create(t, 'hub', null, {
                subdomain
            });

            await HubInterface.create(t, 'hub', hub.id, {
                name: details.productName
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