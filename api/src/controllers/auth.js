'use strict';

const EmailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// controllers
const controllers = {
    users: require('./users'),
    secrets: require('./secrets')
}

// models
const models = {
    users: require('../models/users')
}

module.exports = ({ api, db, passport }) => ({
    registerAccountEmail: async (req, res, next) => {
        try {
            if (req.body.email != null && req.body.username != null && req.body.password != null) {
                if (req.body.username.length < 2 || req.body.username.length > 40) {
                    throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Username. (Minimum 2, Maximum 40 Characters)");
                } else if (EmailValidator.validate(req.body.email) !== true) {
                    throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Email Address.");
                } else if (req.body.password.length < 8) {
                    throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Password. (Minimum 8 Characters)");
                }

                let credentials = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                };

                let users = await models.users.findAll({
                    where: {
                        email: credentials.email
                    }
                });

                return res.json(users);
            } else {
                throw new ApplicationError(ErrorCodes.BAD_REQUEST, "Invalid Payload.");
            }
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    createAccountEmail: async (credentials) => {
        return await new Promise((resolve, reject) => {
            // SELECT * FROM users WHERE email = '${credentials.email}'
            return users;
            
            /*
            db.query(`SELECT * FROM users WHERE email = '${credentials.email}'`, function (error, results, fields) {
                if (error || (results && results != null && results.length > 0)) {
                    if (error) {
                        return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                    } else if (results[0].email === credentials.email) {
                        return reject(new ApplicationError(ErrorCodes.BAD_REQUEST, "Email address is already in use."));
                    } else {
                        return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, null));
                    }
                } else {
                    bcrypt.hash(credentials.password, 12, (err, hash) => {
                        if (err) {
                            return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                        } else {
                            credentials.password = hash;

                            db.query(`INSERT INTO users (username, email) VALUES ('${credentials.username}', '${credentials.email}')`, function (error, results, fields) {
                                if (error) {
                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                                } else if (results) {
                                    controllers.users.getUser('email', credentials.email)
                                        .then(user => {
                                            db.query(`INSERT INTO users_auth_password (user_id, hash) VALUES ('${user.id}', '${credentials.password}')`, function (error, results, fields) {
                                                if (error) {
                                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                                                } else if (results) {
                                                    model.generateAccessToken(user)
                                                        .then(response => {
                                                            return resolve(response);
                                                        })
                                                        .catch(err => {
                                                            return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                                                        });
                                                } else {
                                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, null));
                                                }
                                            });
                                        })
                                        .catch(err => {
                                            return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                                        });
                                } else {
                                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, null));
                                }
                            });
                        }
                    });
                }
            });
            */
        });
    },
    loginAccountEmail: async (req, res, next) => {
        try {
            let user = req.user;

            if (user) {
                generateAccessToken(user)
                    .then(function (response) {
                        return res.json(response);
                    })
                    .catch(function (err) {
                        return res.status(err.status).json(err);
                    });
            } else {
                throw new ApplicationError(ErrorCodes.INTERNAL_ERROR, error);
            }
        } catch (err) {
            return res.status(err.status).json(err);
        }
    },
    generateAccessToken: async (user) => {
        return await new Promise((resolve, reject) => {
            controllers.secrets.getSecret('auth')
                .then(function (secret) {
                    jwt.sign({
                        id: user.id,
                        expiresIn: '14 days'
                    }, secret, function(err, token) {
                        if (err) reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
        
                        resolve(token);
                    });
                })
                .catch(function (err) {
                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                });
        });
    }
});