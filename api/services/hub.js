'use strict';

const { sequelize, queryInterface } = require('../lib/db');

module.exports = {
    createHub: async (body) => {
        const result = await sequelize.transaction(async (t) => {

            // create a record in hub model
            const hub = await queryInterface.create({
                transaction: t,
                model: 'Hub',
                query: {
                    subdomain: body.subdomain
                }
            });

            // create a record in hub brand model
            await queryInterface.create({
                transaction: t,
                model: 'HubBrand',
                foreignKeys: {
                    hubId: hub.dataValues.id
                },
                query: {
                    name: body.productName
                }
            });

            // create a record in user model
            const user = await queryInterface.create({
                transaction: t,
                model: 'User',
                foreignKeys: {
                    hubId: hub.dataValues.id
                },
                query: {
                    name: body.name,
                    email: body.email
                }
            });

            // create a record in auth model
            const auth = await queryInterface.create({
                transaction: t,
                model: 'Auth',
                foreignKeys: {
                    userId: user.dataValues.id
                },
                query: {
                    adapter: body.adapter,
                    hash: body.password,
                    accessToken: body.accessToken,
                    refreshToken: body.refreshToken
                }
            });

            return auth.dataValues.accessToken;
        });

        return result;
    },
    getHub: async (body) => {
        const result = await sequelize.transaction(async (t) => {
            const hub = await HubInterface.get(t, 'Hub', body.hubId);

            return hub;
        });

        return result;
    },
    updateHub: async (body) => {
        return false;
    }
};