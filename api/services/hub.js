'use strict';

const HubInterface = require('../interfaces/hub');

module.exports = {
    getHub: async (body) => {
        const hub = await HubInterface.get('c5290736-b505-4696-8bf4-a359ce36022f', { tableName: 'setting' });

        return hub;
    },
    createHub: async (body) => {
        const hub = await HubInterface.create(details);

        return hub;
    },
    updateHub: async (body) => {
        return false;
    }
};