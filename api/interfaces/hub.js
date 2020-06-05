const { models } = require('../lib/db');

module.exports = {
    /**	Create a table row in the defined model with the given hub id and query.
     *	@param {Object} transaction	- Sequelize transaction object
     *	@param {Object} model	    - Sequelize model object
     *  @param {uuid} hubId	        - ID of the hub to create within.
     *  @param {Object} query	    - Sequelize query parameters.
     *
     *	@example
     *		await HubInterface.create(t, 'hubBrand', hub.id, {
     *           name: details.productName
     *      });
     */
    create: async (transaction, model, hubId, query) => {
        try {
            const result = await models[model].create({
                hubId,
                ...query
            }, {
                transaction
            });

            return result;
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