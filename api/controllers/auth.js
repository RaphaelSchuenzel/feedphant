'use strict';

const AuthService = require('../services/auth');

exports.createAccount = async (req, res, next) => {
    const user = await AuthService.createAccount(req.body);

    return res.json(user);
};

exports.loginAccount = async (req, res, next) => {
    const user = await AuthService.loginAccount(req.body);

    return res.json(user);
};