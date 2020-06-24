'use strict';

const { queryInterface } = require('../lib/db');

exports.createUser = async ({ transaction, params }) => {
    // create a record in user model
    const userQuery = await queryInterface.create({
        transaction,
        model: 'HubUser',
        foreignKeys: {
            hubId: params.hub.id
        },
        params: {
            name: params.user.name,
            email: params.user.email
        }
    });

    // create a record in auth model
    const authQuery = await queryInterface.create({
        transaction,
        model: 'HubUserAuth',
        foreignKeys: {
            userId: userQuery.dataValues.id
        },
        params: {
            adapter: params.auth.adapter,
            hash: params.user.password,
            accessToken: params.auth.accessToken,
            refreshToken: params.auth.refreshToken
        }
    });

    // return the access token of the newly created user
    return authQuery.dataValues.accessToken;
};

exports.getUser = async ({ transaction, params }) => {
    const userQuery = await queryInterface.get({
        transaction,
        model: 'HubUser',
        params: params.identifier
    });

    return userQuery.dataValues;
};