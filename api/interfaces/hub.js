const { models } = require('../lib/db');

module.exports = {
    // create a new hub
    create: async (details) => {
        try {
            const hub = await models.hub.create(details);
            
            return module.get(hub.id);
        } catch (err) {
            // todo: handle error
        }
    },

    // get a model table row by hub id
    get: async (hubId, { model }) => {
        try {
            if (!hubId) {
                throw new Error('Hub ID not specified.');
            }
            
            if (!model) {
                throw new Error('Model not specified.');
            }

            const hub = await models[model].findOne({
                where: {
                    id: hubId
                }
                /* todo: define attributes based on role
                attributes: [
                    'hub_id'
                ] */
            });

            console.log(hub);

            return hub;
        } catch (err) {
            console.log(err);
            // todo: handle error
        }
    },

    // update a table column by hub id
    update: async (hubId, details) => {
        try {

        } catch (err) {
            // todo: handle error
        }
    }
};