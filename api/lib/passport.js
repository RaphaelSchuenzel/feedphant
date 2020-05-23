'use strict';

const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// strategies
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');

// controllers
const secrets = require('../controllers/secrets');

module.exports = ({ app }) => {
    app.use(passport.initialize());
    app.use(passport.session());

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
        async (token, done) => {
            const secret = await secrets.getSecret('auth');

            jwt.verify(token, secret, function (err, decoded) {
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

    return passport;
}