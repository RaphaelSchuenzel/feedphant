'use strict';

const auth = require('express').Router();
const passport = require('passport');

// controllers
const AuthController = require('../../controllers/auth');

// register a new account; email & password as authentication method
auth.route('/:adapter')
    .post(AuthController.createAccount);

// log in to an existing account; email & password as authentication method
auth.route('/email')
    .put(passport.authenticate('local'), AuthController.loginAccount);

module.exports = auth;