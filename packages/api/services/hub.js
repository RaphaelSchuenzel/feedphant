'use strict';

const { queryInterface } = require('../lib/db');

exports.createHub = async ({ transaction, params }) => {
    // create a record in hub model
    const hubQuery = await queryInterface.create({
        transaction,
        model: 'Hub',
        params: {
            subdomain: params.subdomain
        }
    });

    // create a record in hub brand model
    await queryInterface.create({
        transaction,
        model: 'HubBrand',
        foreignKeys: {
            hubId: hubQuery.dataValues.id
        },
        params: {
            name: params.productName
        }
    });

    return hubQuery.dataValues.id;
};

exports.getHub = async ({ transaction, params }) => {
    const hubQuery = await queryInterface.get({
        transaction,
        model: 'Hub',
        identifiers: params.identifiers
    });

    return hubQuery;
};

exports.updateHub = (body) => {
    return false;
}