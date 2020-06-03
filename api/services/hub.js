'use strict';

const HubInterface = require('../interfaces/hub');

module.exports = {
    getHub: async (body) => {
        const hub = await HubInterface.get('1b20abec-4001-4479-92b9-03365cc06c3a', { tableName: 'setting' });

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