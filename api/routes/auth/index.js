'use strict';

const auth = require('express').Router();
const passport = require('passport');

// controllers
const AuthController = require('../../controllers/auth');

module.exports = ({ render }) => {
    auth.route('/:adapter')
        // register a new account; email & password as authentication method
        .post(render(AuthController.createAccount));

    auth.route('/email')
        // log in to an existing account; email & password as authentication method
        .put(passport.authenticate('local'), render(AuthController.loginAccount));

    return auth;
};