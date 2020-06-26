'use strict';

const EmailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

exports.createAccount = (req, res, next) => {
    try {
        // todo: check for auth adapter

        // todo: check credentials
        
        /* if (req.body.email != null && req.body.username != null && req.body.password != null) {
            if (req.body.username.length < 2 || req.body.username.length > 40) {
                throw new ApplicationError(ErrorCodes.BAD_REQUEST, 'Invalid Username. (Minimum 2, Maximum 40 Characters)');
            } else if (EmailValidator.validate(req.body.email) !== true) {
                throw new ApplicationError(ErrorCodes.BAD_REQUEST, 'Invalid Email Address.');
            } else if (req.body.password.length < 8) {
                throw new ApplicationError(ErrorCodes.BAD_REQUEST, 'Invalid Password. (Minimum 8 Characters)');
            }
        } */

        // todo:

        // 1. check if the given email address already exists, if it does, exit
        // 2. hash password
        // 3. create db record
        // 4. get access token
        // 5. return access token
        
        /* db.query(`SELECT * FROM users WHERE email = '${credentials.email}'`, function (error, results, fields) {
            if (error || (results && results != null && results.length > 0)) {
                if (error) {
                    return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                } else if (results[0].email === credentials.email) {
                    return reject(new ApplicationError(ErrorCodes.BAD_REQUEST, 'Email address is already in use.'));
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
                                    .then((user) => {
                                        db.query(`INSERT INTO users_auth_password (user_id, hash) VALUES ('${user.id}', '${credentials.password}')`, function (error, results, fields) {
                                            if (error) {
                                                return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, error));
                                            } else if (results) {
                                                module.exports.generateAccessToken(user)
                                                    .then((response) => {
                                                        return resolve(response);
                                                    })
                                                    .catch((err) => {
                                                        return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                                                    });
                                            } else {
                                                return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, null));
                                            }
                                        });
                                    })
                                    .catch((err) => {
                                        return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
                                    });
                            } else {
                                return reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, null));
                            }
                        });
                    }
                });
            }
        }); */
    } catch (err) {
        return res.status(err.status).json(err);
    }
};

exports.loginAccount = async (req, res, next) => {
    try {
        const response = await module.exports.generateAccessToken(req.user);

        return res.json(response);
    } catch (err) {
        return res.status(err.status).json(err);
    }
};

exports.generateAccessToken = (user) => {
    return new Promise((resolve, reject) => {
        const authSecret = config.api.secrets.auth;

        jwt.sign({
            id: user.id,
            expiresIn: '14 days'
        }, authSecret, (err, token) => {
            if (err) {
                reject(new ApplicationError(ErrorCodes.INTERNAL_ERROR, err));
            }

            resolve(token);
        });
    });
};