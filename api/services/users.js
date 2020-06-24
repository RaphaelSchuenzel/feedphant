'use strict';

const { sequelize, queryInterface } = require('../lib/db');

exports.getUser = async ({ identifier }) => {
    const result = await sequelize.transaction(async (t) => {
        const userQuery = await queryInterface.get({
            transaction: t,
            model: 'HubUser',
            params: identifier
        });

        return userQuery;
    });

    return result;
}