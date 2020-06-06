const _ = require('lodash');

const { models } = require('../lib/db');

module.exports = {
    /**	Create a table row in the defined model with the given user id & query.
     *	@param {Object} transaction	- Sequelize transaction object
     *	@param {Object} model	    - Sequelize model object
     *  @param {uuid} userId	    - ID of the user to create the record for.
     *  @param {Object} query	    - Sequelize query parameters.
     *
     *	@example
     *		await UserInterface.create(t, 'users', user.id, {
     *           email: 'example@johndoe.com'
     *      });
     */
    create: async (transaction, model, userId, query) => {
        try {
            const result = await models[model].create({
                userId,
                ...query
            }, {
                transaction
            });

            return result;
        } catch (err) {
            // todo: handle error
        }
    },

    /**	Get a single model row by user id & query.
     *	@param {Object} transaction	- Sequelize transaction object
     *	@param {Object} model	    - Sequelize model object
     *  @param {uuid} userId	    - ID of the user to query for.
     *  @param {Object} query	    - Sequelize query parameters.
     *
     *	@example
     *		await UserInterface.create(t, 'users', user.id, {
     *           where: {
     *              email: 'example@johndoe.com'
     *           }
     *      });
     */
    get: async (transaction, model, userId, query) => {
        try {
            const mergedQuery = _.merge({
                where: {
                    id: userId
                }
            }, query)

            const user = await models[model].findOne(mergedQuery, {
                transaction
            });

            return user;
        } catch (err) {
            console.log(err);
            // todo: handle error
        }
    }

    /* update: async (userId, details) => {
        try {
            // todo: add update method logic
        } catch (err) {
            // todo: handle error
        }
    } */
};