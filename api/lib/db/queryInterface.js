const _ = require('lodash');

module.exports = ({ models }) => ({
    /**	Create a table row in the defined model with the given identifier & query.
     *	@param {Object}     transaction - Sequelize transaction object
     *	@param {Object}     model	    - Sequelize model object
     *  @param {string}     identifier  - Identifier object containing key and value of the identifying column.
     *  @param {Object}     params	    - Sequelize query parameters.
     *
     *	@example
     *  todo: provide example 
     */
    create: async ({ transaction, model, identifier, params }) => {
        try {
            const query = identifier != null ? { ...identifier, ...params } : params;

            const result = await models[model].create(query, {
                transaction
            });

            return result;
        } catch (err) {
            // todo: handle error
        }
    },

    /**	Get a single model row by hub id & query.
     *	@param {Object}     transaction	- Sequelize transaction object
     *	@param {Object}     model	    - Sequelize model object
     *  @param {string}     identifier  - Identifier object containing key and value of the identifying column.
     *  @param {Object}     params	    - Sequelize query parameters.
     *
     *	@example
     *  todo: provide example 
     */
    get: async ({ transaction, model, identifier, params }) => {
        try {
            const query = _.merge({
                where: identifier
            }, params);

            const hub = await models[model].findOne(query, {
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
});