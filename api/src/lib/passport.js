'use strict';

import passport     from 'passport';
import bcrypt       from 'bcrypt';
import jwt          from 'jsonwebtoken';

// strategies
import LocalStrategy    from 'passport-local';
import BearerStrategy   from 'passport-http-bearer';

// models
import secrets from '../models/secrets'

export default ({ app, config }) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        db.query(`SELECT * FROM users WHERE id = '${id}'`, function (error, results, fields) {
            done(error, results[0])
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        db.query(`SELECT * FROM users WHERE email = '${email}'`, function (error, results, fields) {
            if (error) {
                return done(error);
            } else if (!results || results == null) {
                return done(null, false, "User could not be found.");
            } else if (results) {
                let user = results[0];

                if (user) {
                    db.query(`SELECT * FROM users_auth_password WHERE user_id = '${user.id}'`, function (error, results, fields) {
                        if (error) {
                            return done(error);
                        } else if (results) {
                            let password_hash = results[0].hash;

                            if (password_hash) {
                                bcrypt.compare(password, password_hash, function(err, result) {
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
        });
    }));

    passport.use(new BearerStrategy((token, done) => {
        secrets.getSecret('auth')
            .then(function (secret) {
                jwt.verify(token, secret, function(err, decoded) {
                    if (err) {
                        return done(null, false, 'Invalid Access Token.');
                    } else if (decoded) {
                        let user = decoded.id;
        
                        db.query(`SELECT * FROM users WHERE id = '${user}'`, function (error, results, fields) {
                            if (error) {
                                return done(error);
                            } else if (!results || results == null) {
                                return done(null, false, "User could not be found.");
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
                        });
                    } else {
                        return done(null, false);
                    }
                });
            })
            .catch(function (err) {
                done(err);
            });
    }));

    return global.passport = passport;
}