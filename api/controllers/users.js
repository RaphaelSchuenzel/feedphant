'use strict';

const { sequelize } = require('../lib/db');

const UsersService = require('../services/users');

// get a user by id or email, defined by hub id
exports.getUser = async (req) => {
    const result = await sequelize.transaction(async (t) => {
        const user = await UsersService.getUser({
            transaction: t,
            params: {
                id: req.body.userId
            }
        });

        return user;
    });

    return result;
};

// return the requesting user by access token
exports.getUsersMe = async (req) => {
    const user = await UsersService.getUser(req.body);

    return user;
};