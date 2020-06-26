'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

const UsersService = require('../services/users');

const sessionSecret = config.api.secrets.session;

module.exports = ({ app }) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        const user = await UsersService.getUser({ email });

        if (!user) {
            return done(null, false, 'User could not be found.');
        }

        await bcrypt.compare(password, user.auth.hash) ? done(null, user) : done(null, false, 'Password does not match.');
    }));

    passport.use(new BearerStrategy(
        async (token, done) => {
            const authSecret = config.api.secrets.auth;

            const payload = await jwt.verify(token, authSecret);

            const user = await UsersService.getUser({
                id: payload.id
            });

            return done(null, user);
        }
    ));

    app.use(cookieParser());
    app.use(session({ secret: sessionSecret }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UsersService.getUser({ id });

        done(null, user);
    });

    app.use(passport.initialize());

    return passport;
}