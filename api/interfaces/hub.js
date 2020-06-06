const _ = require('lodash');

const { models } = require('../lib/db');

module.exports = {
    /**	Create a table row in the defined model with the given hub id & query.
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

    /**	Get a single model row by hub id & query.
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
    get: async (transaction, model, hubId, query) => {
        try {
            if (!hubId) {
                throw new Error('Hub ID not specified.');
            } else if (!model) {
                throw new Error('Model not specified.');
            }

            const hubQuery = {
                where: {
                    id: hubId
                }
            }

            const mergedQuery = _.merge(hubQuery, query)

            const hub = await models[model].findOne(mergedQuery, {
                transaction
            });

            return hub;
        } catch (err) {
            console.log(err);
            // todo: handle error
        }
    }

    /* update: async (hubId, details) => {
        try {
            // todo: add update method logic
        } catch (err) {
            // todo: handle error
        }
    } */
};