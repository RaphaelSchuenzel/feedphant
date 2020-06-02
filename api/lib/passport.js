'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

module.exports = ({ app }) => {
    app.use(cookieParser());

    const sessionSecret = process.env.SESSION_SECRET || config.api.secrets.session;

    app.use(session({ secret: sessionSecret }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        /* db.query(`SELECT * FROM users WHERE id = '${id}'`, function (error, results, fields) {
            done(error, results[0])
        }); */
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        /* db.query(`SELECT * FROM users WHERE email = '${email}'`, function (error, results, fields) {
            if (error) {
                return done(error);
            } else if (!results || results == null) {
                return done(null, false, 'User could not be found.');
            } else if (results) {
                const user = results[0];

                if (user) {
                    db.query(`SELECT * FROM users_auth_password WHERE user_id = '${user.id}'`, function (error, results, fields) {
                        if (error) {
                            return done(error);
                        } else if (results) {
                            const passwordHash = results[0].hash;

                            if (passwordHash) {
                                bcrypt.compare(password, passwordHash, function (err, result) {
                                    if (err || result !== true) {
                                        return done(null, false);
                                    } else if (result === true) {
                                        return done(null, user);
                                    }
                                });
                            } else {
                                return done(null, false);
                            }
                        } else {
                            return done(null, false);
                        }
                    });
                } else {
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        }); */
    }));

    passport.use(new BearerStrategy(
        (token, done) => {
            const authSecret = process.env.AUTH_SECRET || config.api.secrets.auth;

            jwt.verify(token, authSecret, function (err, decoded) {
                if (err) {
                    return done(null, false, 'Invalid Access Token.');
                } else if (decoded) {
                    let user = decoded.id;

                    /* db.query(`SELECT * FROM users WHERE id = '${user}'`, function (error, results, fields) {
                        if (error) {
                            return done(error);
                        } else if (!results || results == null) {
                            return done(null, false, 'User could not be found.');
                        } else if (results) {
                            let user = results[0];
            
                            if (user) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        } else {
                            return done(null, false);
                        }
                    }); */
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    app.use(passport.initialize());

    return passport;
}