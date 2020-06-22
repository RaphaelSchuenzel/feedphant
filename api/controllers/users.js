'use strict';

const UsersService = require('../services/users');

// get a user by id or email, defined by hub id
exports.getUser = async (req, res, next) => {
    const user = await UsersService.getUser(req.body);

    return res.json(user);
};

// return the requesting user by access token
exports.getUsersMe = async (req, res, next) => {
    const user = await UsersService.getUser(req.body);

    return res.json(user);
};