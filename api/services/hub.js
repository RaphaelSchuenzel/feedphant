'use strict';

const { sequelize, queryInterface } = require('../lib/db');

exports.createHub = async ({ hub, user }) => {
    const result = await sequelize.transaction(async (t) => {
        // create a record in hub model
        const hubQuery = await queryInterface.create({
            transaction: t,
            model: 'Hub',
            params: {
                subdomain: hub.subdomain
            }
        });

        // create a record in hub brand model
        await queryInterface.create({
            transaction: t,
            model: 'HubBrand',
            foreignKeys: {
                hubId: hubQuery.dataValues.id
            },
            params: {
                name: hub.brand.productName
            }
        });

        // create a record in user model
        const userQuery = await queryInterface.create({
            transaction: t,
            model: 'HubUser',
            foreignKeys: {
                hubId: hubQuery.dataValues.id
            },
            params: {
                name: user.name,
                email: user.email
            }
        });

        // create a record in auth model
        const authQuery = await queryInterface.create({
            transaction: t,
            model: 'HubUserAuth',
            foreignKeys: {
                userId: userQuery.dataValues.id
            },
            params: {
                adapter: user.auth.adapter,
                hash: user.auth.password,
                accessToken: user.auth.accessToken,
                refreshToken: user.auth.refreshToken
            }
        });

        // return the access token of the newly created user
        return authQuery.dataValues.accessToken;
    });

    return result;
};

exports.getHub = async ({ id, subdomain }) => {
    const result = await sequelize.transaction(async (t) => {
        const hubQuery = await queryInterface.get({
            transaction: t,
            model: 'Hub',
            identifiers: {
                id,
                subdomain
            }
        });

        return hubQuery;
    });

    return result;
};

exports.updateHub = (body) => {
    return false;
}