'use strict';

const AuthService = require('../services/auth');

exports.createAccount = async (req) => {
    const user = await AuthService.createAccount(req.body);

    return user;
};

exports.loginAccount = async (req) => {
    const user = await AuthService.loginAccount(req.body);

    return user;
};