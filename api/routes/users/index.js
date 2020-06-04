'use strict';

const users = require('express').Router();
const passport = require('passport');

// controllers
const UsersController = require('../../controllers/users');

users.route('/me')
    // returns the user response of the requesting user, if logged in
    .get(passport.authenticate('bearer'), UsersController.getUsersMe);

module.exports = users;